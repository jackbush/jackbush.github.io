export interface Project {
    name: string;
    description: string;
    url: string;
}

export const projects: Project[] = [
    {
        name: "RISO",
        description: "Risograph print emulator with realistic ink blending, registration jitter, shading models and analogue charm.",
        url: "https://jackbush.github.io/riso/",
    },
    {
        name: "Inclusive Design Scenarios",
        description: "Each card describes a real person's experience and needs. They're uncommon enough to be missed in most user testing cohorts, but need to be designed for.",
        url: "https://jackbush.github.io/inclusive-design-scenarios/",
    },
    {
        name: "Carver",
        description: "The markdown editor I couldn't find. Minimal by design, private by default, delightful by nature.",
        url: "https://jackbush.github.io/carver/",
    },
    {
        name: "Seeing Britain",
        description:
            "Mission to learn the corners of my adoptive home by visiting every county. Mostly done by bicycle, tracked on an interactive map.",
        url: "https://jackbush.github.io/seeing-britain/",
    },
    {
        name: "QR Cranker",
        description: "Easy, private and reliable QR codes. Privacy-first, ad-free and ISO compliant, with customisable appearance and legibility warnings.",
        url: "https://jackbush.github.io/qr-cranker/",
    },
    {
        name: "The Blob",
        description: "The Blob moves in its own way. Quite calming to watch.",
        url: "https://jackbush.github.io/the-blob/",
    },
    {
        name: "Bikepacking and the Art of Trailside Maintenance",
        description: "Photos for an essay about a summer bikepacking trip across Europe.",
        url: "https://theradavist.com/zen-and-bikepacking",
    },
    {
        name: "JSON Whisperer",
        description: "A fast, private JSON validator. Paste JSON, get instant feedback. Nothing leaves your browser.",
        url: "https://jackbush.github.io/json-whisperer/",
    },
    {
        name: "Constellations",
        description: "Generative night sky, drawing constellations between drifting stars.",
        url: "https://jackbush.github.io/constellations/",
    },
    {
        name: "Cubeland",
        description: "Experiment in 3D sketching.",
        url: "https://jackbush.github.io/cubeland/",
    },
];
