import * as React from "react";
import Layout from "../components/layout";
import { typography } from "../tokens";
import { blobSketchLoader } from "../sketches/blob";

const sketchContainerId = "jsSketchBlob";
const loadSketch = () => {
  blobSketchLoader(sketchContainerId);
};

const sketchContainterStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: -1,
};

const IndexPage = () => {
  return (
    <Layout>
      <div style={sketchContainterStyles} id={sketchContainerId} />
      <main>
        <h1 style={typography.title}>👋 Hi</h1>
        <button onClick={loadSketch}>run</button>
      </main>
    </Layout>
  );
};

export default IndexPage;

// export const Head = () => <title>Home Page</title>
