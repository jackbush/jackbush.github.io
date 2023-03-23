import * as React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import { semanticColour, typography, space } from "../tokens";
import { projects } from "../content/projects";

const listStyles = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  columns: 2,
};

const listItemStyles = {
  padding: 0,
  margin: 0,
  marginBottom: space[5],
};

const projectNameStyles = {
  ...typography.lead,
  color: semanticColour.content,
};

const projectDescriptionStyles = {
  ...typography.body,
  color: semanticColour.contentAlt,
  marginTop: space[1],
};

export default function Component() {
  return (
    <Layout>
      <main>
        <h1 style={typography.title}>🐳 Projects</h1>
        <ul style={listStyles}>
          {projects.map((project) => (
            <li key={project.name} style={listItemStyles}>
              <Link style={projectNameStyles} to={project.url_live}>
                {project.name}
              </Link>
              <p style={projectDescriptionStyles}>{project.description}</p>
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
}
