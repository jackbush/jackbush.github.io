// The page colour, drawn on a canvas so a theme switch can spread from the click.
//
// A switch starts at the click, switchMotion.startSize across, and grows, slow at first and
// accelerating, until it has passed the whole screen; then its theme becomes the base. Its
// outline is a closed Catmull-Rom curve through switchShape.points radii round the click,
// each swinging in and out on its own sine wave. The shader draws that curve and radiusAt()
// gives the same one to the page, which clips the new list to it (index.astro).
//
// It only draws when something changes: a switch under way, a resize. Time is real seconds.

import { MODES, pages, rgb, switchMotion, switchShape, type Mode } from "../data/theme";

/** Switches that can be in flight at once; a third folds the oldest into the base. */
const MAX_SWITCHES = 2;
/** Most outline points (switchShape.points must not exceed it). */
const MAX_POINTS = 12;
const MAX_DPR = 2;
const TAU = Math.PI * 2;

const VERT = `#version 300 es
void main() {
    vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
    gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;
#define TAU 6.28318530718

uniform vec2 uRes;        // canvas px
uniform float uPx;        // canvas px per CSS px
uniform vec3 uPage[2];    // projects, roles
uniform float uBase;      // 0 projects, 1 roles
uniform int uCount;       // switches under way
uniform vec4 uSwitch[${MAX_SWITCHES}];  // click x, y (CSS px), reach (CSS px), theme
uniform int uPoints;
uniform float uRing[${MAX_SWITCHES * MAX_POINTS}]; // outline offsets, shares of the reach

// Switch s's outline offset at angle a: Catmull-Rom through its points (radiusAt below).
float ringOffset(int s, float a) {
    float u = fract(a / TAU) * float(uPoints);
    int k = int(u);
    u -= float(k);
    int b = s * ${MAX_POINTS};
    float p0 = uRing[b + (k + uPoints - 1) % uPoints];
    float p1 = uRing[b + k % uPoints];
    float p2 = uRing[b + (k + 1) % uPoints];
    float p3 = uRing[b + (k + 2) % uPoints];
    return 0.5 * (2.0 * p1 + (p2 - p0) * u + (2.0 * p0 - 5.0 * p1 + 4.0 * p2 - p3) * u * u
                + (3.0 * (p1 - p2) + p3 - p0) * u * u * u);
}

out vec4 outColor;

void main() {
    vec2 p = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y) / uPx; // CSS px, y down
    float th = uBase;
    float aa = 0.5 / uPx; // half a device pixel
    for (int s = 0; s < ${MAX_SWITCHES}; s++) {
        if (s >= uCount) break;
        vec2 d = p - uSwitch[s].xy;
        float r = uSwitch[s].z * (1.0 + ringOffset(s, atan(d.y, d.x)));
        th = mix(th, uSwitch[s].w, smoothstep(-aa, aa, r - length(d)));
    }
    outColor = vec4(mix(uPage[0], uPage[1], th), 1.0);
}`;

/** Catmull-Rom through four values, u = 0..1 between the middle two. */
const catmullRom = (p0: number, p1: number, p2: number, p3: number, u: number) =>
    0.5 * (2 * p1 + (p2 - p0) * u + (2 * p0 - 5 * p1 + 4 * p2 - p3) * u * u + (3 * (p1 - p2) + p3 - p0) * u * u * u);

/** Stateless hash of two integers → [0, 1), so each switch's outline is its own. */
function hash(a: number, b: number) {
    let n = Math.imul(a | 0, 0x27d4eb2d) ^ Math.imul(b | 0, 0x165667b1);
    n = Math.imul(n ^ (n >>> 16), 0x45d9f3b);
    n = Math.imul(n ^ (n >>> 16), 0x45d9f3b);
    return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
}

export interface Backdrop {
    /** Spread `mode` out from (x, y), CSS px from the viewport's top left. */
    start(mode: Mode, x: number, y: number): void;
    /** Switch to `mode` at once. */
    jump(mode: Mode): void;
    /** Whether a switch is under way. */
    readonly running: boolean;
    /** The page drawn right along the top edge, `switchMotion.barsLead` early, for the browser's bars. */
    readonly topEdge: Mode;
    /** The newest switch's radius (CSS px) at angle `a` (radians, from +x towards +y). */
    radiusAt(a: number): number;
}

/**
 * Start drawing on `canvas`, or return null without WebGL2. `onFrame` runs after each frame
 * drawn; `onLost` when the GPU context is lost (the page should fall back to plain CSS) and
 * `onReady` once the first frame is up (and again after the context comes back).
 */
