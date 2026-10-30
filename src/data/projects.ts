import type { ImageMetadata } from "astro";

import albumsCover from "../assets/covers/albums-norway.jpg";
import atlasNightsPoster from "../assets/covers/atlas-nights.jpg";
import atlasNightsVideo from "../assets/covers/atlas-nights.mp4?url";
import blackstarPoster from "../assets/covers/blackstar.jpg";
import blackstarVideo from "../assets/covers/blackstar.mp4?url";
import carverCover from "../assets/covers/carver.jpg";
import chromistCover from "../assets/covers/chromist.jpg";
import geodePoster from "../assets/covers/geode.jpg";
import geodeVideo from "../assets/covers/geode.mp4?url";
import lolaCover from "../assets/covers/lola.jpg";
import mettyCover from "../assets/covers/metty.jpg";
import quadraCover from "../assets/covers/quadra.jpg";
import risolinoCover from "../assets/covers/risolino.jpg";
import seeingBritainCover from "../assets/covers/seeing-britain.jpg";
import sprigPoster from "../assets/covers/sprig.jpg";
import sprigVideo from "../assets/covers/sprig.mp4?url";
import zenCover from "../assets/covers/zen-tentlife.jpg";
import zolaCover from "../assets/covers/zola.png";

/**
 * A project's cover, which sets its card's layout:
 * - `landscape`: a 3:2 header, cropped to fill; with `video`, a looping preview over `image`
 *   as its poster (the glimmers' own covers, from their sketch folders).
 * - `phone`: a phone screenshot beside the text, a third of the width.
 * - `square`: a square beside the text, a third of the width, stretched to the card's height
 *   and cropped from the centre.
 * Side covers alternate left and right down the list. Covers are decorative (alt=""), since
 * the card's name says what it is.
 */
export type Cover =
    | {
          format: "landscape";
          image: ImageMetadata;
          video?: string;
      }
    | { format: "phone" | "square"; image: ImageMetadata };

type Link = { label: string; url: string };

interface Base {
    name: string;
    description: string;
    /** A second link, as a bar along the bottom of the card. */
    link?: Link;
}

/**
 * A card links to `url`, or plays a Vimeo video in place (a 16:9 header) instead. A card with
 * only a `link` is just the bar, and isn't in content.json.
 */
export type Project =
    | (Base & ({ url: string; cover?: Cover } | { vimeo: string }))
    | { link: Link };

export const projects: Project[] = [
    {
        name: "Sprig",
        description:
            "Botanical studies. Be taken on an arboreal tour, or click the settings cog and invent some plants. A bit like a god.",
        url: "https://jackbush.github.io/glimmers/sprig/",
        cover: { format: "landscape", image: sprigPoster, video: sprigVideo },
    },
    {
        name: "Zola",
        description:
            "Build more accessible products. Each card describes a person's experience and the needs a design should accommodate.",
        url: "https://jackbush.github.io/zola/",
        cover: { format: "landscape", image: zolaCover },
    },
    {
        name: "Risolino",
        description:
            "Make riso-style prints. Customise the ink blending, shading mode and registration for some analogue charm.",
        url: "https://jackbush.github.io/risolino/",
        cover: { format: "landscape", image: risolinoCover },
        link: {
            label: "Make a graphic print (guided tutorial)",
            url: "https://jackbush.github.io/risolino/manual/#graphic",
        },
    },
    {
        name: "Lola",
        description: "After an extended bike tour led to daydreaming about nomadic life, we decided to build a home in a van.",
        url: "https://jackbush.github.io/albums/lola/",
        cover: { format: "landscape", image: lolaCover },
    },
    {
        name: "Carver",
        description:
            "Write in convenient markdown, export as beautiful PDF. Minimal by design, private by default, delightful by nature.",
        url: "https://jackbush.github.io/carver/",
        cover: { format: "landscape", image: carverCover },
    },
    {
        name: "Atlas Nights",
        description:
            "Spend a night star-gazing in the High Atlas. Choose constellation maps from regional sky cultures.",
        url: "https://jackbush.github.io/glimmers/atlas-nights/",
        cover: {
            format: "landscape",
            image: atlasNightsPoster,
            video: atlasNightsVideo,
        },
    },
    {
        name: "Albums",
        description:
            "Old-fashioned photo albums. Because social media is a mess, but it's nice to show your mum what you've been doing.",
        url: "https://jackbush.github.io/albums/",
        cover: { format: "landscape", image: albumsCover },
    },
    {
        name: "Blackstar",
        description:
            "An undulating black orb with a burning halo. Open the settings pane to design your own void.",
        url: "https://jackbush.github.io/glimmers/blackstar/",
        cover: {
            format: "landscape",
            image: blackstarPoster,
            video: blackstarVideo,
        },
    },
    {
        name: "Chromist",
        description:
            "Get your colours right. Build palettes for modern devices, see how they appear on old screens, audit accessibility against the next standards (WCAG 3.0).",
        url: "https://jackbush.github.io/chromist/",
        cover: { format: "square", image: chromistCover },
    },
    {
        name: "Metty",
        description:
            "Interface prototype for a robotic meditation timer, styled like a record player. Hardware build in progress.",
        url: "https://jackbush.github.io/metty/",
        cover: { format: "square", image: mettyCover },
    },
    {
        name: "Zen and the Art of Bikepacking Maintenance",
        description:
            "Photos for an essay on The Radavist about gumption, romantic thinking, quality, and bikepacking across Europe.",
        url: "https://theradavist.com/zen-and-bikepacking",
        cover: { format: "landscape", image: zenCover },
    },
    {
        name: "Mindflow",
        description:
            "Animated graphics that respond to your brain waves: focus to overlap the rings, relax to calm the outlines.",
        vimeo: "1215878977",
        link: {
            label: "Play with the animation settings",
            url: "https://jackbush.github.io/glimmers/mindflow/",
        },
    },
    {
        name: "Seeing Britain",
        description:
            "Learning my adoptive home by visiting every county. Mostly done by bicycle, tracked on an interactive map.",
        url: "https://jackbush.github.io/seeing-britain/",
        cover: { format: "square", image: seeingBritainCover },
    },
    {
        name: "Quadra",
        description:
            "Make QR codes without having your data scraped. Highly customisable, ISO-compliant and ad-free.",
        url: "https://jackbush.github.io/quadra/",
        cover: { format: "square", image: quadraCover },
    },
    {
        name: "Geode",
        description:
            "An experiment in browser-based ray tracing. Open the settings to grow your own crystals.",
        url: "https://jackbush.github.io/glimmers/geode/",
        cover: { format: "landscape", image: geodePoster, video: geodeVideo },
    },
    {
        link: {
            label: "Explore this site's theme and transition",
            // The homepage sketch draws this page's copy; #settings opens its pane.
            url: "https://jackbush.github.io/glimmers/homepage/#settings",
        },
    },
];

// A card without a cover still works (text only), but it's probably an oversight.
for (const p of projects) {
    if ("url" in p && !p.cover)
        console.warn(`src/data/projects.ts: ${p.name} has no cover.`);
}
