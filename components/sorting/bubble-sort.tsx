/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useMemo, useState } from "react";
import { Group } from "@visx/group";
import { LinearGradient } from "@visx/gradient";
import { scaleBand, scaleLinear } from "@visx/scale";
import { useTransition, animated, to } from "@react-spring/web";
import { getBubbleSortTrace } from "../../utils/bubble-sort";

const verticalMargin = 120;

interface BarsProps {
  width: number;
  height: number;
  events?: boolean;
}

const originalData = [
  {
    id: "f30nshwck9u",
    value: 29,
    state: "unsorted",
  },
  {
    id: "0tumlygjcpr",
    value: 10,
    state: "unsorted",
  },
  {
    id: "shka5lat2da",
    value: 14,
    state: "unsorted",
  },
  {
    id: "2isw8ofrxuu",
    value: 37,
    state: "unsorted",
  },
  {
    id: "djyrlt4gx07",
    value: 15,
    state: "unsorted",
  },
];

const BubbleSort = ({ width, height, events = false }: BarsProps) => {
  // This is done to prevent weird sorting of x scale data
  if (width < 10) return null;

  // bounds
  const xMax = width;
  const yMax = height - verticalMargin;

  const [data, setData] = useState(originalData);

  const xScale = scaleBand<string>({
    range: [0, xMax],
    round: true,
    domain: data.map((d) => d.id),
    padding: 0.4,
  });

  const yScale = scaleLinear<number>({
    range: [yMax, 0],
    round: true,
    domain: [0, Math.max(...data.map((d) => d.value))],
  });

  useEffect(() => {
    const trace = getBubbleSortTrace(originalData);
    let i = 0;
    const t = setInterval(() => {
      if (i === trace.length) {
        clearInterval(t);
      } else {
        setData(trace[i++]);
      }
      console.log(i);
    }, 1000);

    return () => clearInterval(t);
  }, []);

  const transitions = useTransition(
    data.map((d) => ({
      ...d,
      x: xScale(d.id),
      y: yScale(d.value) ?? 0,
      height: yMax - (yScale(d.value) ?? 0),
      width: xScale.bandwidth(),
    })),
    {
      key: (item: any) => item.id,
      from: { opacity: 0 },
      leave: { opacity: 0 },
      enter: ({ x, y }) => ({ x, y, opacity: 1 }),
      update: ({ x, y }) => ({ x, y }),
    }
  );

  return width < 10 ? null : (
    <>
      <svg width={width} height={height}>
        <LinearGradient from="#ffffff" to="#e2e8f0" id="unsorted" />
        <LinearGradient from="#facc15" to="#f59e0b" id="active" />
        <LinearGradient from="#4ade80" to="#22c55e" id="sorted" />
        <rect width={width} height={height} className="fill-blue-700" rx={0} />
        <Group top={verticalMargin / 2}>
          {transitions((style, item, t, index) => {
            return (
              <animated.g
                style={{
                  ...style,
                }}
              >
                <rect
                  rx={3}
                  width={item.width}
                  height={item.height}
                  fill={
                    item.state == "unsorted"
                      ? "white"
                      : item.state == "sorted"
                      ? "green"
                      : "orange"
                  }
                />
                <text>{item.value}</text>
              </animated.g>
            );
          })}
        </Group>
      </svg>
      <div></div>
    </>
  );
};

export default BubbleSort;
