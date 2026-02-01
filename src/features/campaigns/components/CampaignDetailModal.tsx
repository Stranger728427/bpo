import { Badge } from '@components/ui/Badge/Badge';
import { MultiLineChart, LineConfig } from '@components/ui/MultiLineChart/MultiLineChart';
import {
  MultiSegmentDonutChart,
  DonutSegment,
} from '@components/ui/MultiSegmentDonutChart/MultiSegmentDonutChart';
import styles from './CampaignDetailModal.module.scss';
import { HugeiconsCall02 } from '@/app/icons/CallLogs';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { StreamlineFlexDollarIncrease } from '@/app/icons/ConversionRateIcon';
import { IoTimeOutline } from 'react-icons/io5';
import { TbExternalLink } from 'react-icons/tb';

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  type: string;
  startDate: string;
  endDate: string;
  callsMade: number;
  conversionRate: number;
  spend: number;
}

interface CampaignDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: Campaign;
}

// Icons
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <path d="M15 9L9 15M9 9L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);


// Mock performance data for line chart
const performanceData = [
  { date: '4 Dec', calls: 50, conversion: 30 },
  { date: '5 Dec', calls: 80, conversion: 55 },
  { date: '6 Dec', calls: 180, conversion: 68 },
  { date: '7 Dec', calls: 150, conversion: 85 },
  { date: '8 Dec', calls: 200, conversion: 95 },
  { date: '9 Dec', calls: 230, conversion: 105 },
  { date: '10 Dec', calls: 210, conversion: 110 },
];

// Line configurations for the performance chart
const performanceLines: LineConfig[] = [
  { dataKey: 'calls', name: 'Calls', color: '#8b5cf6' },
  { dataKey: 'conversion', name: 'Conversion', color: '#6b7280' },
];

// Call outcomes data for donut chart
const outcomesData: DonutSegment[] = [
  { name: 'Connected', value: 42, color: '#8b5cf6' },
  { name: 'No Answer', value: 35, color: '#c4b5fd' },
  { name: 'Busy / Failed', value: 23, color: '#6b7280' },
];

const getStatusVariant = (status: Campaign['status']) => {
  switch (status) {
    case 'active':
      return 'success';
    case 'paused':
      return 'warning';
    case 'completed':
      return 'default';
    default:
      return 'default';
  }
};

const getStatusLabel = (status: Campaign['status']) => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

export function CampaignDetailModal({ isOpen, onClose, campaign }: CampaignDetailModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <span className={styles.breadcrumb}>Campaign / {campaign.name}</span>
            <h2 className={styles.title}>Campaign Details</h2>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Campaign Info Card */}
          <div className={styles.infoCard}>
            <div className={styles.infoMain}>
              <h3 className={styles.campaignName}>{campaign.name}</h3>
              <div className={styles.infoMeta}>
                <span>
                  Type: <strong>Lead generation</strong>
                </span>
                <span>
                  Contacts: <strong>2,842 contacts</strong>
                </span>
                <span>
                  AI prompt: <strong>AI Voice Script v3</strong>
                  <TbExternalLink size={20} />
                </span>
              </div>
              <div className={styles.infoDates}>Created Jan 5, 2025 • Last updated Jan 12, 2025</div>
            </div>
            <Badge variant={getStatusVariant(campaign.status)} className={styles.statusBadge}>
              {getStatusLabel(campaign.status)}
            </Badge>
          </div>

          {/* Stats Cards */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <span className={styles.statLabel}>Calls made</span>
                <div className={styles.statIcon}>
                  <HugeiconsCall02 />
                </div>
              </div>
              <div className={styles.statValue}>4,320</div>
              <div className={styles.statChange}>
                <span className={styles.positive}>↑ +12.4% vs last 7 days</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <span className={styles.statLabel}>Conversion rate</span>
                <div className={styles.statIcon}>
                  <StreamlineFlexDollarIncrease />
                </div>
              </div>
              <div className={styles.statValue}>18.5%</div>
              <div className={styles.statChange}>
                <span className={styles.positive}>↑ +12.4% vs last 7 days</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <span className={styles.statLabel}>Avg call duration</span>
                <div className={styles.statIcon}>
                  <IoTimeOutline size={24} />
                </div>
              </div>
              <div className={styles.statValue}>01:42</div>
              <div className={styles.statChange}>
                <span className={styles.positive}>↑ +12.4% vs last 7 days</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <span className={styles.statLabel}>Average cost</span>
                <div className={styles.statIcon}>
                  <AiOutlineDollarCircle size={24} />
                </div>
              </div>
              <div className={styles.statValue}>$ 92.00</div>
              <div className={styles.statChange}>
                <span className={styles.positive}>↑ +12.4% vs last 7 days</span>
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className={styles.chartsGrid}>
            {/* Performance Chart */}
            <div className={styles.chartCard}>
              <div className={styles.chartHeader}>
                <h4 className={styles.chartTitle}>Performance over time</h4>
              </div>
              <MultiLineChart
                data={performanceData}
                lines={performanceLines}
                xAxisKey="date"
                height={280}
                yAxisDomain={[0, 500]}
                yAxisTicks={[0, 100, 200, 300, 400, 500]}
              />
            </div>

            {/* Outcomes Chart */}
            <div className={styles.chartCard}>
              <div className={styles.chartHeader}>
                <h4 className={styles.chartTitle}>Call outcomes</h4>
              </div>
              <div className={styles.donutChartWrapper}>
                <MultiSegmentDonutChart
                  data={outcomesData}
                  size={220}
                  innerRadius={65}
                  outerRadius={90}
                  showLegend={true}
                  showPercentage={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
