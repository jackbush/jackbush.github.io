import * as React from "react";
import { StaticQuery, graphql } from "gatsby";
import Helmet from "react-helmet";
import Nav from "./nav";

const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
  margin: "0 auto",
  maxWidth: 640,
};

export default function Layout({ children }) {
  return (
    <StaticQuery
      query={graphql`
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
      `}
      render={(data) => (
        <>
          <Helmet
            titleTemplate={`%s | ${data.site.siteMetadata.title}`}
            defaultTitle={data.site.siteMetadata.title}
          />
          <div style={pageStyles}>
            <Nav links={data.site.siteMetadata.menuLinks} />
            {children}
          </div>
        </>
      )}
    />
  );
}
