import { Badge } from '@components/ui/Badge/Badge';
import { MultiLineChart } from '@components/ui/MultiLineChart/MultiLineChart';
import { MultiSegmentDonutChart } from '@components/ui/MultiSegmentDonutChart/MultiSegmentDonutChart';
import styles from './CampaignDetailModal.module.scss';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { IoTimeOutline } from 'react-icons/io5';
import { HugeiconsCall02 } from '@/components/icons/CallLogs.icons';
import { StreamlineFlexDollarIncrease } from '@/components/icons/ConversionRateIcon';
import { useCampaignById } from '@/features/camp/component/services/api/useCampaignById';
import { Campaigns } from '@/features/camp/component/campaign.type';

interface CampaignDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaignId: string;
}

// Icons
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M15 9L9 15M9 9L15 15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const getStatusVariant = (status: Campaigns['status']) => {
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

const getStatusLabel = (status: Campaigns['status']) => {
  return status?.charAt(0).toUpperCase() + status?.slice(1);
};

export function CampaignDetailModal({
  isOpen,
  onClose,
  campaignId,
}: CampaignDetailModalProps) {
  if (!isOpen) return null;

  const { data } = useCampaignById(campaignId);
  const campaign = data?.campaign;
  const performance = campaign?.performance;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <span className={styles.breadcrumb}>
              Campaign / {campaign?.name}
            </span>
            <h2 className={styles.title}>Campaign Details</h2>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <div className={styles.content}>
          {/* Campaign Info Card */}
          <div className={styles.infoCard}>
            <div className={styles.infoMain}>
              <h3 className={styles.campaignName}>{campaign?.name}</h3>

              <div className={styles.infoMeta}>
                <span>
                  Type: <strong>{campaign?.type}</strong>
                </span>

                <span>
                  Contacts:{' '}
                  <strong>
                    {campaign?.contacts_count?.toLocaleString()} contacts
                  </strong>
                </span>

                <span>
                  AI prompt: <strong>{campaign?.ai_assistant_name}</strong>
                </span>
              </div>

              <div className={styles.infoDates}>
                Created: {campaign?.created_at}
              </div>
            </div>

            <Badge
              variant={getStatusVariant(campaign?.status)}
              className={styles.statusBadge}
            >
              {getStatusLabel(campaign?.status)}
            </Badge>
          </div>

          {/* Stats Cards */}
          <div className={styles.statsGrid}>
            {/* Calls Made */}
            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <span className={styles.statLabel}>Calls made</span>
                <HugeiconsCall02 />
              </div>

              <div className={styles.statValue}>
                {performance?.calls_made ?? 0}
              </div>

              <div className={styles.statChange}>
                {performance?.calls_made_change ?? 0}%
              </div>
            </div>

            {/* Conversion Rate */}
            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <span className={styles.statLabel}>Conversion rate</span>
                <StreamlineFlexDollarIncrease />
              </div>

              <div className={styles.statValue}>
                {performance?.conversion_rate ?? 0}%
              </div>

              <div className={styles.statChange}>
                {performance?.conversion_rate_change ?? 0}%
              </div>
            </div>

            {/* Avg Call Duration */}
            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <span className={styles.statLabel}>Avg call duration</span>
                <IoTimeOutline size={24} />
              </div>

              <div className={styles.statValue}>
                {performance?.avg_call_duration ?? '00:00'}
              </div>

              <div className={styles.statChange}>
                {performance?.avg_call_duration_change ?? 0}%
              </div>
            </div>

            {/* Average Cost */}
            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <span className={styles.statLabel}>Average cost</span>
                <AiOutlineDollarCircle size={24} />
              </div>

              <div className={styles.statValue}>
                ${performance?.average_cost ?? 0}
              </div>

              <div className={styles.statChange}>
                {performance?.average_cost_change ?? 0}%
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className={styles.chartsGrid}>
            {/* Performance Chart */}
            <div className={styles.chartCard}>
              <h4 className={styles.chartTitle}>Performance over time</h4>

              <MultiLineChart
                lines={campaign?.performance_over_time ?? []}
                data={performance?.performance_over_time ?? []}
                xAxisKey="date"
                height={280}
              />
            </div>

            {/* Call Outcomes Donut */}
            <div className={styles.chartCard}>
              <h4 className={styles.chartTitle}>Call outcomes</h4>

              <MultiSegmentDonutChart
                data={
                  campaign?.call_outcomes?.map((item: any) => ({
                    name: item.name,
                    value: item.value,
                    color: item.color,
                  })) ?? []
                }
                size={220}
                innerRadius={65}
                outerRadius={90}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
