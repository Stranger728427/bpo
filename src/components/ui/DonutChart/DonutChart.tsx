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
        <span className={styles.tooltipValue}>{payload[0].value}</span>
        <span className={styles.tooltipName}>{payload[0].name}</span>
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
  size = 200,
  strokeWidth = 10,
  primaryColor = '#8b5cf6',
  secondaryColor = '#f3f4f6',
}: DonutChartProps) {
  const remaining = total - value;
  const data = [
    { name: 'Used', value: value, fill: primaryColor },
    {
      name: 'Remaining',
      value: remaining > 0 ? remaining : 0,
      fill: secondaryColor,
    },
  ];

  const padding = 20;
  const availableSize = size - padding * 2;
  const innerRadius = (availableSize - strokeWidth * 2) / 2;
  const outerRadius = availableSize / 2;

  return (
    <div className={styles.container}>
      <div
        className={styles.chartWrapper}
        style={{ width: size, height: size }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart
            margin={{
              top: padding,
              right: padding,
              bottom: padding,
              left: padding,
            }}
          >
            <Tooltip
              content={<CustomTooltip />}
              wrapperStyle={{ outline: 'none', zIndex: 100 }}
              offset={20}
            />
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
              animationDuration={1200}
              animationEasing="ease-out"
            >
              {data.map((entry, index) => (
                <Pie
                  key={`cell-${index}`}
                  fill={entry.fill}
                  className={styles.segment}
                />
              ))}
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
