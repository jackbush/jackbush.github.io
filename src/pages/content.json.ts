// The page's copy as JSON, for the glimmers homepage prototype, which fetches it to try its
// switch under the real page. Covers come resized, as absolute URLs.

import type { APIRoute } from "astro";
import { getImage } from "astro:assets";
import { intro } from "../data/intro";
import { projects } from "../data/projects";
import { roles } from "../data/roles";

/** Cover widths: a landscape header fills the card; a side cover is a third of it. */
const WIDTH = { landscape: 960, phone: 480, square: 480 };

export const GET: APIRoute = async ({ site }) => {
    const abs = (path: string) => new URL(path, site).href;
    const out = await Promise.all(
        projects.map(async (p) => {
            if ("vimeo" in p || !p.cover) return p;
            const { image, ...cover } = p.cover;
            const img = await getImage({ src: image, width: WIDTH[cover.format] });
            return {
                ...p,
                cover: {
                    ...cover,
                    image: abs(img.src),
                    width: image.width,
                    height: image.height,
                    ...("video" in cover && cover.video ? { video: abs(cover.video) } : {}),
                },
            };
        }),
    );
    return new Response(JSON.stringify({ intro, projects: out, roles }), {
        headers: { "Content-Type": "application/json" },
    });
};
