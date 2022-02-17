import React from "react";
import type { NextPage } from "next";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import BubbleSort from "../components/sorting/bubble-sort";
import SplitPane from "react-split-pane";
import Playground from "components/playground";

const Home: NextPage = () => {
  return (
    <div className="h-screen">
      <Playground />
    </div>
  );
};

export default Home;
