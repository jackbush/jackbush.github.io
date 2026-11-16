// The settings pane's rows, one per setting in src/data/settings.ts, plus the changes line
// (with its show-changes checkbox), Reset and Copy changes. Copy produces the blob that
// `npm run tweak` writes back into the code.
//
// Sliders mark their home (the base value) once moved off it, and offer to re-centre their
// range on the value when it's pinned at an end. Double-click a label to reset that row.

import { STATE_TAG } from "../../data/settings";
import type { Model, Setting } from "./model";
import { createColourPicker } from "./colour-picker";

export interface Panel {
    syncAll(): void;
    /** Refresh which rows are shown, the changes line and Reset's visibility. */
    refreshStatus(): void;
}

function el<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    cls?: string | null,
    text?: string,
): HTMLElementTagNameMap[K] {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
}

/** Keep phone keyboards to their smallest form: no suggestion row, no auto-capitals. */
function noSuggestions(input: HTMLInputElement): void {
    input.autocomplete = "off";
    input.spellcheck = false;
    input.enterKeyHint = "done";
    input.setAttribute("autocorrect", "off");
    input.setAttribute("autocapitalize", "off");
}

/** @param onEdited called after every edit made in the pane. */
export function buildPanel(model: Model, onEdited: () => void): Panel {
    const controls = document.getElementById("settings-controls")!;
    const copyBtn = document.getElementById(
        "settings-copy",
    ) as HTMLButtonElement;
    const resetBtn = document.getElementById(
        "settings-reset",
    ) as HTMLButtonElement;
    const statusEl = document.getElementById("settings-status")!;
    const showBox = document.getElementById(
        "settings-show-changes",
    ) as HTMLInputElement;
    const rows: { s: Setting; wrap: HTMLElement; sync(): void }[] = [];
    const picker = createColourPicker();

    function buildRow(s: Setting): HTMLElement {
        const wrap = el("div", "row row-" + s.type);
        // Dependent settings sit under their parent, marked "- " per level.
        const label = el("label", "lbl", "- ".repeat(s.depth) + s.label);
        const id = "setting-" + s.key;
        label.htmlFor = id;
        label.title =
            (s.desc ? s.desc + "\n" : "") +
            "key: " +
            s.key +
            " · default: " +
            s.base;
        // Labels stay linked to their control for accessibility, but a click on one mustn't
        // activate it (it opened the colour picker, toggled checkboxes); double-click resets.
        label.addEventListener("click", (e) => e.preventDefault());
        label.addEventListener("dblclick", () => {
            model.setValue(s, s.base);
            sync();
            onEdited();
        });
        wrap.appendChild(label);
        const mark = () => wrap.classList.toggle("changed", model.isChanged(s));

        let sync: () => void;
        if (s.type === "bool") {
            const box = el("input");
            box.type = "checkbox";
            box.id = id;
            box.addEventListener("change", () => {
                model.setValue(s, box.checked);
                sync();
                onEdited();
            });
            wrap.appendChild(box);
            sync = () => {
                box.checked = !!s.value;
                mark();
            };
        } else if (s.type === "color") {
            // A swatch that opens the colour picker, plus the hex to type in.
            const pick = el("button", "swatch");
            pick.type = "button";
            pick.id = id;
            pick.setAttribute("aria-haspopup", "dialog");
            pick.setAttribute("aria-expanded", "false");
            const hex = el("input", "num");
            hex.type = "text";
            hex.maxLength = 7;
            noSuggestions(hex);
            pick.addEventListener("click", () => {
                if (picker.anchor === pick) {
                    picker.close();
                    return;
                }
                picker.open(pick, String(s.value), (v) => {
                    model.setValue(s, v);
                    pick.style.background = hex.value = String(s.value);
                    mark();
                    onEdited();
                });
            });
            hex.addEventListener("change", () => {
                model.setValue(s, hex.value.trim().replace(/^#?/, "#"));
                sync();
                onEdited();
            });
            wrap.append(pick, hex);
            sync = () => {
                pick.style.background = hex.value = String(s.value);
                if (picker.anchor === pick) picker.follow(String(s.value));
                mark();
            };
        } else {
            const track = el("span", "track");
            const range = el("input");
            range.type = "range";
            range.id = id;
            range.step = String(s.step);
            // Home: where the base value sits, shown once the value leaves it.
            const home = el("i", "home");
            home.setAttribute("aria-hidden", "true");
            // Pinned at an end: re-centre the range on the value. Not for sliders that end at
            // 1 or 100 (shares and percentages, whose ends mean something), nor at a 0 floor
            // (an amount can't go below none).
            const rerange = el("button", "rerange", "↔");
            rerange.type = "button";
            rerange.title =
                "Re-centre this slider's range on its value (Copy changes carries it).";
            const fixedEnds =
                s.codeMin! >= 0 && (s.codeMax === 1 || s.codeMax === 100);
            rerange.addEventListener("click", () => {
                const w = s.max! - s.min!,
                    v = Number(s.value);
                let lo = v - w / 2,
                    hi = v + w / 2;
                if (s.codeMin! >= 0 && lo < 0) {
                    lo = 0;
                    hi = w;
                }
                model.setRange(
                    s,
                    Number(lo.toFixed(s.decimals)),
                    Number(hi.toFixed(s.decimals)),
                );
                sync();
                onEdited();
            });
            track.append(range, home, rerange);
            const place = () => {
                range.min = String(s.min);
                range.max = String(s.max);
                const lo = s.min!,
                    hi = s.max!,
                    b = Number(s.base),
                    v = Number(s.value);
                home.hidden = !model.isChanged(s) || b < lo || b > hi;
                // The thumb is 10px wide, so its centre runs from 5px to the width − 5px.
                home.style.left =
                    "calc(5px + (100% - 10px) * " + (b - lo) / (hi - lo) + ")";
                const atMin = v <= lo && lo !== 0,
                    atMax = v >= hi;
                rerange.hidden =
                    fixedEnds || model.bypassed || !(atMin || atMax);
                rerange.classList.toggle("at-min", atMin);
            };
            const num = el("input", "num");
            num.type = "number";
            num.step = String(s.step);
            // Phones: the compact digit pad (it has no minus key on iOS).
            if (s.min != null && s.min >= 0)
                num.inputMode = Number.isInteger(s.step)
                    ? "numeric"
                    : "decimal";
            noSuggestions(num);
            // The number box has no min/max: type past the slider's range if you need to.
            range.addEventListener("input", () => {
                model.setValue(s, range.value);
                num.value = String(s.value);
                mark();
                place();
                onEdited();
            });
            num.addEventListener("change", () => {
                model.setValue(s, num.value);
                sync();
                onEdited();
            });
            wrap.append(track, num);
            sync = () => {
                place();
                range.value = String(s.value);
                num.value = String(s.value);
                mark();
            };
        }
        wrap.title = s.desc || "";
        sync();
        rows.push({ s, wrap, sync });
        return wrap;
    }

    for (const group of model.groups) {
        const det = el("details", "group");
        det.open = true;
        det.appendChild(el("summary", null, group.group));
        for (const s of group.settings) det.appendChild(buildRow(s));
        controls.appendChild(det);
    }

    const panel: Panel = {
        syncAll() {
            for (const r of rows) r.sync();
        },
        refreshStatus() {
            for (const r of rows) r.wrap.hidden = !model.isShown(r.s);
            const n = model.changedCount();
            statusEl.textContent =
                n === 0 ? "No changes" : n + (n === 1 ? " change" : " changes");
            resetBtn.hidden = n === 0;
            showBox.hidden = n === 0;
            showBox.checked = !model.bypassed;
            controls.classList.toggle("bypassed", model.bypassed);
        },
    };

    // Show changes: untick to see the bases in place of the edits, for before/after. The
    // edits are held; the controls rest until it's ticked again.
    showBox.addEventListener("change", () => {
        model.setBypass(!showBox.checked);
        panel.syncAll();
        onEdited();
    });

    // ── Copy changes
    function buildState(): string {
        const changed: Record<
            string,
            { from: unknown; to: unknown; range?: [number, number] }
        > = {};
        for (const s of model.all) {
            if (!model.isChanged(s) || !model.isShown(s)) continue;
            changed[s.key] = { from: s.base, to: model.edited(s) };
            // A slider re-centred in the pane: its new range goes too.
            if (s.min !== s.codeMin || s.max !== s.codeMax)
                changed[s.key].range = [s.min!, s.max!];
        }
        return JSON.stringify({ site: STATE_TAG, changed }, null, 2);
    }
    async function writeClipboard(text: string): Promise<boolean> {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch {
            const ta = el("textarea");
            ta.value = text;
            ta.style.cssText = "position:fixed;opacity:0;pointer-events:none";
            document.body.appendChild(ta);
            ta.select();
            let ok = false;
            try {
                ok = document.execCommand("copy");
            } catch {
                /* ignore */
            }
            ta.remove();
            return ok;
        }
    }
    let copyTimer = 0;
    copyBtn.addEventListener("click", async () => {
        const text = buildState();
        const ok = await writeClipboard(text);
        if (!ok) console.log(text);
        copyBtn.textContent = ok
            ? "Copied"
            : "Clipboard blocked — logged to console";
        clearTimeout(copyTimer);
        copyTimer = window.setTimeout(() => {
            copyBtn.textContent = "Copy changes";
        }, 1800);
    });

    resetBtn.addEventListener("click", () => {
        model.resetAll();
        panel.syncAll();
        onEdited();
    });

    return panel;
}
