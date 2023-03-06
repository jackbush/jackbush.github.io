import * as React from "react";
import { Link } from "gatsby";
import { typography } from "../tokens";

const listStyles = {
  listStyle: "none",
};

const linkStyles = {
  ...typography.body,
  color: "black",
  opacity: 0.7,
};

export default function Nav({ links, color }) {
  return (
    <nav>
      <ul style={listStyles}>
        {links.map((item) => (
          <li key={item.link}>
            <Link to={item.link} style={linkStyles}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
