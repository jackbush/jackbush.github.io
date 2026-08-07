export interface CVEntry {
    organisation: string;
    role: string;
    dates: string;
    description: string;
    listItems?: string[];
}

export const experience: CVEntry[] = [
    {
        organisation: "Circulor",
        role: "VP Product",
        dates: "Jan 2024 – Jun 2026",
        description:
          "Owned product, design, research and product marketing for an enterprise supply-chain traceability and Digital Product Passport platform. Took it from a fragmented, support-operated legacy suite to a single self-serve platform.",
        listItems: [
          "Moved customers off support and onto the product: System Usability Scale score from 15 to 80, AA accessibility score.",
          "Rebuilt with a modern front-end, customer API and data lake, swapping Oracle for AWS and open source: faster to build, easier to hire, 25% cheaper to run.",
          "Cut supply chain configuration time 70% with one-time setup, and shipped an AI assistant for API onboarding so engineers stopped working as consultants.",
          "Made privacy the differentiator: selective disclosure permissions let suppliers prove provenance without exposing commercially sensitive data.",
          "Restructured product and engineering into cross-functional teams with embedded design, clear ownership and a prioritisation model tied to strategy.",
          // "Built a product marketing function and packaged two off-the-shelf propositions, shifting sales from bespoke pilots to repeatable product deals.",
        ],
  },
    {
        organisation: "OVO",
        role: "Principal Product Designer",
        dates: "Oct 2020 – Jan 2024",
        description:
          "Led company-wide initiatives including design system, consumer app strategy, accessibility strategy and training, and research and design events for a 40-person design team.",
        listItems: [
          "Doubled app engagement",
          "AA accessibility across all customer products",
          "Every customer product on one design system",
          "Energy usage tool reduced customer bills",
        ],
    },
    // {
    //     organisation: "OVO",
    //     role: "Product Lead",
    //     dates: "Oct 2020 – Jan 2022",
    //     description:
    //       "Led product and design for six autonymous teams owning operational tooling. Built frameworks used across the rest of OVO.",
    // },
    {
        organisation: "Kantan",
        role: "Head of Design",
        dates: "Jun 2019 – Oct 2020",
        description:
          "Built and led a multidisciplinary design team responsible for ethnographic research, product strategy, service design, product design, user testing and brand.",
    },
    {
        organisation: "Rocket Lawyer",
        role: "Product Innovation Consultant",
        dates: "Jul 2018 – Jun 2019",
        description:
          "Started an innovation team to research, design and prototype whether emerging technology could make legal help reach people who normally can't afford it.",
      listItems: [
          "Built an escrow payment service, connected to the language in the contract.",
        ],
  },
    {
        organisation: "Everledger",
        role: "Head of Product",
        dates: "Oct 2016 – Jul 2018",
        description:
          "Set up the product and design function from scratch. Took a waterfall team spread thin across 20+ parallel projects and turned it into one agile team shipping a market-leading platform for provenance tracking, so you can actually trust where a thing came from.",
    },
    {
        organisation: "Make Us Proud",
        role: "Product Designer + Engineer",
        dates: "Apr 2015 – Aug 2016",
        description:
          "End-to-end agency work covering research, propositions, prototyping, user testing and delivery of platforms, websites, an art installation and a product playbook.",
        listItems: [
          "Won Best Exhibition Design at London Design Week (2016)",
        ],
},
    {
        organisation: "Ponoko",
        role: "Production Manager",
        dates: "Sep 2010 – Apr 2013",
        description:
          "On-demand prototyping and manufacturing for NZ and Australia.",
        listItems: [
          "Reduced order turnaround from 10 days to 48 hours",
          "Cut material costs by 25%",
        ],
    },
    {
        organisation: "Victoria University",
        role: "Research Assistant",
        dates: "Nov 2012 – Jan 2013",
        description:
          "Found and documented Vishnu shrines in the Kathmandu valley, narrating local myths about the origins of the cosmos, and integrated into a series of drawings."
    },
];
