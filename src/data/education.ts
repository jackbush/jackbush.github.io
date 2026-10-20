/** A qualification, with the years it started and ended. */
export interface Education {
    institution: string;
    qualification: string;
    start: number;
    end: number;
}

export const education: Education[] = [
    {
        institution: "Victoria University of Wellington",
        qualification: "Bachelor of Design Innovation, Industrial Design",
        start: 2009,
        end: 2012,
    },
];
