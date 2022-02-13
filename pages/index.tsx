import React from "react";
import type { NextPage } from "next";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import BubbleSort from "../components/sorting/bubble-sort";
import SplitPane from "react-split-pane";

const Home: NextPage = () => {
  return (
    <div className="h-screen">
      <SplitPane split="vertical" minSize="50%" primary="second">
        <div>Hello world</div>
        <ParentSize>
          {({ width, height }) => <BubbleSort width={width} height={height} />}
        </ParentSize>
      </SplitPane>
    </div>
  );
};

export default Home;
