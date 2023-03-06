import * as React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import Helmet from "react-helmet";
// import Nav from "./nav";
import { themeColour, typography } from "../tokens";

const themeName = "lightGrey";

const listStyles = {
  listStyle: "none",
};

const linkStyles = {
  ...typography.body,
  color: themeColour[themeName].contrast,
};

const pageStyles = {
  background: themeColour[themeName].background,
  color: themeColour[themeName].content,
  padding: 96,
  margin: "0 auto",
  maxWidth: 640,
};

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
        <nav>
          <ul style={listStyles}>
            {data.site.siteMetadata.menuLinks.map((item) => (
              <li key={item.link}>
                <Link to={item.link} style={linkStyles}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {children}
      </div>
    </>
  );
}
