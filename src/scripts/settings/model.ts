// The settings' live values (src/data/settings.ts), for the pane and the page.
//
// Each setting counts as changed while it differs from its base: its default, or for the
// theme colour, the theme the arrow keys last went to. Bypass shows the bases in place of the
// edits, for before/after comparison; the edits are held, and still count and copy as changes.
// Nothing is saved: a reload starts on the code's defaults.

import type {
    SettingDef,
    SettingGroup,
    SettingType,
    SettingValue,
} from "../../data/settings";

export interface Setting extends SettingDef {
    type: SettingType;
    value: SettingValue;
    base: SettingValue;
    decimals: number;
    /** The setting `when` depends on, and how many such levels deep this one is (0 = none). */
    parent: Setting | null;
    depth: number;
    /** settings.ts's min and max; `min`/`max` differ after a re-centre in the pane. */
    codeMin?: number;
    codeMax?: number;
}

export interface Model {
    groups: { group: string; settings: Setting[] }[];
    all: Setting[];
    byKey: Record<string, Setting>;
    setValue(s: Setting, v: unknown): void;
    /** A new base (and value): the theme colour after the arrow keys. */
    setBase(s: Setting, v: unknown): void;
    isChanged(s: Setting): boolean;
    /** The user's value: the live value, or the held edit while bypassed. */
    edited(s: Setting): SettingValue;
    readonly bypassed: boolean;
    setBypass(on: boolean): void;
    setRange(s: Setting, min: number, max: number): void;
    /** False while the setting's `when` (or an ancestor's) doesn't hold. */
    isShown(s: Setting): boolean;
    /** Changed settings that are shown. */
    changedCount(): number;
    /** Every setting back to its base and range, ending any bypass. */
    resetAll(): void;
}

function decimalsOf(step: number | undefined): number {
    const s = String(step ?? 1);
    return s.includes("e-")
        ? Number(s.split("e-")[1])
        : (s.split(".")[1] || "").length;
}

function coerce(s: Setting, v: unknown): SettingValue {
    if (s.type === "bool") return !!v;
    if (s.type === "color")
        return typeof v === "string" && /^#[0-9a-f]{6}$/i.test(v)
            ? v.toLowerCase()
            : s.value;
    const n = Number(v);
    return Number.isFinite(n) ? Number(n.toFixed(s.decimals)) : s.value;
}

/** @param defaultOf a setting's default (theme.ts's value for one with a path). */
export function createModel(
    schema: SettingGroup[],
    defaultOf: (def: SettingDef) => SettingValue,
): Model {
    const all: Setting[] = [];
    const byKey: Record<string, Setting> = Object.create(null);
    const groups: Model["groups"] = [];

    for (const g of schema) {
        const live: Setting[] = [];
        for (const def of g.settings) {
            const type = def.type ?? "range";
            const s: Setting = {
                ...def,
                type,
                value: 0,
                base: 0,
                decimals: type === "range" ? decimalsOf(def.step) : 0,
                parent: null,
                depth: 0,
                codeMin: def.min,
                codeMax: def.max,
            };
            s.value = s.base = coerce(s, defaultOf(def));
            if (def.when) {
                const parent = live.find((q) => q.key === def.when!.key);
                if (!parent)
                    throw new Error(
                        `${def.key}: "when" names ${def.when.key}, which isn't earlier in its group`,
                    );
                s.parent = parent;
                s.depth = parent.depth + 1;
            }
            all.push(s);
            live.push(s);
            byKey[s.key] = s;
        }
        groups.push({ group: g.group, settings: live });
    }

    // Bypass: the edits held aside while the bases show.
    let held: Map<Setting, SettingValue> | null = null;
    const edited = (s: Setting) =>
        held && held.has(s) ? held.get(s)! : s.value;

    const model: Model = {
        groups,
        all,
        byKey,
        setValue(s, v) {
            model.setBypass(false); // an edit goes on top of the edits, never under a bypass
            s.value = coerce(s, v);
        },
        setBase(s, v) {
            model.setBypass(false);
            s.base = s.value = coerce(s, v);
        },
        isChanged: (s) => edited(s) !== s.base,
        edited,
        get bypassed() {
            return !!held;
        },
        setBypass(on) {
            if (on === !!held) return;
            if (on) {
                held = new Map();
                for (const s of all)
                    if (s.value !== s.base) {
                        held.set(s, s.value);
                        s.value = s.base;
                    }
            } else {
                const back = held!;
                held = null;
                for (const [s, v] of back) s.value = v;
            }
        },
        setRange(s, min, max) {
            s.min = min;
            s.max = max;
        },
        isShown(s) {
            for (let q: Setting | null = s; q && q.when; q = q.parent) {
                const v = edited(q.parent!),
                    w = q.when; // the user's value, also while bypassed
                if (w.is && !w.is.includes(v)) return false;
                if (w.not && w.not.includes(v)) return false;
            }
            return true;
        },
        changedCount() {
            return all.filter((s) => model.isChanged(s) && model.isShown(s))
                .length;
        },
        resetAll() {
            held = null;
            for (const s of all) {
                s.value = s.base;
                s.min = s.codeMin;
                s.max = s.codeMax;
            }
        },
    };
    return model;
}
