// multiples of 4, except 0 = 1
export const space = [
  1, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64,
];

// not exported...
const coreColour = {
  pink: "#FFB7C6",
  black: "#191820",
  grey: "#413F4B",
};

export const semanticColour = {
  background: coreColour.pink,
  content: coreColour.black,
  contentAlt: coreColour.grey,
};

export const typography = {
  title: {
    fontFamily: "Open Sans, sans-serif, serif",
    fontSize: 36,
    fontWeight: 600,
    lineHeight: 1.22222,
  },
  heading: {
    fontFamily: "Open Sans, sans-serif, serif",
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 1.333333,
  },
  lead: {
    fontFamily: "Open Sans, sans-serif, serif",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.5,
  },
  body: {
    fontFamily: "Open Sans, sans-serif, serif",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 1.5,
  },
};
