import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import styles from './LineBarChart.module.scss';

interface DataPoint {
  label: string;
  barValue: number;
  lineValue: number;
}

interface LineBarChartProps {
  data: DataPoint[];
  height?: number;
  barColor?: string;
  lineColor?: string;
  barLabel?: string;
  lineLabel?: string;
  barValueFormatter?: (value: number) => string;
  lineValueFormatter?: (value: number) => string;
  leftAxisFormatter?: (value: number) => string;
  rightAxisFormatter?: (value: number) => string;
  leftAxisDomain?: [number, number];
  rightAxisDomain?: [number, number];
  leftAxisTicks?: number[];
  rightAxisTicks?: number[];
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
  barFormatter?: (value: number) => string;
  lineFormatter?: (value: number) => string;
}

function CustomTooltip({
  active,
  payload,
  label,
  barFormatter,
  lineFormatter,
}: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltip}>
        <span className={styles.tooltipLabel}>{label}</span>
        {payload.map((item, index) => {
          const formatter =
            item.dataKey === 'barValue' ? barFormatter : lineFormatter;
          const displayValue = formatter ? formatter(item.value) : item.value;
          return (
            <div key={index} className={styles.tooltipRow}>
              <span
                className={styles.tooltipDot}
                style={{ backgroundColor: item.color }}
              />
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
  dataKey: string;
}

interface CustomLegendProps {
  payload?: LegendPayloadItem[];
}

function CustomLegend({ payload }: CustomLegendProps) {
  return (
    <div className={styles.legend}>
      {payload?.map((entry, index) => (
        <div key={index} className={styles.legendItem}>
          {entry.dataKey === 'barValue' ? (
            <span
              className={styles.legendBar}
              style={{ backgroundColor: entry.color }}
            />
          ) : (
            <span
              className={styles.legendLine}
              style={{ backgroundColor: entry.color }}
            />
          )}
          <span>{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

export function LineBarChart({
  data,
  height = 250,
  barColor = '#d4b8ff',
  lineColor = '#8b5cf6',
  barLabel = 'Bar',
  lineLabel = 'Line',
  barValueFormatter,
  lineValueFormatter,
  leftAxisFormatter,
  rightAxisFormatter,
  leftAxisDomain,
  rightAxisDomain,
  leftAxisTicks,
  rightAxisTicks,
}: LineBarChartProps) {
  return (
    <div className={styles.container} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 30, right: 60, left: 60, bottom: 10 }}
        >
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
          />
          <YAxis
            yAxisId="left"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            tickFormatter={leftAxisFormatter}
            domain={leftAxisDomain}
            ticks={leftAxisTicks}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            tickFormatter={rightAxisFormatter}
            domain={rightAxisDomain}
            ticks={rightAxisTicks}
          />
          <Tooltip
            content={
              <CustomTooltip
                barFormatter={barValueFormatter}
                lineFormatter={lineValueFormatter}
              />
            }
            cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}
          />
          <Legend verticalAlign="top" align="right"  wrapperStyle={{ top: 0, right: 0, marginTop:0 }}  content={<CustomLegend />} />
          <Bar
            yAxisId="left"
            dataKey="barValue"
            name={barLabel} 
            fill={barColor}
            radius={[6, 6, 0, 0]}
            maxBarSize={40}
            animationDuration={800}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="lineValue"
            name={lineLabel}
            stroke={lineColor}
            strokeWidth={2}
            dot={{ fill: lineColor, strokeWidth: 2, r: 4 }}
            activeDot={{ fill: lineColor, strokeWidth: 0, r: 6 }}
            animationDuration={800}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
