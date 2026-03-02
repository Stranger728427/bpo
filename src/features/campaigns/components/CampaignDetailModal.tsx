import { Badge } from '@components/ui/Badge/Badge';
import { MultiLineChart } from '@components/ui/MultiLineChart/MultiLineChart';
import { MultiSegmentDonutChart } from '@components/ui/MultiSegmentDonutChart/MultiSegmentDonutChart';
import styles from './CampaignDetailModal.module.scss';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { IoTimeOutline } from 'react-icons/io5';
import { HugeiconsCall02 } from '@/components/icons/CallLogs.icons';
import { StreamlineFlexDollarIncrease } from '@/components/icons/ConversionRateIcon';
import { Campaigns } from '@/features/camp/component/campaign.type';
import { useCampaignById } from '@/features/camp/component/api/useCampaignById';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Modal } from '@/components/ui/Modal/Modal';
import { Statistic } from 'antd';

interface CampaignDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaignId: string;
}

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
    <Modal
      open={isOpen}
      onCancel={onClose}
      closeIcon={<CloseCircleOutlined size={24} />}
      footer={null}
      width={1100}
      title={
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <span className={styles.breadcrumb}>
              Campaign / {campaign?.name}
            </span>
            <h2 className={styles.title}>Campaign Details</h2>
          </div>
        </div>
      }
      centered
      className={styles.modal}
    >
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
                Contacts:
                <strong>
                  {campaign?.contacts_count?.toLocaleString()} contacts
                </strong>
              </span>

              <span>
                AI prompt:
                <strong>{campaign?.ai_assistant_name}</strong>
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

            <Statistic
              value={performance?.calls_made ?? 0}
              className={styles.statValue}
            />

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

            <Statistic
              value={performance?.conversion_rate ?? 0}
              suffix="%"
              valueStyle={{ fontSize: 28, fontWeight: 700 }}
              className={styles.statValue}
            />

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

            <Statistic
              value={performance?.avg_call_duration ?? '00:00'}
              valueStyle={{ fontSize: 28, fontWeight: 700 }}
              className={styles.statValue}
            />

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

            <Statistic
              value={performance?.average_cost ?? 0}
              prefix="$"
              precision={2}
              valueStyle={{ fontSize: 28, fontWeight: 700 }}
              className={styles.statValue}
            />

            <div className={styles.statChange}>
              {performance?.average_cost_change ?? 0}%
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className={styles.chartsGrid}>
          <div className={styles.chartCard}>
            <h4 className={styles.chartTitle}>Performance over time</h4>

            <MultiLineChart
              lines={campaign?.performance_over_time ?? []}
              data={performance?.performance_over_time ?? []}
              xAxisKey="date"
              height={280}
            />
          </div>

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
    </Modal>
  );
}
