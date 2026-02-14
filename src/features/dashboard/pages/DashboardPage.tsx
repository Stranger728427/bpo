import { useState } from 'react';
import { Dropdown } from '@components/ui/Dropdown/Dropdown';
import { BarChart } from '@components/ui/BarChart/BarChart';
import { DonutChart } from '@components/ui/DonutChart/DonutChart';
import type { MenuProps } from 'antd';
import styles from './DashboardPage.module.scss';
import { StatCard } from '../components/StatCard';
import { CostOverviewChart } from '../components/CostOverviewChart';
import { CostConversionChart } from '../components/CostConversionChart';
import Banner from '@/components/layout/Banner/Banner';

// Icons for stat cards
const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 13.5V16C17 16.5523 16.5523 17 16 17C8.26801 17 2 10.732 2 3C2 2.44772 2.44772 2 3 2H5.5C5.77614 2 6 2.22386 6 2.5C6 3.88071 6.25 5.20855 6.71 6.44L4.78 8.37C5.91 10.57 7.43 12.09 9.63 13.22L11.56 11.29C12.7914 11.75 14.1193 12 15.5 12C15.7761 12 16 12.2239 16 12.5V13.5H17Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PercentIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="14" cy="14" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="16" y1="4" x2="4" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const CreditIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2 8H18" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="14" cy="12" r="2" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

// Sample data for charts
const callsChartData = [
  { label: '6a', value: 18 },
  { label: '', value: 22 },
  { label: '', value: 20 },
  { label: '9a', value: 28 },
  { label: '', value: 32 },
  { label: '', value: 30 },
  { label: '12p', value: 65 },
  { label: '', value: 42 },
  { label: '3p', value: 35 },
  { label: '', value: 28 },
  { label: '6p', value: 22 },
];

const conversionChartData = [
  { label: '6a', value: 12 },
  { label: '', value: 15 },
  { label: '', value: 14 },
  { label: '9a', value: 20 },
  { label: '', value: 18 },
  { label: '', value: 25 },
  { label: '12p', value: 54 },
  { label: '', value: 32 },
  { label: '3p', value: 28 },
  { label: '', value: 20 },
  { label: '6p', value: 15 },
];

const costOverviewData = [
  { date: '5 Dec', cost: 5.20 },
  { date: '6 Dec', cost: 8.50 },
  { date: '7 Dec', cost: 10.30 },
  { date: '8 Dec', cost: 12.78 },
  { date: '9 Dec', cost: 7.40 },
  { date: '10 Dec', cost: 6.80 },
  { date: '11 Dec', cost: 3.82 },
];

const costConversionData = [
  { campaign: 'Campaign 1', cost: 5000, conversion: 10 },
  { campaign: 'Campaign 2', cost: 18000, conversion: 28 },
  { campaign: 'Campaign 3', cost: 8000, conversion: 24 },
  { campaign: 'Campaign 4', cost: 6000, conversion: 42 },
];

// Filter options
const dateOptions = [
  { key: 'today', label: 'Today' },
  { key: 'yesterday', label: 'Yesterday' },
  { key: 'last_7_days', label: 'Last 7 Days' },
  { key: 'last_30_days', label: 'Last 30 Days' },
  { key: 'all_time', label: 'All Time' },
];

 function DashboardPage() {
  const [dateFilter, setDateFilter] = useState('today');

  const getDateLabel = () => dateOptions.find((o) => o.key === dateFilter)?.label || 'Today';

  const dateMenuItems: MenuProps['items'] = dateOptions.map((option) => ({
    key: option.key,
    label: option.label,
    onClick: () => setDateFilter(option.key),
  }));

  return (
    <div className={styles.container}>
      {/* Header */}
      <Banner>
        <div className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
        <Dropdown items={dateMenuItems} trigger={['click']}>
          <button className={styles.dateFilter}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="3" width="12" height="11" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M2 6H14" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M5 1V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M11 1V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            {getDateLabel()}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </Dropdown>
      </div>
      </Banner>

      <div className={styles.content}>
      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <StatCard
          title="Calls Today"
          value="1,248"
          icon={<PhoneIcon />}
          highlightText="51 Calls • 23 Credits"
          chart={
            <BarChart
              data={callsChartData}
              highlightIndex={6}
              height={80}
            />
          }
        />

        <StatCard
          title="Conversion Rate"
          value="18.3%"
          icon={<PercentIcon />}
          highlightText="54%"
          chart={
            <BarChart
              data={conversionChartData}
              highlightIndex={6}
              height={80}
            />
          }
        />

        <div className={styles.creditsCard}>
          <div className={styles.creditsHeader}>
            <span className={styles.creditsTitle}>Credits Left</span>
            <div className={styles.creditsIcon}>
              <CreditIcon />
            </div>
          </div>
          <div className={styles.creditsContent}>
            <span className={styles.creditsValue}>12,430</span>
            <div className={styles.donutWrapper}>
              <DonutChart
                value={112}
                total={500}
                centerValue={112}
                centerLabel="Today"
                size={110}
                strokeWidth={12}
              />
              <div className={styles.donutInfo}>23 Credits • Campaign 1</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className={styles.chartsGrid}>
        <CostOverviewChart
          data={costOverviewData}
          totalCost={54.78}
        />

        <CostConversionChart
          data={costConversionData}
        />
      </div>
      </div>
    </div>
  );
}

export default DashboardPage
