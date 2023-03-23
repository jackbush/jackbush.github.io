import * as React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import { typography } from "../tokens";
import { projects } from "../content/projects";

export default function Component() {
  return (
    <Layout>
      <main>
        <h1 style={typography.title}>🐳 Projects</h1>
          <ul>
            {projects.map((project) => (
              <li key={ project.name }>
                <Link to={ project.url_live }>
                  { project.name }
                </Link>
                <p>{ project.description }</p>
              </li>
            ))}
          </ul>
      </main>
    </Layout>
  );
}
