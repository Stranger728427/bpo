import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import styles from './DonutChart.module.scss';

interface DataItem {
  name: string;
  value: number;
  fill: string;
}

interface DonutChartProps {
  data: DataItem[];
  centerLabel?: string;
  centerValue?: string | number;
  size?: number;
  strokeWidth?: number;
}

function CustomTooltip({ active, payload }: any) {
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
  data,
  centerLabel = 'Total',
  centerValue,
  size = 200,
  strokeWidth = 20,
}: DonutChartProps) {
  const total = data?.reduce((sum, item) => sum + item.value, 0);

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
          <span className={styles.centerValue}>
            {centerValue ?? total}
          </span>
          <span className={styles.centerLabel}>{centerLabel}</span>
        </div>
      </div>
    </div>
  );
}