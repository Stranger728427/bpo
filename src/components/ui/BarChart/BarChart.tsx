import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import styles from './BarChart.module.scss';

interface DataPoint {
  label: string;
  value: number;
}

interface BarChartProps {
  data: DataPoint[];
  height?: number;
  barColor?: string;
  highlightColor?: string;
  highlightIndex?: number;
  showLabels?: boolean;
  showYAxis?: boolean;
  maxBarSize?: number;
  tooltipFormatter?: (value: number, label: string) => string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: DataPoint }>;
  formatter?: (value: number, label: string) => string;
}

function CustomTooltip({ active, payload, formatter }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0];
    const displayValue = formatter
      ? formatter(data.value, data.payload.label)
      : data.value;
    return (
      <div className={styles.tooltip}>
        {data.payload.label && (
          <span className={styles.tooltipLabel}>{data.payload.label}</span>
        )}
        <span className={styles.tooltipValue}>{displayValue}</span>
      </div>
    );
  }
  return null;
}

export function BarChart({
  data,
  height = 80,
  barColor = '#d4b8ff',
  highlightColor = '#8b5cf6',
  highlightIndex,
  showLabels = true,
  showYAxis = false,
  maxBarSize = 20,
  tooltipFormatter,
}: BarChartProps) {
  return (
    <div className={styles.container}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart
          data={data}
          margin={{ top: 5, right: 5, left: 5, bottom: showLabels ? 5 : 0 }}
        >
          {showYAxis && <YAxis hide domain={[0, 'dataMax']} />}
          {showLabels && (
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#9ca3af' }}
              interval={0}
              dy={5}
            />
          )}
          <Tooltip
            content={<CustomTooltip formatter={tooltipFormatter} />}
            cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}
          />
          <Bar
            dataKey="value"
            radius={[3, 3, 0, 0]}
            maxBarSize={maxBarSize}
            animationDuration={800}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index === highlightIndex ? highlightColor : barColor}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
