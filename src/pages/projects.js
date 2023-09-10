import * as React from "react";
import Helmet from "react-helmet";
import Layout from "../components/layout";
import Badge from "../components/badge";
import { semanticColour, typography, space } from "../tokens";
import { projects } from "../content/projects";

const listStyles = {
  listStyle: "none",
  padding: 0,
  margin: 0,
};

const listItemStyles = {
  padding: 0,
  margin: 0,
  marginBottom: space[5],
};

const projectNameStyles = {
  ...typography.lead,
  color: semanticColour.message,
};

const projectDescriptionStyles = {
  ...typography.body,
  color: semanticColour.messageAlt,
  marginTop: space[1],
};

export default function Component() {
  return (
    <Layout>
      <Helmet title="Projects" />
      <main>
        <h1 style={typography.title}>🐳 Projects</h1>
        <ul style={listStyles}>
          {projects.map((project) => (
            <li key={project.name} style={listItemStyles}>
              <a
                style={projectNameStyles}
                href={project.url}
                target="_blank"
                rel="noreferrer"
              >
                {project.name}
              </a>
              {project.isWIP ? <Badge label="WIP" /> : null}
              <p style={projectDescriptionStyles}>{project.description}</p>
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
}
