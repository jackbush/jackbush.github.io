/** A case study's link; without a `url`, it asks for a password instead. */
export interface CaseStudy {
    label: string;
    url?: string;
}

export interface Role {
    organisation: string;
    /** The organisation's name on the CV, if it differs from the site's. */
    cvOrganisation?: string;
    role: string;
    /** First and last month in the role, as "YYYY-MM". */
    start: string;
    end: string;
    description: string;
    listItems?: string[];
    caseStudies?: CaseStudy[];
}

export const roles: Role[] = [
    {
        organisation: "Circulor",
        role: "Vice President, Product",
        start: "2024-01",
        end: "2026-06",
        description:
            "Owned product, design, research and product marketing. Rebuilt a pioneering suite of battery traceability tools as one simpler, self-serve platform, to compete as regulation softened and the market commoditised.",
        listItems: [
            "Packaged the platform into two off-the-shelf propositions, setting sales up for repeatable deals instead of bespoke solutions",
            "Rebuilt the platform API-first on AWS and open source, with a data lake and full API parity, cutting running costs 25%",
            "Addressed scaling bottlenecks: Cut back-of-house config time 70%, shipped self-serve API setup tool with AI assistant",
            "Restructured product and engineering into cross-functional, stream-aligned teams",
        ],
        caseStudies: [{ label: "Rebuilding traceability for batteries" }],
    },
    {
        organisation: "OVO Energy",
        role: "Principal Product Designer",
        start: "2020-10",
        end: "2024-01",
        description:
            "Led design of OVO’s consumer app and digital experience for 4m UK households, also owning the design system and accessibility.",
        listItems: [
            "Rebuilt the customer app from information architecture up, based on mental model research, growing users from 200k to 500k and doubling engagement",
            "Brought every customer product onto one design system at WCAG 2.2 AA, with open clinics and team-wide training",
        ],
        caseStudies: [{ label: "Redesigning energy for 4m households" }],
    },
    {
        organisation: "Kantan",
        role: "Head of Design",
        start: "2019-06",
        end: "2020-10",
        description:
            "First hire at a start-up using tools for independent tradespeople to build a network it could route jobs to. Built and led a design team covering research, service design, product design and brand.",
        listItems: [
            "Conceived an automated booking service from ethnographic research, converted 82% from email to booking",
            "Scaled from four local pilot users to a 1000+ engineer UK-wide network completing 200k jobs/year",
            "Implemented ride-alongs, with every colleague spending a day in the field",
        ],
        caseStudies: [{ label: "Designing trade tools in the field" }],
    },
    {
        organisation: "Rocket Lawyer",
        role: "Product Innovation Consultant",
        start: "2018-07",
        end: "2019-06",
        description:
            "Led research and development into how emerging technologies (electronic signatures, blockchain, smart contracts and payments) could make legal protection more accessible.",
        listItems: [
            "Designed Rocket Wallet, a payment protection service that released funds based on contract terms, taking it to private beta with partners",
        ],
    },
    {
        organisation: "Everledger",
        role: "Head of Product",
        start: "2016-10",
        end: "2018-07",
        description:
            "Set up the product and design function at an accelerator-stage start-up, leading it through growth to a $10.4m Series A.",
        listItems: [
            "Built the first decentralised platform for tracing provenance data across supply chains, securing 2m+ diamonds",
            "Used it to digitally track the first diamond across mining, cutting, polishing and certification, to a ring in a shop",
        ],
    },
    {
        organisation: "Make Us Proud",
        role: "Product Designer + Engineer",
        start: "2015-04",
        end: "2016-08",
        description:
            "Full-spectrum product consultancy covering research, propositions, prototyping, user testing and engineering. Projects included B2B platforms, marketing websites and experiences (VR, game, exhibition).",
        listItems: ["Won: Best Exhibition Design at London Design Week (2015)"],
    },
    {
        organisation: "Ponoko",
        role: "Production Manager",
        start: "2010-09",
        end: "2013-04",
        description:
            "Ran the workshop for an on-demand prototyping and manufacturing service covering NZ and Australia.",
        listItems: [
            "Reduced order turnaround from 10 days to 48 hours",
            "Cut material costs 25% by renegotiating with existing suppliers",
        ],
    },
    {
        organisation: "Victoria University",
        cvOrganisation: "Victoria University of Wellington",
        role: "Research Assistant",
        start: "2011-11",
        end: "2012-02",
        description:
            "Found and documented Vishnu shrines in the Kathmandu valley, narrating local myths about the origins of the cosmos, and integrated into a series of drawings.",
    },
];

const MONTHS = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");

/** "2024-01" → "Jan 2024". */
export const formatMonth = (month: string) => {
    const [year, m] = month.split("-");
    return `${MONTHS[Number(m) - 1]} ${year}`;
};

/** A role's dates as one line of text: "Jan 2024 – Jun 2026". */
export const formatDates = ({ start, end }: Pick<Role, "start" | "end">) =>
    `${formatMonth(start)} – ${formatMonth(end)}`;
