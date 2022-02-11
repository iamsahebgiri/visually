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
    value: 45,
    state: "unsorted",
  },
  {
    id: "0tumlygjcpr",
    value: 79,
    state: "unsorted",
  },
  {
    id: "shka5lat2da",
    value: 20,
    state: "unsorted",
  },
  {
    id: "2isw8ofrxuu",
    value: 60,
    state: "unsorted",
  },
  {
    id: "djyrlt4gx07",
    value: 5,
    state: "unsorted",
  },
  {
    id: "iyqvb4j8c9a",
    value: 10,
    state: "unsorted",
  },
  {
    id: "5jwqeowt7nd",
    value: 11,
    state: "unsorted",
  },
  {
    id: "pigeejpjdlj",
    value: 20,
    state: "unsorted",
  },
  {
    id: "pc8hcpjcvi",
    value: 31,
    state: "unsorted",
  },
  {
    id: "1ktxa9m351u",
    value: 35,
    state: "unsorted",
  },
];

const BubbleSort = ({ width, height, events = false }: BarsProps) => {
  // bounds
  const xMax = width;
  const yMax = height - verticalMargin;

  const [data, setData] = useState(originalData);

  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: data.map((d) => d.id),
        padding: 0.4,
      }),
    [xMax]
  );
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data.map((d) => d.value))],
      }),
    [yMax]
  );

  useEffect(() => {
    const trace = getBubbleSortTrace(originalData);

    console.log(trace);

    let i = 0;
    const t = setInterval(() => {
      if (i !== trace.length) {
        setData(trace[i++]);
      } else {
        clearInterval(t);
      }
    }, 1000);

    return () => clearInterval(t);
  }, []);

  const transitions = useTransition(
    data?.map((d, i) => ({
      ...d,
      x: xScale(originalData[i].id),
      y: yScale(d.value) ?? 0,
      w: xScale.bandwidth(),
      h: yMax - (yScale(d.value) ?? 0),
      state: d.state,
    })),
    {
      key: (item: any) => item.id,
      from: { opacity: 1 },
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
                  width={item.w}
                  height={item.h}
                  fill={
                    item.state == "unsorted"
                      ? "white"
                      : item.state == "sorted"
                      ? "green"
                      : "orange"
                  }
                />
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
