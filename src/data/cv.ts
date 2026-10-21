// The CV (src/pages/pdf.astro): its versions, one per location, its skills and its design
// settings. The build prints each version to a PDF (src/integrations/cv-pdfs.ts).

export const CV_PAGE = "/pdf";

/** One version per place, each a PDF; the first is the page's default. */
export const cvVersions = [
    { key: "nz", location: "Christchurch, NZ" },
    { key: "uk", location: "London, UK" },
].map((v) => ({
    ...v,
    /** Where the build writes the PDF, under dist/. */
    path: `cv/cv-jack-bush-${v.key}.pdf`,
    /** The name it downloads as. */
    filename: `CV Jack Bush ${v.key.toUpperCase()}.pdf`,
}));

/** Skills, in groups run together as one paragraph, lower case after each group name. */
export const cvSkills: { group: string; skills: string[] }[] = [
    {
        group: "Leadership",
        skills: [
            "hiring",
            "team building",
            "coaching",
            "career frameworks",
            "org design",
            "scalable processes",
            "AI adoption",
            "OKRs",
            "budget ownership",
            "stakeholder alignment",
            "board reporting",
        ],
    },
    {
        group: "Product",
        skills: [
            "product strategy",
            "AI strategy",
            "discovery",
            "prioritisation",
            "roadmapping",
            "go-to-market",
            "experimentation",
            "analytics",
            "agentic coding",
            "API-first platforms",
        ],
    },
    {
        group: "Design",
        skills: [
            "user research",
            "ethnography",
            "information architecture",
            "interaction and visual design",
            "AI prototyping",
            "design systems",
            "service design",
            "data viz",
            "accessibility (WCAG 2.2)",
        ],
    },
];

/** A design setting: the CSS custom property `--${name}`. A colour has a hex `value`; a
 *  number has its `unit` ("" for weights and line heights) and the `step` its input moves by. */
export type CvSetting = { name: string; label: string } & (
    { value: string } | { value: number; unit: string; step: number }
);

/** A setting's value as CSS. */
export const cssValue = (s: CvSetting, value: string | number) =>
    "unit" in s ? `${value}${s.unit}` : String(value);

const size = (name: string, label: string, value: number) => ({
    name,
    label,
    value,
    unit: "rem",
    step: 0.0625,
});
const weight = (name: string, label: string, value: number) => ({
    name,
    label,
    value,
    unit: "",
    step: 100,
});
const mm = (name: string, label: string, value: number) => ({
    name,
    label,
    value,
    unit: "mm",
    step: 1,
});

/** Every design setting on the CV page, in the editor sidebar's groups. Colours are each
 *  ≥5.7:1 on the paper. Under `astro dev`, edits made in the sidebar ride along in the URL
 *  and into the PDFs the dev server prints. */
export const cvDesign: { group: string; settings: CvSetting[] }[] = [
    {
        group: "Colours",
        settings: [
            { name: "paper", label: "Paper", value: "#f7f1e4" },
            { name: "desk", label: "Desk", value: "#e6decd" },
            { name: "navy", label: "Headings", value: "#1b2a47" },
            { name: "slate", label: "Text", value: "#36414f" },
            { name: "grey", label: "Small print", value: "#565c66" },
        ],
    },
    {
        group: "Page",
        settings: [
            mm("margin-top", "Top margin", 19),
            mm("margin-side", "Side margins", 20),
            mm("margin-bottom", "Bottom margin", 20),
            size("section-gap", "Space above sections", 1.25),
            size("item-gap", "Space between items", 0.875),
        ],
    },
    {
        group: "Name",
        settings: [
            size("name-size", "Size", 2.75),
            weight("name-weight", "Weight", 900),
        ],
    },
    {
        group: "Tagline",
        settings: [
            size("tagline-size", "Size", 1.25),
            weight("tagline-weight", "Weight", 500),
        ],
    },
    {
        group: "Section headings",
        settings: [
            size("section-size", "Size", 1.375),
            weight("section-weight", "Weight", 800),
        ],
    },
    {
        group: "Organisations",
        settings: [
            size("organisation-size", "Size", 1.0625),
            weight("organisation-weight", "Weight", 800),
        ],
    },
    {
        group: "Roles",
        settings: [
            size("role-size", "Size", 1),
            weight("strong-weight", "Weight (and bold text)", 600),
        ],
    },
    {
        group: "Body",
        settings: [
            size("body-size", "Size", 0.8125),
            { ...weight("body-leading", "Line height", 1.4), step: 0.05 },
            size("highlight-gap", "Space between bullets", 0.1875),
        ],
    },
    {
        group: "Small print",
        settings: [
            size("meta-size", "Size", 0.6875),
            weight("meta-weight", "Weight", 500),
            {
                name: "meta-tracking",
                label: "Letter spacing",
                value: 0.06,
                unit: "em",
                step: 0.01,
            },
        ],
    },
];
