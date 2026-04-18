import { Dropdown } from '@/components/ui/Dropdown/Dropdown';
import { MenuProps, message } from 'antd';
import { useState } from 'react';
import styles from './DashboardPage.module.scss';
import Banner from '@/components/layout/Banner/Banner';
import { StatCard } from '../components/StatCard';
import {
  BiPhoneCall,
  BiTargetLock,
  BiRocket,
  BiUserCheck,
  BiCrown,
  BiTrendingDown,
  BiTrendingUp,
} from 'react-icons/bi';
import { BarChart } from '@/components/ui/BarChart/BarChart';
import { VscCalendar } from 'react-icons/vsc';
// import { InsightCard } from '../components/InsightCard';
import { Leaderboard } from '../components/Leaderboard';
import { Sparkline } from '@components/ui/SparkLine/Sparkline';
import { useMutation } from '@tanstack/react-query';
import { AnalyticsService } from '@/service/Analytics.service';
import { AnalyticsResponse, CampaignMetricsRequest } from '@/service/Types/Analytics';

// Mock Data for Phase 1
// const leaderboardData = [
//   {
//     id: '1',
//     campaign_name: 'Holiday Season Sale',
//     call_count: '24.8%',
//     conversion_rate: 95,
//     converted_calls: 80,
//   },
//   {
//     id: '2',
//     campaign_name: 'Real Estate Q1',
//     call_count: '18.2%',
//     conversion_rate: 70,
//     converted_calls: 70,
//   },
//   {
//     id: '3',
//     campaign_name: 'SaaS Outbound',
//     call_count: '15.4%',
//     conversion_rate: 60,
//     converted_calls: 60,
//   },
//   {
//     id: '4',
//     campaign_name: 'Health Checkup',
//     call_count: '12.1%',
//     conversion_rate: 45,
//     converted_calls: 50,
//   },
// ];

// const callVolumeData = [
//   { label: 'Mon', value: 450 },
//   { label: 'Tue', value: 520 },
//   { label: 'Wed', value: 610 },
//   { label: 'Thu', value: 580 },
//   { label: 'Fri', value: 690 },
//   { label: 'Sat', value: 320 },
//   { label: 'Sun', value: 280 },
// ];

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
  const analyticsService = AnalyticsService();
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);

  const getDateLabel = () =>
    dateOptions.find((o) => o.key === dateFilter)?.label || 'Today';

  const dateMenuItems: MenuProps['items'] = dateOptions.map((option) => ({
    key: option.key,
    label: option.label,
    onClick: () => setDateFilter(option.key),
  }));

  const requestMetric = useMutation({
  mutationFn: async (payload: CampaignMetricsRequest) => {
    return await analyticsService.requestMetrics(payload);
  },

  onSuccess: (data) => {
    message.success("Metrics Received");
    setAnalytics(data);
    console.log("Metrics Response:", data);
  },

  onError: () => {
    message.error("Metrics Failed to receive");
  },
});

const callVolumeData = analytics?.["Daily Call Volume"].map((item) => ({
  label: item.date,
  value: item.count,
}));

const bestPerformingCampaign = analytics?.["Best Performing Campaign"]?.[0]?.campaign_name; 

const worstPerformingCampaign = analytics?.["Worst Performing Campaign"]?.[0]?.campaign_name;



  return (
    <div className={styles.container}>
      <Banner>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Performance Analytics</h1>
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
            value="14,285"
            icon={<BiPhoneCall />}
            trend="up"
            trendValue="+12.5%"
            variant="primary"
            chart={<Sparkline data={callsSparkData} color="#3b82f6" />}
          />
          <StatCard
            title="Overall Conversion"
            value="18.3%"
            icon={<BiTargetLock />}
            trend="up"
            trendValue="+5.2%"
            variant="accent"
            chart={<Sparkline data={convSparkData} color="#ec4899" />}
          />
          <StatCard
            title="Active Campaigns"
            value="12"
            icon={<BiRocket />}
            variant="secondary"
            highlightText="4 launched this week"
          />
          <StatCard
            title="Total Leads Reached"
            value="8,492"
            icon={<BiUserCheck />}
            variant="warning"
            highlightText="64% of total database"
          />
        </div>

        {/* Campaign Insights Row */}
        <div className={styles.insightsRow}>
          {/* <InsightCard
            type="best"
            campaignName="Holiday Season Sale"
            description="Exceptional performance in the mid-west region with high engagement rates."
            metricLabel="Conversion Rate"
            metricValue="24.8%"
          /> */}
          <Leaderboard
            title="Best Performing Campaigns"
            items={bestPerformingCampaign}
            icon={BiTrendingUp}
          />
          {/* <InsightCard
            type="worst"
            campaignName="Outbound Cold Leads B"
            description="Lower than average connect rate. Consider refreshing the lead list or script."
            metricLabel="Connect Rate"
            metricValue="8.2%"
          /> */}
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
