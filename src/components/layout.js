import * as React from "react"
import { StaticQuery, graphql } from "gatsby"
import Helmet from 'react-helmet'

const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
  margin: '0 auto',
  maxWidth: 640,
}

const listStyles = {
  marginBottom: 96,
  paddingLeft: 0,
}

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
      render={data => (
        <>
          <Helmet titleTemplate={`%s | ${data.site.siteMetadata.title}`} defaultTitle={data.site.siteMetadata.title} />
          <div  style={pageStyles}>
            <nav>
              <ul style={listStyles}>
                {data.site.siteMetadata.menuLinks.map(item => (
                  <li key={item.link}>
                    <a href={item.link} >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            {children}
          </div>
        </>
      )}
    />
  );
}
