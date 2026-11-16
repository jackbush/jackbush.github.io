// npm run tweak: writes the settings pane's "Copy changes" blob back into the code.
//
//   npm run tweak            then paste the blob (it goes as soon as it's complete)
//   pbpaste | npm run tweak
//   npm run tweak -- '<blob>'
//
// A setting with a path in src/data/settings.ts goes into src/data/theme.ts at that path; the
// theme colour replaces whichever of themeColours it was changed from. The rest go into their
// `value` in settings.ts, as does a re-centred slider's range (`min`/`max`). Then theme.ts is
// loaded again, so its contrast check runs on the new values; if it fails, both files go back.

import { readFileSync, writeFileSync } from "node:fs";
import { settings, STATE_TAG, type SettingDef } from "../src/data/settings.ts";

const THEME = new URL("../src/data/theme.ts", import.meta.url);
const SETTINGS = new URL("../src/data/settings.ts", import.meta.url);

/** Stop with a message (nothing has been written yet when this is called). */
function fail(message: string): never {
    console.error(message);
    process.exit(1);
}

type Change = { from: unknown; to: unknown; range?: [number, number] };

async function readBlob(): Promise<string> {
    if (process.argv[2]) return process.argv.slice(2).join(" ");
    if (process.stdin.isTTY)
        console.log("Paste the changes from the settings pane:");
    let text = "";
    for await (const chunk of process.stdin) {
        text += chunk;
        try {
            JSON.parse(text);
            break; // complete: no need to wait for the end of input
        } catch {
            /* not yet */
        }
    }
    process.stdin.pause();
    return text;
}

/** A value as it's written in the code: colours in theme.ts are upper case. */
function literal(v: unknown, upper = false) {
    if (typeof v === "string") return `"${upper ? v.toUpperCase() : v}"`;
    return String(v);
}

/** The `{ … }` block that starts at or after `from`, as [start, end) offsets. */
function block(src: string, from: number): [number, number] {
    const start = src.indexOf("{", from);
    let depth = 0;
    for (let i = start; i < src.length; i++) {
        if (src[i] === "{") depth++;
        else if (src[i] === "}" && --depth === 0) return [start, i + 1];
    }
    fail("Unbalanced braces");
}

/** Replace `field: <value>` inside src[start, end). */
function setField(
    src: string,
    [start, end]: [number, number],
    field: string,
    value: string,
    where: string,
) {
    const inner = src.slice(start, end);
    const re = new RegExp(`(\\b${field}:\\s*)([^,\\n}]+)`);
    if (!re.test(inner)) fail(`No ${field} in ${where}`);
    return (
        src.slice(0, start) +
        inner.replace(re, (_, k) => k + value) +
        src.slice(end)
    );
}

function writeTheme(src: string, def: SettingDef, change: Change) {
    const path = def.path!;
    if (path === "themeColours") {
        const [start, end] = (() => {
            const at = src.indexOf("export const themeColours = [");
            return [at, src.indexOf("];", at)];
        })();
        const from = String(change.from).toUpperCase();
        const list = src.slice(start, end);
        if (!list.includes(`"${from}"`))
            fail(`themeColour: ${from} isn't one of themeColours any more`);
        return (
            src.slice(0, start) +
            list.replace(`"${from}"`, literal(change.to, true)) +
            src.slice(end)
        );
    }
    const [obj, field] = path.split(".");
    if (!field) {
        const re = new RegExp(`(export const ${obj} = )([^;]+);`);
        if (!re.test(src)) fail(`No ${obj} in theme.ts`);
        return src.replace(re, (_, k) => `${k}${literal(change.to)};`);
    }
    const at = src.indexOf(`export const ${obj} = {`);
    if (at < 0) fail(`No ${obj} in theme.ts`);
    return setField(src, block(src, at), field, literal(change.to), path);
}

function writeSettings(
    src: string,
    def: SettingDef,
    fields: Record<string, unknown>,
) {
    const at = src.indexOf(`key: "${def.key}"`);
    const open = src.lastIndexOf("{", at);
    for (const [field, value] of Object.entries(fields))
        src = setField(src, block(src, open), field, literal(value), def.key);
    return src;
}

const text = await readBlob();
let blob;
try {
    blob = JSON.parse(text);
} catch {
    fail("That isn't the JSON the settings pane copies.");
}
// Blobs from the old glimmers homepage sketch carry the same keys.
if (blob.site !== STATE_TAG && blob.sketch !== "homepage")
    fail(`Not a settings blob (expected "site": "${STATE_TAG}")`);

const defs = new Map(
    settings.flatMap((g) => g.settings).map((d) => [d.key, d]),
);
let theme = readFileSync(THEME, "utf8");
let own = readFileSync(SETTINGS, "utf8");
const done: string[] = [];
const skipped: string[] = [];

for (const [key, change] of Object.entries(
    blob.changed as Record<string, Change>,
)) {
    const def = defs.get(key);
    if (!def) {
        skipped.push(key);
        continue;
    }
    if (def.path) theme = writeTheme(theme, def, change);
    else own = writeSettings(own, def, { value: change.to });
    if (change.range)
        own = writeSettings(own, def, {
            min: change.range[0],
            max: change.range[1],
        });
    done.push(
        `${key}: ${change.from} → ${change.to}` +
            (change.range ? ` (range ${change.range.join("–")})` : ""),
    );
}

const before = [readFileSync(THEME, "utf8"), readFileSync(SETTINGS, "utf8")];
writeFileSync(THEME, theme);
writeFileSync(SETTINGS, own);
// theme.ts checks every theme's contrast as it loads.
try {
    await import(`${THEME.href}?${Date.now()}`);
} catch (e) {
    writeFileSync(THEME, before[0]);
    writeFileSync(SETTINGS, before[1]);
    fail(`Nothing written: ${(e as Error).message}`);
}
for (const line of done) console.log("  " + line);
if (skipped.length)
    console.log(`Skipped (not settings here): ${skipped.join(", ")}`);
if (!done.length) console.log("Nothing to change.");
