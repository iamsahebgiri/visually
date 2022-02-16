import React, { useState, useMemo } from "react";
import { useInterval } from "react-use";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import Dropdown from "components/dropdown";
import IconButton from "components/icon-button";
import PlayIcon from "components/icons/play";
import Select from "components/select";
import BubbleSort from "components/sorting/bubble-sort";
import PauseIcon from "./icons/pause";
import { getBubbleSortTrace } from "utils/bubble-sort";
import generateRandomArray from "utils/generate-random-array";

const speeds = [
  { label: "Slower", value: 1500 },
  { label: "Slow", value: 1000 },
  { label: "Normal", value: 500 },
  { label: "Fast", value: 250 },
  { label: "Faster", value: 100 },
];

const originalData = generateRandomArray(10);

export default function Playground() {
  const [speed, setSpeed] = useState(speeds[2]);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [step, setStep] = useState(0);

  const trace = useMemo(() => getBubbleSortTrace(originalData), []);
  const [data, setData] = useState(trace[0]);

  useInterval(
    () => {
      setStep((step + 1) % trace.length);
      setData(trace[step]);
      if (step === trace.length - 1) {
        setIsRunning(false);
        setIsCompleted(true);
      }
    },
    isRunning ? speed.value : null
  );

  const memoizedPlaybackButton = useMemo(
    () => (
      <PlaybackButton
        isRunning={isRunning}
        setIsRunning={setIsRunning}
        isCompleted={isCompleted}
        setIsCompleted={setIsCompleted}
      />
    ),
    [isCompleted, isRunning]
  );

  return (
    <div className="relative h-screen">
      <ParentSize>
        {({ width, height }) => (
          <BubbleSort width={width} height={height} data={data} />
        )}
      </ParentSize>

      <div className="absolute z-40 bottom-0 h-16 w-full">
        <div className="flex items-center justify-between px-4">
          <Select lists={speeds} selected={speed} setSelected={setSpeed} />
          {memoizedPlaybackButton}
          <Dropdown />
        </div>
      </div>
    </div>
  );
}

const PlaybackButton = ({
  isRunning,
  setIsRunning,
  isCompleted,
  setIsCompleted,
}) => {
  if (isRunning) {
    return (
      <IconButton
        onClick={() => {
          setIsRunning(false);
        }}
      >
        <PauseIcon className="mr-2 -ml-1 w-6 h-6 text-blue-500" />
        Pause
      </IconButton>
    );
  } else {
    if (!isCompleted) {
      return (
        <IconButton onClick={() => setIsRunning(true)}>
          <PlayIcon className="mr-2 -ml-1 w-6 h-6 text-blue-500" />
          Play
        </IconButton>
      );
    } else if (isCompleted) {
      return (
        <IconButton
          onClick={() => {
            setIsRunning(true);
            setIsCompleted(false);
          }}
        >
          <PlayIcon className="mr-2 -ml-1 w-6 h-6 text-blue-500" />
          Replay
        </IconButton>
      );
    }
    return (
      <IconButton onClick={() => setIsRunning(true)}>
        <PlayIcon className="mr-2 -ml-1 w-6 h-6 text-blue-500" />
        Resume
      </IconButton>
    );
  }
};