export function createBackdrop(
    canvas: HTMLCanvasElement,
    { onFrame, onReady, onLost }: { onFrame(): void; onReady(): void; onLost(): void },
): Backdrop | null {
    const gl = canvas.getContext("webgl2", { alpha: false, antialias: false, depth: false, stencil: false });
    if (!gl) return null;

    const live: { theme: number; x: number; y: number; t0: number; id: number }[] = [];
    const theme = (mode: Mode) => MODES.indexOf(mode);
    let base = theme((document.documentElement.dataset.theme as Mode) ?? "projects");
    let top = base;
    let clock = 0;
    let nextId = 0;
    let newestReach = -1;
    const ring = new Float32Array(MAX_SWITCHES * MAX_POINTS);
    const switches = new Float32Array(MAX_SWITCHES * 4);

    const reach = (tau: number, short: number) =>
        switchMotion.startSize / 2 + short * (switchMotion.speed * tau + 0.5 * switchMotion.accel * tau * tau);

    /** Point i's offset (a share of the reach) τ seconds into switch `id`. */
    function point(id: number, i: number, tau: number) {
        const k = id * 31 + i;
        const amp = switchShape.wobble * (1 - switchShape.sizeJitter * hash(k, 1));
        const freq = switchShape.speed * (1 + switchShape.speedJitter * (hash(k, 2) * 2 - 1));
        return amp * Math.sin(TAU * (freq * tau + hash(k, 3)));
    }

    // ── GL ─────────────────────────────────────────────────────
    let prog: WebGLProgram | null = null;
    let u: Record<string, WebGLUniformLocation | null> = {};
    function build() {
        const p = gl!.createProgram()!;
        for (const [type, src] of [[gl!.VERTEX_SHADER, VERT], [gl!.FRAGMENT_SHADER, FRAG]] as const) {
            const sh = gl!.createShader(type)!;
            gl!.shaderSource(sh, src);
            gl!.compileShader(sh);
            if (!gl!.getShaderParameter(sh, gl!.COMPILE_STATUS) && !gl!.isContextLost()) {
                throw new Error("Backdrop shader: " + gl!.getShaderInfoLog(sh));
            }
            gl!.attachShader(p, sh);
        }
        gl!.linkProgram(p);
        gl!.useProgram(p);
        gl!.bindVertexArray(gl!.createVertexArray());
        u = Object.fromEntries(
            ["uRes", "uPx", "uPage", "uBase", "uCount", "uSwitch", "uPoints", "uRing"].map((n) => [n, gl!.getUniformLocation(p, n)]),
        );
        gl!.uniform3fv(u.uPage, [...rgb(pages.projects), ...rgb(pages.roles)]);
        gl!.uniform1i(u.uPoints, switchShape.points);
        prog = p;
    }

    // ── Frames ─────────────────────────────────────────────────
    let raf = 0;
    let last = 0;
    let shown = false;
    function frame(now: number) {
        raf = 0;
        if (!prog) return;
        clock += last ? Math.min(0.1, (now - last) / 1000) : 0;
        last = live.length ? now : 0;

        const w = canvas.clientWidth, h = canvas.clientHeight;
        const px = Math.min(devicePixelRatio || 1, MAX_DPR);
        const cw = Math.max(1, Math.round(w * px)), ch = Math.max(1, Math.round(h * px));
        if (canvas.width !== cw || canvas.height !== ch) {
            canvas.width = cw;
            canvas.height = ch;
        }

        // A switch whose deepest dip has passed the furthest corner becomes the base, with
        // any older ones. (The curve can overshoot its points a little, hence the 1.5.)
        const short = Math.min(w, h);
        const covers = (sp: (typeof live)[number], dy: number, lead = 0) =>
            reach(clock + lead - sp.t0, short) * (1 - 1.5 * switchShape.wobble) >= Math.hypot(Math.max(sp.x, w - sp.x), dy) + 1;
        for (let s = live.length - 1; s >= 0; s--) {
            const sp = live[s];
            if (covers(sp, Math.max(sp.y, h - sp.y))) {
                base = sp.theme;
                live.splice(0, s + 1);
                break;
            }
        }
        // Likewise the top edge, by its corners, a little early; newer switches draw over older ones.
        top = base;
        for (const sp of live) if (covers(sp, sp.y, switchMotion.barsLead)) top = sp.theme;
        live.forEach((sp, s) => {
            const tau = clock - sp.t0;
            switches.set([sp.x, sp.y, reach(tau, short), sp.theme], s * 4);
            for (let i = 0; i < switchShape.points; i++) ring[s * MAX_POINTS + i] = point(sp.id, i, tau);
        });
        newestReach = live.length ? switches[(live.length - 1) * 4 + 2] : -1;

        gl!.viewport(0, 0, cw, ch);
        gl!.uniform2f(u.uRes, cw, ch);
        gl!.uniform1f(u.uPx, cw / w);
        gl!.uniform1f(u.uBase, base);
        gl!.uniform1i(u.uCount, live.length);
        gl!.uniform4fv(u.uSwitch, switches);
        gl!.uniform1fv(u.uRing, ring);
        gl!.drawArrays(gl!.TRIANGLES, 0, 3);

        if (!shown) {
            shown = true;
            onReady();
        }
        onFrame();
        if (live.length) draw();
    }
    const draw = () => {
        if (!raf) raf = requestAnimationFrame(frame);
    };

    canvas.addEventListener("webglcontextlost", (e) => {
        e.preventDefault();
        prog = null;
        shown = false;
        onLost();
    });
    canvas.addEventListener("webglcontextrestored", () => {
        build();
        draw();
    });
    new ResizeObserver(draw).observe(canvas);
    build();
    draw();

    return {
        start(mode, x, y) {
            const t = theme(mode);
            if (t === (live.length ? live[live.length - 1].theme : base)) return;
            if (live.length === MAX_SWITCHES) base = live.shift()!.theme;
            live.push({ theme: t, x, y, t0: clock, id: nextId++ });
            draw();
        },
        jump(mode) {
            base = theme(mode);
            live.length = 0;
            newestReach = -1;
            draw();
        },
        get running() {
            return newestReach >= 0;
        },
        get topEdge() {
            return MODES[top];
        },
        radiusAt(a) {
            const n = switchShape.points;
            const b = (live.length - 1) * MAX_POINTS;
            const s = ((((a / TAU) % 1) + 1) % 1) * n;
            const k = Math.floor(s);
            const off = catmullRom(ring[b + ((k + n - 1) % n)], ring[b + (k % n)], ring[b + ((k + 1) % n)], ring[b + ((k + 2) % n)], s - k);
            return newestReach * (1 + off);
        },
    };
}
