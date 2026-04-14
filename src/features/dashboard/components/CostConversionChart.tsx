import { LineBarChart } from '@components/ui/LineBarChart/LineBarChart';
import styles from './CostConversionChart.module.scss';

interface DataPoint {
  campaign: string;
  cost: number;
  conversion: number;
}

interface CostConversionChartProps {
  data: DataPoint[];
}

export function CostConversionChart({ data }: CostConversionChartProps) {
  const chartData = data.map((d) => ({
    label: d.campaign,
    barValue: d.cost,
    lineValue: d.conversion,
  }));

 

//  const legendItems = [
//   { label: "Cost", type: "bar"},
//   { label: "Conversion", type: "line" },
// ];

  return (
    <div className={styles.container}>
     <div className={styles.header}>
  <h3 className={styles.title}>Cost vs Conversion</h3>

  {/* <div className={styles.legend}>
    {legendItems.map((item, i) => (
      <div key={i} className={styles.legendItem}>
        {item.type === 'bar' ? (
          <span
            className={styles.legendBar}
            
          />
        ) : (
          <span
            className={styles.legendLine}
         
          />
        )}
        <span>{item.label}</span>
      </div>
    ))}
  </div> */}
</div>

      <LineBarChart
        data={chartData}
        height={250}
        barLabel="Cost"
        lineLabel="Conversion"
        barValueFormatter={(value) => `$${value.toLocaleString()}`}
        lineValueFormatter={(value) => `${value}%`}
        leftAxisFormatter={(value) => `$${value / 1000}k`}
        rightAxisFormatter={(value) => `${value}%`}
        leftAxisDomain={[0, 25000]}
        rightAxisDomain={[0, 50]}
        leftAxisTicks={[0, 5000, 10000, 15000, 20000, 25000]}
        rightAxisTicks={[0, 10, 20, 30, 40, 50]}
      />
    </div>
  );
}



