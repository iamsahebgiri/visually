import React, { useState } from "react";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import Dropdown from "components/dropdown";
import IconButton from "components/icon-button";
import PlayIcon from "components/icons/play";
import Select from "components/select";
import BubbleSort from "components/sorting/bubble-sort";

const speeds = [
  { label: "0.25", value: 1750 },
  { label: "0.5", value: 1500 },
  { label: "0.75", value: 1250 },
  { label: "Normal", value: 1000 },
  { label: "1.25", value: 750 },
  { label: "1.5", value: 500 },
  { label: "1.75", value: 250 },
  { label: "2", value: 100 },
];

export default function Playground() {
  const [speed, setSpeed] = useState(speeds[3]);

  return (
    <div className="relative h-screen">
      <ParentSize>
        {({ width, height }) => <BubbleSort width={width} height={height} speed={speed} />}
      </ParentSize>

      <div className="absolute z-40 bottom-0 h-16 w-full">
        <div className="flex items-center justify-between px-4">
          <Select lists={speeds} selected={speed} setSelected={setSpeed} />
          <IconButton>
            <PlayIcon className="mr-2 -ml-1 w-6 h-6 text-blue-500" />
            Run code
          </IconButton>
          <Dropdown />
        </div>
      </div>
    </div>
  );
}
