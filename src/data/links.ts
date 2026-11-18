// Parts of this site that live in their own repos. Links to them open in this tab and carry
// ?from=home, which their back links read to point here. Every other link (my standalone
// tools, anyone else's site) opens in a new tab, marked by NewTab.astro.
const SECTIONS = ["/glimmers/", "/albums/"];

export function linkTo(href: string) {
    const url = new URL(href);
    const section =
        url.origin === new URL(import.meta.env.SITE).origin &&
        SECTIONS.some((path) => url.pathname.startsWith(path));
    if (!section)
        return {
            newTab: true,
            attrs: { href, target: "_blank", rel: "noopener noreferrer" },
        };
    url.searchParams.set("from", "home");
    return { newTab: false, attrs: { href: url.href } };
}

export type Browser = "chrome" | "firefox";

/** The browser whose extension store a visitor can install from, if any. */
export function currentBrowser(): Browser | null {
    const ua = navigator.userAgent;
    // The extensions are desktop only.
    if (/Android|iPhone|iPad|Mobile/.test(ua)) return null;
    if (/Firefox\//.test(ua)) return "firefox";
    // Edge, Brave, Arc and the rest are built on Chromium, so they install from the Chrome
    // Web Store too.
    const brands = (
        navigator as { userAgentData?: { brands: { brand: string }[] } }
    ).userAgentData?.brands;
    if (brands?.some(({ brand }) => brand === "Chromium")) return "chrome";
    return null;
}
