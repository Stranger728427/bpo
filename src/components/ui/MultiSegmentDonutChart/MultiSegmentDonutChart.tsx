import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  // Sector,
} from 'recharts';
import { useState, useCallback } from 'react';
import styles from './MultiSegmentDonutChart.module.scss';

export interface DonutSegment {
  name: string;
  value: number;
  color: string;
}

interface MultiSegmentDonutChartProps {
  data: DonutSegment[];
  size?: number;
  innerRadius?: number;
  outerRadius?: number;
  showLegend?: boolean;
  showPercentage?: boolean;
  centerLabel?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: DonutSegment }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const item = payload[0];
    return (
      <div className={styles.tooltip}>
        <div className={styles.tooltipRow}>
          <span
            className={styles.tooltipDot}
            style={{ backgroundColor: item.payload.color }}
          />
          <span className={styles.tooltipName}>{item.name}</span>
          <span className={styles.tooltipValue}>{item.value}%</span>
        </div>
      </div>
    );
  }
  return null;
}

interface CustomLegendProps {
  payload?: Array<{ value: string; color: string }>;
}

function CustomLegend({ payload }: CustomLegendProps) {
  return (
    <div className={styles.legend}>
      {payload?.map((entry, index) => (
        <div key={index} className={styles.legendItem}>
          <span
            className={styles.legendDot}
            style={{ backgroundColor: entry.color }}
          />
          <span>{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

// interface ActiveShapeProps {
//   cx: number;
//   cy: number;
//   innerRadius: number;
//   outerRadius: number;
//   startAngle: number;
//   endAngle: number;
//   fill: string;
//   payload: DonutSegment;
//   percent: number;
// }

// function renderActiveShape(props: ActiveShapeProps) {
//   const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
//     props;

//   return (
//     <g>
//       <Sector
//         cx={cx}
//         cy={cy}
//         innerRadius={innerRadius - 2}
//         outerRadius={outerRadius + 4}
//         startAngle={startAngle}
//         endAngle={endAngle}
//         fill={fill}
//       />
//     </g>
//   );
// }

export function MultiSegmentDonutChart({
  data,
  size = 200,
  innerRadius = 60,
  outerRadius = 85,
  showLegend = true,
  showPercentage = true,
  centerLabel,
}: MultiSegmentDonutChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(0);

  const onPieEnter = useCallback((_: unknown, index: number) => {
    setActiveIndex(index);
  }, []);

  const onPieLeave = useCallback(() => {
    setActiveIndex(0);
  }, []);

  const activeSegment = activeIndex !== undefined ? data[activeIndex] : data[0];

  return (
    <div className={styles.container}>
      {showLegend && (
        <div className={styles.legendWrapper}>
          <CustomLegend
            payload={data.map((item) => ({
              value: item.name,
              color: item.color,
            }))}
          />
        </div>
      )}
      <div
        className={styles.chartWrapper}
        style={{ width: size, height: size }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              // activeIndex={activeIndex}
              // activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              startAngle={90}
              endAngle={-270}
              paddingAngle={2}
              dataKey="value"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              animationBegin={0}
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  className={styles.segment}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {showPercentage && activeSegment && (
          <div className={styles.centerContent}>
            <span className={styles.centerLabel}>
              {centerLabel || activeSegment.name} • {activeSegment.value}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
