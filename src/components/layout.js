import * as React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import Helmet from "react-helmet";
// import Nav from "./nav";
import { semanticColour, typography, space } from "../tokens";

const listStyles = {
  listStyle: "none",
  padding: 0,
  paddingRight: space[4],
  textAlign: "right",
};

const linkStyles = {
  ...typography.body,
  color: semanticColour.contrast,
  textAlign: "right",
};

const listItemStyles = {
  display: "inline",
  marginLeft: space[4],
};

const headerStyles = {
  // borderBottom: "1px solid " + semanticColour.contrast,
};

const pageStyles = {
  background: semanticColour.background,
  color: semanticColour.content,
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  overflow: "scroll",
};

const pageInnerStyles = {
  padding: space[12],
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
        <nav style={headerStyles}>
          <ul style={listStyles}>
            {data.site.siteMetadata.menuLinks.map((item) => (
              <li style={listItemStyles} key={item.link}>
                <Link to={item.link} style={linkStyles}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div style={pageInnerStyles}>{children}</div>
      </div>
    </>
  );
}
