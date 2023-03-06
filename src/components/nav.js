import * as React from "react"
import { Link } from "gatsby"

const listStyles = {
  listStyle: 'none',
}

const linkStyles = {
  color: 'black',
  opacity: 0.7,
}

export default function Layout({ links }) {
  return (
    <nav>
      <ul style={listStyles}>
        {links.map(item => (
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
