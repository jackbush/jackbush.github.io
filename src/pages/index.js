import * as React from "react";
import Layout from "../components/layout";
import { blobSketchLoader } from "../sketches/blob";

const sketchContainerId = "jsSketchBlob";

const sketchContainterStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: -1,
};

const IndexPage = () => {
  React.useEffect(() => {
    if (typeof window !== "undefined" && document) {
      blobSketchLoader(sketchContainerId);
    }
  }, []);
  return (
    <Layout>
      <div style={sketchContainterStyles} id={sketchContainerId} />
    </Layout>
  );
};

export default IndexPage;
