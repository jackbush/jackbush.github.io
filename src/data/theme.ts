// The theme colours, the text, and how a switch between the two pages moves. Every
// tunable value for the theme and the backdrop lives here. They're tuned live in the
// "homepage" sketch in the glimmers repo (its settings pane has the same names).
//
// One theme colour decides both pages: it's the Projects page and the Roles text, and its
// inverse is the Projects text and the Roles page. Each page's text is that page's
// inverse, at full strength for headings, strong text and lines, and at a lower
// opacity for body text.

export type Mode = "projects" | "roles";
export const MODES: Mode[] = ["projects", "roles"];

/**
 * Theme colours, each the Projects page (the Roles page is its inverse). The first is the
 * default; on desktop the left and right arrow keys cycle through them.
 */
export const themeColours = [
    "#E6DCD6", // putty | dark teal
    "#DCE9C0", // pistachio | deep purple
    "#E9DBBF", // paper | slate
    "#F6DCDA", // dusty pink | forest green
];

/** Text: the page's inverse at these opacities over it. */
export const textOpacity = {
    main: 1, // headings, strong text, the toggle and the lines between roles
    minor: 0.8, // body text and links
};

/** Opacity of the wash behind a project card's text (see `colours`). */
export const cardOpacity = 0.25;

/** A switch: starts at the click and spreads until it has passed the whole screen. */
export const switchMotion = {
    startSize: 1, // diameter at the click, CSS px
    speed: 0.195, // screen short sides per second, at the start
    accel: 5.07, // screen short sides per second², after that
    oldTextFade: 0.23, // seconds for the old list to fade out
    interruptFade: 0.05, // seconds for a half-revealed list to go, on a switch back
    barsLead: 0.15, // seconds before the switch covers the top edge that the browser's bars change
};

/** The switch's outline: a smooth closed curve through points that each swing in and out. */
export const switchShape = {
    wobble: 0.12, // how far each point swings, as a share of the radius (0 = a circle)
    points: 6,
    speed: 0.8, // swings per second
    speedJitter: 0.35, // each point's own speed, so they drift in and out of step
    sizeJitter: 0.5, // each point's own swing size
};

// ── Derived colours ─────────────────────────────────────────────

type Rgb = [number, number, number];

export const rgb = (hex: string): Rgb =>
    [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255) as Rgb;

const hex = (c: Rgb) =>
    "#" +
    c
        .map((v) =>
            Math.round(v * 255)
                .toString(16)
                .padStart(2, "0"),
        )
        .join("")
        .toUpperCase();

/** Text at `opacity` on a page: its inverse, that share of the way over it. */
const text = (page: Rgb, opacity: number): Rgb =>
    page.map((v) => v + (1 - 2 * v) * opacity) as Rgb;

/** Everything a theme colour decides: both pages, their text, and the cards' wash. */
export function colours(themeColour: string) {
    const c = rgb(themeColour);
    const pages: Record<Mode, string> = {
        projects: themeColour,
        roles: hex(c.map((v) => 1 - v) as Rgb),
    };

    /** Text colours per mode and kind, as hex. */
    const textColours = Object.fromEntries(
        MODES.map((mode) => [
            mode,
            {
                main: hex(text(rgb(pages[mode]), textOpacity.main)),
                minor: hex(text(rgb(pages[mode]), textOpacity.minor)),
            },
        ]),
    ) as Record<Mode, Record<keyof typeof textOpacity, string>>;

    // The wash behind a project card's text: the theme colour at `cardOpacity`, blended over
    // the page. Screen lightens a bright theme and multiply deepens a dark one (bright = HSB
    // brightness, the max channel, from 50%). Blending the colour with itself keeps its hue
    // and adds saturation, where a white or black wash would grey it. With the backdrop on,
    // the browser blends it over the canvas; without, `flat` is the same result over the
    // plain page.
    const screen = Math.max(...c) >= 0.5;
    const blended = c.map((v) => (screen ? 1 - (1 - v) * (1 - v) : v * v));
    const cardWash = {
        colour: `rgba(${c.map((v) => Math.round(v * 255)).join(", ")}, ${cardOpacity})`,
        blend: screen ? "screen" : "multiply",
        flat: hex(c.map((v, i) => v + (blended[i] - v) * cardOpacity) as Rgb),
    };

    // As CSS variables, set on <html> (global.css maps them per data-theme).
    const vars: Record<string, string> = {
        "--card-wash": cardWash.colour,
        "--card-wash-blend": cardWash.blend,
        "--card-wash-flat": cardWash.flat,
    };
    for (const mode of MODES) {
        vars[`--${mode}-bg`] = pages[mode];
        for (const [kind, colour] of Object.entries(textColours[mode]))
            vars[`--${mode}-${kind}`] = colour;
    }

    return { pages, textColours, vars };
}

export type Colours = ReturnType<typeof colours>;

/** The default theme's colours. */
export const defaultColours = colours(themeColours[0]);

/**
 * With the backdrop on, text is drawn in three blend layers over the canvas: multiply
 * by m, difference with d, then plus-lighter k. Text at opacity o over a page bg should
 * be (1 − 2o)·bg + o per channel, which those give:
 *   o ≥ ½: |o − (2o − 1)·bg|      o < ½: (1 − 2o)·bg + o
 * so every glyph is the inverse of whatever page is under it, mid-switch included.
 */
export function inkGreys(opacity: number) {
    return opacity >= 0.5
        ? { m: 2 * opacity - 1, d: opacity, k: 0 }
        : { m: 1 - 2 * opacity, d: 0, k: opacity };
}

// ── Contrast: the site's floor is 5.7:1, checked at build ──────

const MIN_CONTRAST = 5.7;

function contrast(a: Rgb, b: Rgb) {
    const lum = (c: Rgb) => {
        const [r, g, bl] = c.map((v) =>
            v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4,
        );
        return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
    };
    const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
    return (hi + 0.05) / (lo + 0.05);
}

for (const themeColour of themeColours) {
    const { pages } = colours(themeColour);
    for (const mode of MODES) {
        for (const kind of ["main", "minor"] as const) {
            const page = rgb(pages[mode]);
            const ratio = contrast(page, text(page, textOpacity[kind]));
            if (ratio < MIN_CONTRAST) {
                throw new Error(
                    `src/data/theme.ts: ${kind} text on the ${mode} page of ${themeColour} is ${ratio.toFixed(2)}:1, below ${MIN_CONTRAST}:1.`,
                );
            }
        }
    }
}
