import * as React from "react";
import Layout from "../components/layout";
import { typography } from "../tokens";

export default function Component() {
  return (
    <Layout>
      <main>
        <h1 style={typography.title}>🔮 About</h1>
      </main>
    </Layout>
  );
}
