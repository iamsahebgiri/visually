import React, { useMemo } from "react";
import { AxisBottom } from "@visx/axis";
import { Group } from "@visx/group";
import { LinearGradient } from "@visx/gradient";
import letterFrequency, {
  LetterFrequency,
} from "@visx/mock-data/lib/mocks/letterFrequency";
import { scaleBand, scaleLinear } from "@visx/scale";
import { motion } from "framer-motion";

const data = letterFrequency.filter((d) => d.frequency > 0.02);
const verticalMargin = 120;

// accessors
const getLetter = (d: LetterFrequency) => d.letter;
const getLetterFrequency = (d: LetterFrequency) => Number(d.frequency) * 1000;

interface BarsProps {
  width: number;
  height: number;
  events?: boolean;
}

const BubbleSort = ({ width, height, events = false }: BarsProps) => {
  // bounds
  const xMax = width;
  const yMax = height - verticalMargin;

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: data.map(getLetter),
        padding: 0.4,
      }),
    [xMax]
  );
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data.map(getLetterFrequency))],
      }),
    [yMax]
  );

  return width < 10 ? null : (
    <>
      <svg width={width} height={height}>
        <LinearGradient from="#ffffff" to="#e2e8f0" id="unsorted" />
        <LinearGradient from="#facc15" to="#f59e0b" id="current" />
        <LinearGradient from="#4ade80" to="#22c55e" id="sorted" />
        <rect width={width} height={height} className="fill-blue-700" rx={0} />
        <Group top={verticalMargin / 2}>
          {data.map((d) => {
            const letter = getLetter(d);
            const barWidth = xScale.bandwidth();
            const barHeight = yMax - (yScale(getLetterFrequency(d)) ?? 0);
            const barX = xScale(letter);
            const barY = yMax - barHeight;

            return (
              <motion.rect
                animate={{
                  x: [0, 100, 0],
                }}
                key={`bar-${letter}`}
                x={barX}
                y={barY}
                rx={barWidth * 0.15}
                width={barWidth}
                height={barHeight}
                fill="url(#unsorted)"
              />
            );
          })}
        </Group>
        <AxisBottom
          scale={xScale}
          top={yMax + 60}
          tickValues={xScale.domain()}
          hideAxisLine
          hideTicks
        />
      </svg>
    </>
  );
};

export default BubbleSort;
