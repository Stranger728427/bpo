import { Dropdown } from '@/components/ui/Dropdown/Dropdown';
import { MenuProps } from 'antd';
import { useState } from 'react';
import styles from './DashboardPage.module.scss';
import Banner from '@/components/layout/Banner/Banner';
import { StatCard } from '../components/StatCard';
import {
  BiPhoneCall,
  BiTargetLock,
  BiRocket,
  BiUserCheck,
  BiTrendingDown,
  BiTrendingUp,
} from 'react-icons/bi';
import { BarChart } from '@/components/ui/BarChart/BarChart';
import { VscCalendar } from 'react-icons/vsc';
import { Leaderboard } from '../components/Leaderboard';
import { Sparkline } from '@components/ui/SparkLine/Sparkline';

import { useAnalyticMetrics } from '@/components/Hooks/useAnalyticMetrics';

const callVolumeData = [
  { label: 'Mon', value: 450 },
  { label: 'Tue', value: 520 },
  { label: 'Wed', value: 610 },
  { label: 'Thu', value: 580 },
  { label: 'Fri', value: 690 },
  { label: 'Sat', value: 320 },
  { label: 'Sun', value: 280 },
];

const callsSparkData = [
  { value: 30 },
  { value: 40 },
  { value: 35 },
  { value: 50 },
  { value: 45 },
  { value: 60 },
  { value: 55 },
  { value: 70 },
];

const convSparkData = [
  { value: 12 },
  { value: 15 },
  { value: 14 },
  { value: 18 },
  { value: 17 },
  { value: 22 },
  { value: 20 },
  { value: 24 },
];

const dateOptions = [
  { key: 'today', label: 'Today' },
  { key: 'yesterday', label: 'Yesterday' },
  { key: 'last_7_days', label: 'Last 7 Days' },
  { key: 'last_30_days', label: 'Last 30 Days' },
  { key: 'all_time', label: 'All Time' },
];

const DashboardPage = () => {
  const [dateFilter, setDateFilter] = useState('last_7_days');
  const getDateLabel = () =>
    dateOptions.find((o) => o.key === dateFilter)?.label || 'Today';
  const {
    // callVolumeData,
    bestPerformingCampaign,
    worstPerformingCampaign,
    totalCallsMade,
    overAllConversion,
    totalActiveCampaign,
    totalLeadsReached,
  } = useAnalyticMetrics();

  const dateMenuItems: MenuProps['items'] = dateOptions.map((option) => ({
    key: option.key,
    label: option.label,
    onClick: () => setDateFilter(option.key),
  }));


  return (
    <div className={styles.container}>
      <Banner>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Dashboard</h1>
          </div>
          <Dropdown items={dateMenuItems} trigger={['click']}>
            <button className={styles.dateFilter}>
              <VscCalendar />
              {getDateLabel()}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M3 4.5L6 7.5L9 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </Dropdown>
        </div>
      </Banner>

      <div className={styles.content}>
        {/* Main Metrics Row */}
        <div className={styles.statsGrid}>
          <StatCard
            title="Total Calls Made"
            value={totalCallsMade}
            icon={<BiPhoneCall />}
            trend="up"
            trendValue="+12.5%"
            variant="primary"
            chart={<Sparkline data={callsSparkData} color="#3b82f6" />}
          />
          <StatCard
            title="Overall Conversion"
            value={overAllConversion}
            icon={<BiTargetLock />}
            trend="up"
            trendValue="+5.2%"
            variant="accent"
            chart={<Sparkline data={convSparkData} color="#ec4899" />}
          />
          <StatCard
            title="Active Campaigns"
            value={totalActiveCampaign}
            icon={<BiRocket />}
            variant="secondary"
            // highlightText="4 launched this week"
          />
          <StatCard
            title="Total Leads Reached"
            value={totalLeadsReached}
            icon={<BiUserCheck />}
            variant="warning"
            // highlightText="64% of total database"
          />
        </div>

        {/* Campaign Insights Row */}
        <div className={styles.insightsRow}>
          <Leaderboard
            title="Best Performing Campaigns"
            items={bestPerformingCampaign}
            icon={BiTrendingUp}
          />
          <Leaderboard
            title="Worst Performing Campaigns"
            items={worstPerformingCampaign}
            icon={BiTrendingDown}
            variant="worst"
          />
        </div>

        {/* Volume Charts Row */}
        <div className={styles.chartsGrid}>
          <div className={styles.chartWrapper}>
            <div className={styles.chartHeader}>
              <h3 className={styles.chartTitle}>Daily Call Volume</h3>
              <span className={styles.chartLegend}>
                Total outbound attempts per day
              </span>
            </div>
            <BarChart data={callVolumeData} height={300} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
