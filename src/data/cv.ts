// The CV (src/pages/pdf.astro): its versions, one per location. The build prints each
// version to a PDF (src/integrations/cv-pdfs.ts).

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
            "team design",
            "hiring and team building",
            "coaching",
            "career frameworks",
            "performance management",
            "board reporting",
            "budget ownership",
            "OKRs",
        ],
    },
    {
        group: "Product",
        skills: [
            "product strategy",
            "propositions",
            "roadmapping",
            "discovery",
            "API-first platforms",
        ],
    },
    {
        group: "Design",
        skills: [
            "product design",
            "interaction design",
            "design systems",
            "accessibility (WCAG 2.2, WCAG 3.0)",
            "information architecture",
        ],
    },
    {
        group: "Research",
        skills: [
            "user research",
            "ethnography",
            "mental models",
            "usability testing",
            "service design",
        ],
    },
];
