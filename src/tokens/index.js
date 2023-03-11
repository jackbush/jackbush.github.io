export * from "./typography";
export * from "./space";

export const coreColour = {
  black: "#171A26",
  slate: "#58595B",
  prussian: "#13283A",
  petrol: "#3D5C69",
  saphire: "#43538E",
  olive: "#676E3F",
  ochre: "#EDAF50",
  bronze: "#B08F6E",
  grey1: "#413F4B",
  grey2: "#D1D3D4",
  grey3: "#DCDDDE",
  grey4: "#fafafa",
  mintGreen: "#98E69A",
  navy: "#053074",
  darkBlue: "#1C2242",
  pink: "#FFC6D0",
  darkPink: "#FC636F",
  // this one needs to be rgb for p5
  lightblue: {
    r: 83,
    g: 193,
    b: 240,
  },
};

export const semanticColour = {
  content: coreColour.black,
  contentAlt: coreColour.grey1,
  background: coreColour.grey4,
  contrast: coreColour.darkBlue,
  line: coreColour.grey3,
};
