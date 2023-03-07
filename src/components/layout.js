import * as React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import Helmet from "react-helmet";
// import Nav from "./nav";
import { themeColour, typography, space } from "../tokens";

const themes = Object.keys(themeColour)
const themeName = "darkGrey";

const borderStyles = '1px solid ' + themeColour[themeName].contrast

const listStyles = {
  listStyle: "none",
};

const linkStyles = {
  ...typography.body,
  color: themeColour[themeName].contrast,
};

const headerStyles = {
  borderBottom: borderStyles
}

const pageStyles = {
  background: themeColour[themeName].background,
  color: themeColour[themeName].content,
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  overflow: 'scroll',
};

const pageInnerStyles = {
  padding: space[12],
}

const footerStyles = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  padding: space[2],
  paddingRight: space[4],
  textAlign: 'right',
  borderTop: borderStyles,
}

export default function Layout({ children }) {
  const data = useStaticQuery(
    graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            menuLinks {
              name
              link
            }
          }
        }
      }
    `
  );
  return (
    <>
      <Helmet
        titleTemplate={`%s | ${data.site.siteMetadata.title}`}
        defaultTitle={data.site.siteMetadata.title}
      />
      <div style={pageStyles}>
        <nav style={headerStyles}>
          <ul style={listStyles}>
            {data.site.siteMetadata.menuLinks.map((item) => (
              <li key={item.link}>
                <Link to={item.link} style={linkStyles}>
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <span style={typography.body}>Theme: </span>
                <select>
                  {themes.map((i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
            </li>
          </ul>
        </nav>
        <div style={pageInnerStyles}>
          {children}
        </div>
      </div>
    </>
  );
}
