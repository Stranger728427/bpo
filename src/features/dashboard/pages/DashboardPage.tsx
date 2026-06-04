import { Dropdown } from '@/components/ui/Dropdown/Dropdown';
import { MenuProps } from 'antd';
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
import {
  callsSparkData,
  convSparkData,
  dateOptions,
} from '../constants/constant';
import { COLORS } from '@/components/constants/Constant';

const DashboardPage = () => {
  const getDateLabel = () =>
    dateOptions.find((o) => o.key === dateFilter)?.label || 'Today';

  const {
    callVolumeData,
    bestPerformingCampaign,
    worstPerformingCampaign,
    totalCallsMade,
    overAllConversion,
    totalActiveCampaign,
    totalLeadsReached,
    dateFilter,
    setDateFilter,
  } = useAnalyticMetrics();

  const dateMenuItems: MenuProps['items'] = dateOptions.map((option) => ({
    key: option.key,
    label: option.label,
    onClick: () => setDateFilter(option.key),
  }));

  const totalCallsMadeTrend = totalCallsMade?.is_increase ? 'up' : 'down';
  const overAllConversionTrend = overAllConversion?.is_increase ? 'up' : 'down';

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
            value={totalCallsMade?.main_value ?? 0}
            icon={<BiPhoneCall />}
            trend={totalCallsMadeTrend}
            trendValue={totalCallsMade?.trend_percentage}
            variant="primary"
            highlightText={totalCallsMade?.sub_text}
            chart={<Sparkline data={callsSparkData} color={COLORS.primary} />}
          />

          <StatCard
            title="Overall Conversion Rate"
            value={overAllConversion?.main_value ?? 0}
            icon={<BiTargetLock />}
            trend={overAllConversionTrend}
            trendValue={overAllConversion?.trend_value}
            variant="accent"
            highlightText={overAllConversion?.sub_text}
            chart={<Sparkline data={convSparkData} color={COLORS.accent} />}
          />
          <StatCard
            title="Active Campaigns"
            value={totalActiveCampaign?.main_value ?? 0}
            icon={<BiRocket />}
            variant="secondary"
            highlightText={totalActiveCampaign?.sub_text}
          />
          <StatCard
            title="Total Leads Reached"
            value={totalLeadsReached}
            icon={<BiUserCheck />}
            variant="warning"
            highlightText="Total unique leads"
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
