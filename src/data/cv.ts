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
      "Collaborating with all functions, defining product strategy, building a high-performing team responsible for product management, design, research and marketing.",
    },
    {
        organisation: "OVO",
        role: "Principal Product Designer",
        dates: "Jan 2022 – Jan 2024",
        description:
            "Led company-wide initiatives including design system, consumer app strategy, accessibility strategy and training, and research and design events.",
        listItems: [
            "Doubled app engagement"
        ],

},
    {
        organisation: "OVO",
        role: "Lead Product Manager",
        dates: "Oct 2020 – Jan 2022",
        description:
            "Developed product and design frameworks used across OVO. Led product management and design across six agile, autonomous, cross-functional teams.",
    },
    {
        organisation: "Kantan",
        role: "Head of Design",
        dates: "Jun 2019 – Oct 2020",
        description:
            "Formed a multidisciplinary design team responsible for ethnographic research, product strategy, service design, product design, user testing and brand.",
    },
    {
        organisation: "Rocket Lawyer",
        role: "Product Innovation Consultant",
        dates: "Jul 2018 – Jun 2019",
        description:
            "Set up an innovation team to research, design and prototype how emerging technologies might make justice more widely available.",
    },
    {
        organisation: "Everledger",
        role: "Head of Product",
        dates: "Oct 2016 – Jul 2018",
        description:
            "Introduced product and design function. Transformed a waterfall team working on 20+ parallel projects into an agile team delivering a market-leading platform.",
    },
    {
        organisation: "Make Us Proud",
        role: "Product Designer + Engineer",
        dates: "Apr 2015 – Aug 2016",
        description:
            "End-to-end agency work covering research, propositions, prototyping, user testing and delivery of platforms, websites, an art installation and a product playbook.",
        listItems: [
            "Won Best Exhibition Design at London Design Week (2016)"
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

