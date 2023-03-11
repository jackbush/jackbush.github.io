import * as React from "react";
import Layout from "../components/layout";
import { typography } from "../tokens";
import { attachSketchesToIds } from "../sketches";

const sketchContainterStyles = {
  height: 400,
};
const IndexPage = () => {
  return (
    <Layout>
      <main>
        <h1 style={typography.title}>👋 Hi</h1>
        <button onClick={attachSketchesToIds}>run</button>
        <div style={sketchContainterStyles} id="jsSketchBlob" />
      </main>
    </Layout>
  );
};

export default IndexPage;

// export const Head = () => <title>Home Page</title>

// #jsSketchBlob
// #jsSketchConstellations
// #jsSketchLines

// <div style={sketchContainterStyles} id="jsSketchBlob" />
// <div style={sketchContainterStyles} id="jsSketchConstellations" />
// <div style={sketchContainterStyles} id="jsSketchLines" />
