import * as React from "react";
import Layout from "../components/layout";
import { typography } from "../tokens";

const IndexPage = () => {
  return (
    <Layout>
      <main>
        <h1 style={typography.title}>👋 Hi</h1>
      </main>
    </Layout>
  );
};

export default IndexPage;

// export const Head = () => <title>Home Page</title>
