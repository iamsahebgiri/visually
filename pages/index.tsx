import React, { useMemo } from "react";
import type { NextPage } from "next";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import BubbleSort from "../components/sorting/bubble-sort";

const Home: NextPage = () => {
  return (
    <div className="h-screen">
      <ParentSize>
        {({ width, height }) => <BubbleSort width={width} height={height} />}
      </ParentSize>
    </div>
  );
};

export default Home;
