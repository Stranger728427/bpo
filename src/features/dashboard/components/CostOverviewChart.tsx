import { BarChart } from '@components/ui/BarChart/BarChart';
import styles from './CostOverviewChart.module.scss';

interface DataPoint {
  date: string;
  cost: number;
}

interface CostOverviewChartProps {
  data: DataPoint[];
  totalCost: number;
}

export function CostOverviewChart({ data, totalCost }: CostOverviewChartProps) {
  const maxCostIndex = data.reduce(
    (maxIdx, item, idx, arr) => (item.cost > arr[maxIdx].cost ? idx : maxIdx),
    0
  );

  const chartData = data.map((d) => ({
    label: d.date,
    value: d.cost,
  }));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h3 className={styles.title}>Cost Overview</h3>
          <p className={styles.subtitle}>
            Displaying total costs incurred over the selected time
          </p>
        </div>
        <div className={styles.totalCost}>${totalCost.toFixed(2)}</div>
      </div>

      <div className={styles.chartArea}>
        <BarChart
          data={chartData}
          height={220}
          highlightIndex={maxCostIndex}
          maxBarSize={48}
          tooltipFormatter={(value) => `$${value.toFixed(2)}`}
        />
      </div>
    </div>
  );
}
