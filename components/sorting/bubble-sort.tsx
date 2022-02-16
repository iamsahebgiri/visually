/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { Group } from "@visx/group";
import { LinearGradient } from "@visx/gradient";
import { Text } from "@visx/text";
import { scaleBand, scaleLinear } from "@visx/scale";
import { useTransition, animated } from "@react-spring/web";
import clamp from "utils/clamp";

const verticalMargin = 184;

const BubbleSort = ({ width, height, data }) => {

  // bounds
  const xMax = width;
  const yMax = height - verticalMargin;


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
      <div className="absolute z-40 top-0 p-3">
        <div className="p-2 flex items-center">
          <div className="px-2 text-white">
            <span className="font-bold">Inversion</span>
            <span className="ml-2">{data[0].inversion}</span>
          </div>
        </div>
      </div>
      <svg width={width} height={height}>
        <LinearGradient from="#ffffff" to="#e2e8f0" id="unsorted" />
        <LinearGradient from="#facc15" to="#f59e0b" id="active" />
        <LinearGradient from="#4ade80" to="#22c55e" id="sorted" />
        <rect width={width} height={height} className="fill-blue-700" rx={0} />
        <Group top={verticalMargin / 3}>
          {transitions(({ ...style }, item) => {
            return (
              <animated.g
                style={{
                  ...style,
                }}
              >
                <animated.rect
                  rx={clamp(0.15 * item.width, 1, 6)}
                  width={item.width}
                  height={item.height}
                  fill={`url(#${item.state})`}
                />
                <Text
                  x={item.width / 2}
                  y={item.height + 10}
                  width={item.width}
                  fill="white"
                  fontSize={clamp(0.9 * item.width, 8, 16)}
                  verticalAnchor="start"
                  textAnchor="middle"
                >
                  {item.value}
                </Text>
              </animated.g>
            );
          })}
        </Group>
      </svg>
    </>
  );
};

export default BubbleSort;
