import * as React from "react";
import Helmet from "react-helmet";
import Layout from "../components/layout";
import { typography } from "../tokens";

export default function Component() {
  return (
    <Layout>
      <Helmet title="About" />
      <main>
        <h1 style={typography.title}>🔮 About</h1>
      </main>
    </Layout>
  );
}
