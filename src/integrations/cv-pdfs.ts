// Prints each version of the CV page to its PDF with headless Chrome, so the page's download
// button has files to fetch: after a build into dist/, and on request under `astro dev`, with
// any design settings edited in the page's sidebar (passed on in the PDF's query). The page
// lays itself out in the browser (fonts, then pagination), so Chrome loads it from a server
// rather than as a file.

import type { AstroIntegration } from "astro";
import { execFile } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, mkdtemp, readFile, rm, stat } from "node:fs/promises";
import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import { tmpdir } from "node:os";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { CV_PAGE, cvVersions } from "../data/cv";

const CHROMES = [
    process.env.CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome", // GitHub's Ubuntu runners
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
];

const TYPES: Record<string, string> = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".png": "image/png",
};

/** Prints the CV page, served from `origin`, with `query` (its version and any edits), to the
 *  PDF at `out`. */
async function print(origin: string, query: URLSearchParams, out: string) {
    const chrome = CHROMES.find((c) => c && existsSync(c));
    if (!chrome)
        throw new Error(
            "cv-pdfs: no Chrome to print the CV with; set CHROME_PATH",
        );
    await mkdir(dirname(out), { recursive: true });
    await promisify(execFile)(chrome, [
        "--headless",
        "--disable-gpu",
        // Ubuntu's runners don't allow Chrome's sandbox; this only prints our own page.
        "--no-sandbox",
        "--no-pdf-header-footer",
        // Wide enough for the page's editor: narrower, it hides the sheets it paginates.
        "--window-size=1440,1000",
        // Time for the fonts to load and the page to paginate.
        "--virtual-time-budget=10000",
        `--print-to-pdf=${out}`,
        `${origin}${CV_PAGE}?${query}`,
    ]);
    if (!existsSync(out))
        throw new Error(`cv-pdfs: Chrome didn't write ${out}`);
}

/** Serves dist/ on a free port; "/pdf" is "/pdf/index.html". */
async function serve(root: string) {
    const server = createServer(async (req, res) => {
        const path = decodeURIComponent(new URL(req.url!, "http://x").pathname);
        let file = join(root, path);
        try {
            if ((await stat(file)).isDirectory())
                file = join(file, "index.html");
            res.setHeader("Content-Type", TYPES[extname(file)] ?? "");
            res.end(await readFile(file));
        } catch {
            res.statusCode = 404;
            res.end();
        }
    });
    await new Promise<void>((done) => server.listen(0, "127.0.0.1", done));
    return server;
}

export default function cvPdfs(): AstroIntegration {
    return {
        name: "cv-pdfs",
        hooks: {
            // Under `astro dev`, prints a version whenever its PDF is asked for, from the dev
            // server itself, so the download always matches the code.
            "astro:server:setup": ({ server, logger }) => {
                server.middlewares.use(async (req, res, next) => {
                    const url = new URL(req.url!, "http://x");
                    const version = cvVersions.find(
                        (v) => url.pathname === `/${v.path}`,
                    );
                    if (!version) return next();
                    url.searchParams.set("location", version.key);
                    const { port } =
                        server.httpServer!.address() as AddressInfo;
                    const dir = await mkdtemp(join(tmpdir(), "cv-pdfs-"));
                    try {
                        const out = join(dir, "cv.pdf");
                        await print(
                            `http://localhost:${port}`,
                            url.searchParams,
                            out,
                        );
                        res.setHeader("Content-Type", "application/pdf");
                        res.end(await readFile(out));
                    } catch (error) {
                        logger.error(String(error));
                        res.statusCode = 500;
                        res.end(String(error));
                    } finally {
                        await rm(dir, { recursive: true, force: true });
                    }
                });
            },
            "astro:build:done": async ({ dir, logger }) => {
                const root = fileURLToPath(dir);
                const server = await serve(root);
                const { port } = server.address() as AddressInfo;
                try {
                    for (const { key, path } of cvVersions) {
                        await print(
                            `http://127.0.0.1:${port}`,
                            new URLSearchParams({ location: key }),
                            join(root, path),
                        );
                        logger.info(path);
                    }
                } finally {
                    server.close();
                }
            },
        },
    };
}
