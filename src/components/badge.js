import * as React from "react";
import { semanticColour, typography, space } from "../tokens";

const badgeStyles = {
  ...typography.body,
  fontWeight: "bold",
  background: semanticColour.messageAlt,
  color: semanticColour.contrast,
  padding: space[1],
  borderRadius: space[1],
  opacity: 0.3,
  marginLeft: space[2],
};

export default function Badge({ label }) {
  return <span style={badgeStyles}>{label}</span>;
}
