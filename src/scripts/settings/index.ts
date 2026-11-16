// The home page's settings pane: the brush (bottom right) opens it, Escape closes it, and a URL
// ending #settings opens with it open. Its rows come from src/data/settings.ts.
//
// An edit to a setting with an `object.field` path is written straight into that object in
// theme.ts, which the page and the backdrop read as they draw; the rest reach the page through
// `onChange`. The theme colour in use is the Theme colour setting, or with Hue from window
// on, an OKLCH colour set by where the window sits on its screen (across is hue, down is
// lightness from white to Min lightness), polled every frame since moving a window fires no
// event.

import * as theme from "../../data/theme";
import { settings, type SettingDef } from "../../data/settings";
import { createModel, type Model } from "./model";
import { buildPanel } from "./panel";
import { oklchToRgb } from "./okhsl";

/** What the page reads from the pane on every change. */
export interface Applied {
    /** The theme colour in use, as hex. */
    themeColour: string;
    cardOpacity: number;
    autoSwitch: number;
    seed: number;
}

export interface Settings {
    /** The arrow keys went to another theme colour: it becomes the Theme colour's base. */
    setTheme(hex: string): void;
}

type Objects = Record<string, Record<string, unknown>>;
const objects = theme as unknown as Objects;

/** theme.ts's value for a setting's path ("themeColours" is the first, the default). */
function defaultOf(def: SettingDef) {
    if (!def.path) return def.value!;
    if (def.path === "themeColours") return theme.themeColours[0];
    const [obj, field] = def.path.split(".");
    const v = field ? objects[obj][field] : objects[obj];
    return v as number;
}

export function setupSettings(onChange: (s: Applied) => void): Settings {
    const model: Model = createModel(settings, defaultOf);
    const S = model.byKey;
    const root = document.documentElement;
    const brush = document.getElementById("settings-brush")!;
    const pane = document.getElementById("settings")!;
    const warning = document.getElementById("settings-warning")!;

    // ── The theme colour in use
    const oklch = new Float32Array(3);
    let windowAt = "";
    function themeColour() {
        if (!S.windowHue.value) return String(S.themeColour.value);
        // The window's centre as a share of the screen it's on, 0–1 from the left and top.
        const scr = screen as Screen & {
            availLeft?: number;
            availTop?: number;
        };
        const wx =
            (screenX + outerWidth / 2 - (scr.availLeft ?? 0)) /
            screen.availWidth;
        const wy =
            (screenY + outerHeight / 2 - (scr.availTop ?? 0)) /
            screen.availHeight;
        const across = Math.min(1, Math.max(0, wx)),
            down = Math.min(1, Math.max(0, wy));
        const min = Number(S.windowMinLightness.value);
        oklchToRgb(
            1 - down * (1 - min),
            Number(S.windowChroma.value),
            across * 360 + Number(S.windowHueOffset.value),
            oklch,
        );
        return (
            "#" +
            [...oklch]
                .map((v) =>
                    Math.round(v * 255)
                        .toString(16)
                        .padStart(2, "0"),
                )
                .join("")
        );
    }

    function apply() {
        for (const s of model.all) {
            const [obj, field] = s.path?.split(".") ?? [];
            if (field) objects[obj][field] = s.value;
        }
        const hex = themeColour();
        windowAt = hex;
        warning.textContent = theme.contrastProblems(hex).join("\n");
        onChange({
            themeColour: hex,
            cardOpacity: Number(S.cardOpacity.value),
            autoSwitch: Number(S.autoSwitch.value),
            seed: Number(S.seed.value),
        });
    }

    let polling = 0;
    function poll() {
        polling = S.windowHue.value ? requestAnimationFrame(poll) : 0;
        if (polling && themeColour() !== windowAt) apply();
    }

    const panel = buildPanel(model, () => {
        apply();
        panel.refreshStatus();
        if (S.windowHue.value && !polling) poll();
    });
    panel.refreshStatus();

    // ── Open and close
    let open = location.hash === "#settings";
    function setOpen(v: boolean) {
        open = v;
        root.dataset.settings = open ? "open" : "closed";
        pane.setAttribute("aria-hidden", String(!open));
        pane.inert = !open;
        brush.setAttribute("aria-expanded", String(open));
    }
    brush.addEventListener("click", () => setOpen(!open));
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && open) setOpen(false);
    });
    setOpen(open);

    return {
        setTheme(hex) {
            model.setBase(S.themeColour, hex);
            panel.syncAll();
            panel.refreshStatus();
            apply();
        },
    };
}
