import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
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
  height = 200,
  barColor = '#d4b8ff',
  highlightColor = '#8b5cf6',
  highlightIndex,
  showLabels = true,
  showYAxis = false,
  maxBarSize = 32,
  tooltipFormatter,
}: BarChartProps) {
  return (
    <div className={styles.container}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: showLabels ? 20 : 0 }}
        >
          <CartesianGrid
            vertical={false}
            strokeDasharray="3 3"
            stroke="rgba(0,0,0,0.05)  "
          />
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#9ca3af', fontWeight: 500 }}
            interval={0}
            dy={10}
            hide={!showLabels}
          />
          {showYAxis && (
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#9ca3af' }}
            />
          )}
          <Tooltip
            content={<CustomTooltip formatter={tooltipFormatter} />}
            cursor={{ fill: 'rgba(139, 92, 246, 0.05)', radius: 4 }}
            contentStyle={{ border: 'none', backgroundColor: 'transparent' }}
          />
          <Bar
            dataKey="value"
            radius={[6, 6, 0, 0]}
            maxBarSize={maxBarSize}
            animationDuration={1500}
            animationEasing="ease-in-out"
          >
            {data?.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index === highlightIndex ? highlightColor : barColor}
                style={{
                  transition: 'fill 0.3s ease',
                  cursor: 'pointer',
                }}
              />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
