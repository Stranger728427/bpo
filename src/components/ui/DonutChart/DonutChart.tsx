import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import styles from './DonutChart.module.scss';

interface DonutChartProps {
  value: number;
  total: number;
  centerLabel?: string;
  centerValue?: string | number;
  size?: number;
  strokeWidth?: number;
  primaryColor?: string;
  secondaryColor?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltip}>
        <span className={styles.tooltipName}>{payload[0].name}</span>
        <span className={styles.tooltipValue}>{payload[0].value}</span>
      </div>
    );
  }
  return null;
}

export function DonutChart({
  value,
  total,
  centerLabel = 'Today',
  centerValue,
  size = 120,
  strokeWidth = 12,
  primaryColor = '#8b5cf6',
  secondaryColor = '#e9d5ff',
}: DonutChartProps) {
  const remaining = total - value;
  const data = [
    { name: 'Used', value: value },
    { name: 'Remaining', value: remaining > 0 ? remaining : 0 },
  ];

  // Add padding to prevent clipping
  const padding = 4;
  const availableSize = size - padding * 2;
  const innerRadius = (availableSize - strokeWidth) / 2;
  const outerRadius = availableSize / 2;

  return (
    <div className={styles.container}>
      <div className={styles.chartWrapper} style={{ width: size, height: size }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: padding, right: padding, bottom: padding, left: padding }}>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              startAngle={90}
              endAngle={-270}
              paddingAngle={0}
              dataKey="value"
              animationBegin={0}
              animationDuration={800}
            >
              <Cell fill={primaryColor} className={styles.segment} />
              <Cell fill={secondaryColor} className={styles.segment} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className={styles.centerContent}>
          <span className={styles.centerValue}>{centerValue ?? value}</span>
          <span className={styles.centerLabel}>{centerLabel}</span>
        </div>
      </div>
    </div>
  );
}
