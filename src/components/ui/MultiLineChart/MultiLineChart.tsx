import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from 'recharts';
import styles from './MultiLineChart.module.scss';

export interface LineConfig {
  dataKey: string;
  name: string;
  color: string;
}

interface MultiLineChartProps {
  data: Record<string, string | number>[];
  lines: LineConfig[];
  xAxisKey: string;
  height?: number;
  yAxisDomain?: [number, number];
  yAxisTicks?: number[];
  yAxisFormatter?: (value: number) => string;
  tooltipFormatter?: (value: number, name: string) => string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
    dataKey: string;
  }>;
  label?: string;
  formatter?: (value: number, name: string) => string;
}

function CustomTooltip({ active, payload, label, formatter }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltip}>
        <span className={styles.tooltipLabel}>Date: {label}</span>
        {payload.map((item, index) => {
          const displayValue = formatter ? formatter(item.value, item.name) : item.value;
          return (
            <div key={index} className={styles.tooltipRow}>
              <span className={styles.tooltipDot} style={{ backgroundColor: item.color }} />
              <span className={styles.tooltipName}>{item.name}:</span>
              <span className={styles.tooltipValue}>{displayValue}</span>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
}

interface LegendPayloadItem {
  value: string;
  color: string;
}

interface CustomLegendProps {
  payload?: LegendPayloadItem[];
}

function CustomLegend({ payload }: CustomLegendProps) {
  return (
    <div className={styles.legend}>
      {payload?.map((entry, index) => (
        <div key={index} className={styles.legendItem}>
          <span className={styles.legendDot} style={{ backgroundColor: entry.color }} />
          <span>{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

export function MultiLineChart({
  data,
  lines,
  xAxisKey,
  height = 250,
  yAxisDomain,
  yAxisTicks,
  yAxisFormatter,
  tooltipFormatter,
}: MultiLineChartProps) {
  return (
    <div className={styles.container} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data} margin={{ top: 30, right: 30, left: 20, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis
            dataKey={xAxisKey}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            tickFormatter={yAxisFormatter}
            domain={yAxisDomain}
            ticks={yAxisTicks}
          />
          <Tooltip
            content={<CustomTooltip formatter={tooltipFormatter} />}
            cursor={{ stroke: '#e5e7eb', strokeDasharray: '3 3' }}
          />
          <Legend content={<CustomLegend />} verticalAlign="top" align="right" />
          {lines.map((line) => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              name={line.name}
              stroke={line.color}
              strokeWidth={2}
              dot={{ fill: line.color, strokeWidth: 0, r: 4 }}
              activeDot={{ fill: line.color, strokeWidth: 0, r: 6 }}
              animationDuration={800}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
