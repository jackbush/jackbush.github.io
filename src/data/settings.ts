// The home page's settings pane (the brush, bottom right): one row per setting, in groups.
//
// A setting with a `path` is a value in src/data/theme.ts (`object.field`, or a top-level
// const), and its default is read from there. `themeColours` is the theme colour in use, one
// of that list. The rest are tuning aids that only live in the pane, with their default here.
//
// "Copy changes" copies what differs from the defaults; `npm run tweak` (scripts/tweak.ts)
// writes it back: into theme.ts by path, else into `value` here, and a re-centred slider's
// range into `min`/`max` here. This file imports nothing, so the script can load it as is.

export type SettingType = "range" | "color" | "bool";
export type SettingValue = number | string | boolean;

export interface SettingDef {
    key: string;
    label: string;
    type?: SettingType;
    /** Where the default lives in theme.ts; without it, `value` is the default. */
    path?: string;
    value?: SettingValue;
    min?: number;
    max?: number;
    step?: number;
    desc?: string;
    /**
     * Only relevant while an earlier setting in the group (its parent) has one of the `is`
     * values, or none of the `not` values: shown indented under it, and only then counted or
     * copied as a change.
     */
    when?: { key: string; is?: SettingValue[]; not?: SettingValue[] };
}

export interface SettingGroup {
    group: string;
    settings: SettingDef[];
}

export const STATE_TAG = "settings@1";

export const settings: SettingGroup[] = [
    {
        group: "Colours",
        settings: [
            {
                key: "windowHue",
                label: "Hue from window",
                type: "bool",
                value: false,
                desc: "The theme follows where the browser window sits on your screen: across sets the hue (the whole wheel, left to right), down sets the lightness. Not copied as the Theme colour.",
            },
            {
                key: "windowMinLightness",
                label: "Min lightness",
                value: 0.85,
                min: 0.85,
                max: 1,
                step: 0.01,
                desc: "OKLCH lightness with the window at the bottom of the screen; it rises to white at the top. The slider starts where the inverse text passes AA at every hue, at full chroma and Minor text opacity 0.8 (0.849).",
                when: { key: "windowHue", is: [true] },
            },
            {
                key: "windowChroma",
                label: "Chroma",
                value: 0.045,
                min: 0,
                max: 0.074,
                step: 0.001,
                desc: "OKLCH chroma. Up to 0.074, every hue at lightness 0.85 fits sRGB; higher up the screen less fits, and channels clip toward white.",
                when: { key: "windowHue", is: [true] },
            },
            {
                key: "windowHueOffset",
                label: "Hue offset °",
                value: 0,
                min: 0,
                max: 360,
                step: 1,
                desc: "Turns the wheel: the hue with the window at the left edge.",
                when: { key: "windowHue", is: [true] },
            },
            {
                key: "themeColour",
                label: "Theme colour",
                type: "color",
                path: "themeColours",
                desc: "The theme colour in use (the arrow keys or a swipe go to the next): the page in Projects, and the text in Roles. Projects' text and the Roles page are its inverse.",
                when: { key: "windowHue", is: [false] },
            },
            {
                key: "minorOpacity",
                label: "Minor text opacity",
                path: "textOpacity.minor",
                min: 0,
                max: 1,
                step: 0.01,
                desc: "Body text: the page's inverse at this opacity over it.",
            },
            {
                key: "cardOpacity",
                label: "Card opacity",
                path: "cardOpacity",
                min: 0,
                max: 1,
                step: 0.01,
                desc: "The wash behind card text: the theme colour screened over a bright page (lighter) or multiplied over a dark one (deeper), at this opacity.",
            },
        ],
    },
    {
        group: "Switch",
        settings: [
            {
                key: "startSize",
                label: "Start size (px)",
                path: "switchMotion.startSize",
                min: 0,
                max: 400,
                step: 1,
                desc: "Diameter of the new theme the moment you click, in CSS px.",
            },
            {
                key: "switchSpeed",
                label: "Start speed",
                path: "switchMotion.speed",
                min: 0,
                max: 2,
                step: 0.005,
                desc: "How fast the new theme sets off from the click, in short sides per second.",
            },
            {
                key: "switchAccel",
                label: "Acceleration",
                path: "switchMotion.accel",
                min: 0.1,
                max: 20,
                step: 0.01,
                desc: "How fast it speeds up (short sides per s²), until it has passed the whole screen.",
            },
            {
                key: "oldTextFade",
                label: "Old text fade (s)",
                path: "switchMotion.oldTextFade",
                min: 0,
                max: 2,
                step: 0.01,
                desc: "How long the old list takes to fade out. The new one appears inside the switch as it spreads.",
            },
            {
                key: "interruptFade",
                label: "Interrupt fade (s)",
                path: "switchMotion.interruptFade",
                min: 0,
                max: 1,
                step: 0.01,
                desc: "Switching back mid-switch: how long the half-revealed list takes to fade out. Its switch keeps spreading.",
            },
            {
                key: "barsLead",
                label: "Bars lead (s)",
                path: "switchMotion.barsLead",
                min: 0,
                max: 1,
                step: 0.01,
                desc: "The browser's bars take one flat colour, so they follow the page along the top edge: this many seconds before the switch covers it, they change.",
            },
        ],
    },
    {
        group: "Shape",
        settings: [
            {
                key: "wobble",
                label: "Wobble",
                path: "switchShape.wobble",
                min: 0,
                max: 0.5,
                step: 0.005,
                desc: "How far each point of the outline swings in and out, as a share of the reach. 0 = a circle.",
            },
            {
                key: "wobblePoints",
                label: "Points",
                path: "switchShape.points",
                min: 3,
                max: 12,
                step: 1,
                desc: "Points round the outline; it's a smooth curve through them.",
                when: { key: "wobble", not: [0] },
            },
            {
                key: "wobbleSpeed",
                label: "Speed",
                path: "switchShape.speed",
                min: 0,
                max: 4,
                step: 0.01,
                desc: "Swings per second for each point.",
                when: { key: "wobble", not: [0] },
            },
            {
                key: "wobbleSpeedJitter",
                label: "Speed jitter",
                path: "switchShape.speedJitter",
                min: 0,
                max: 1,
                step: 0.01,
                desc: "Each point's own speed, so they drift in and out of step.",
                when: { key: "wobble", not: [0] },
            },
            {
                key: "wobbleAmpJitter",
                label: "Size jitter",
                path: "switchShape.sizeJitter",
                min: 0,
                max: 1,
                step: 0.01,
                desc: "Each point's own swing size.",
                when: { key: "wobble", not: [0] },
            },
        ],
    },
    {
        group: "Demo",
        settings: [
            {
                key: "autoSwitch",
                label: "Demo switch (s)",
                value: 0,
                min: 0,
                max: 10,
                step: 0.1,
                desc: "Switch tab on its own every this many seconds, from a random point on the other tab. 0 = off.",
            },
            {
                key: "seed",
                label: "Seed",
                value: 0,
                min: 0,
                max: 100,
                step: 1,
                desc: "Where on the tab demo switches start.",
                when: { key: "autoSwitch", not: [0] },
            },
        ],
    },
];
