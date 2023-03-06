// multiples of 4, except 0 = 1
export const space = [
  1, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64,
];

// not exported...
const coreColour = {
  black: "#191820",
  grey: "#413F4B",
};

export const themeColour = {
  darkGrey: {
    content: "#ffffff",
    contentAlt: "#9E9E9E",
    background: "#272727",
    contrast: "#FC4409",
  },
  lightGrey: {
    content: "#000000",
    contentAlt: "#6d6d6d",
    background: "#ffffff",
    contrast: "#A3A3A3",
  },
  green: {
    content: "#000000",
    contentAlt: "#ffffff",
    background: "#98E69A",
    contrast: "#053074",
  },
  pink: {
    content: "#000000",
    contentAlt: "#6C565A",
    background: "#FFC6D0",
    contrast: "#FC636F",
  },
};

// incomplete
export const semanticColour = {
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
