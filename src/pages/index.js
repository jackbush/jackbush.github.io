import * as React from "react";
import Layout from "../components/layout";
import { typography } from "../tokens";
import { blobSketchLoader } from "../sketches/blob";

const sketchContainerId = "jsSketchBlob";
const loadSketch = () => {
  blobSketchLoader(sketchContainerId);
};

const sketchContainterStyles = {
  width: 300,
  height: 300,
};

const IndexPage = () => {
  return (
    <Layout>
      <main>
        <h1 style={typography.title}>👋 Hi</h1>
        <button onClick={loadSketch}>run</button>
        <div style={sketchContainterStyles} id={sketchContainerId} />
      </main>
    </Layout>
  );
};

export default IndexPage;

// export const Head = () => <title>Home Page</title>

// jsSketchConstellations
// jsSketchLines
