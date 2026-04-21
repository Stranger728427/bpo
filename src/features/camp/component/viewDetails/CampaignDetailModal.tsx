import { Badge } from '@components/ui/Badge/Badge';
import styles from './CampaignDetailModal.module.scss';

import { useCampaignById } from '@/features/camp/component/api/useCampaignById';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Modal } from '@/components/ui/Modal/Modal';
import { Tag, Statistic } from 'antd';
import { HugeiconsCall02 } from '@/components/icons/CallLogs.icons';
import { StreamlineFlexDollarIncrease } from '@/components/icons/ConversionRateIcon';
import { IoTimeOutline } from 'react-icons/io5';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { useAnalyticMetrics } from '@/components/Hooks/useAnalyticMetrics';
import { DonutChart } from '@/components/ui/DonutChart/DonutChart';
import { useCampaign } from '../useCampaign';
import { formatWithMonthWord } from '@/utils/helpers/helper';

interface CampaignDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaignId: string | null;
}

const getStatusVariant = (status: string) => {
  switch (status?.toLowerCase()) {
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

const getStatusLabel = (status: string) => {
  if (!status) return 'N/A';
  return status.charAt(0).toUpperCase() + status.slice(1);
};

export function CampaignDetailModal({
  isOpen,
  onClose,
  campaignId,
}: CampaignDetailModalProps) {
  if (!isOpen) return null;

  const { data, isPending } = useCampaignById(campaignId!);
  const campaign = data?.campaign || data;

  const {
    callsMade,
    conversionRate,
    avgCallDuration,
    leadStatusDistribution,
    CallStatusBreakDown,
  } = useAnalyticMetrics(campaignId!);

  const { leadChart, callStatusChart, leadCenterValue, callCenterValue } =
    useCampaign(leadStatusDistribution, CallStatusBreakDown);

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      closeIcon={<CloseCircleOutlined size={24} />}
      footer={null}
      width={1000}
      destroyOnHidden
      title={
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <span className={styles.breadcrumb}>
              Campaign / {campaign?.name || 'Loading...'}
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
                Contacts: <strong>{campaign?.contacts_count}</strong>
              </span>
            </div>
            <span className={styles.infoMeta}>
              Calling Days:{' '}
              {campaign?.calling_days?.length
                ? campaign.calling_days.map((day: string) => (
                    <Tag color="blue" key={day}>
                      {day}
                    </Tag>
                  ))
                : 'None'}
            </span>
            <div className={styles.infoMeta}>
              <span>
                {`Created ${formatWithMonthWord(campaign?.start_date)} - Last Updated ${formatWithMonthWord(campaign?.end_date)}`}
              </span>
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
              <HugeiconsCall02 className={styles.statIcon} />
            </div>
            <Statistic
              value={callsMade ?? 0}
              className={styles.statValue}
              classNames={styles.statValue}
            />
          </div>

          {/* Conversion Rate */}
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <span className={styles.statLabel}>Conversion rate</span>
              <StreamlineFlexDollarIncrease className={styles.statIcon} />
            </div>
            <Statistic
              value={conversionRate ?? 0}
              suffix="%"
              className={styles.statValue}
            />

            <div className={styles.statChange}>{conversionRate ?? 0}%</div>
          </div>

          {/* Spend */}
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <span className={styles.statLabel}>Avg call duration</span>
              <IoTimeOutline className={styles.statIcon} />
            </div>

            <Statistic
              value={avgCallDuration ?? '00:00'}
              className={styles.statValue}
            />

            <div className={styles.statChange}>{avgCallDuration ?? 0}%</div>
          </div>

          {/* Average Cost */}
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <span className={styles.statLabel}>Average cost</span>
              <AiOutlineDollarCircle className={styles.statIcon} />
            </div>
            <Statistic
              value={campaign?.spend ?? 0}
              suffix=" credits"
              className={styles.statValue}
            />
          </div>
        </div>

        <div className={styles.chartSection}>
          {/* <h3 className={styles.sectionTitle}>Performance Breakdown</h3> */}

          <div className={styles.chartGrid}>
            {/* Lead Status */}
            <div className={styles.chartCard}>
              <h4>Lead Status</h4>
              <div className={styles.chartContent}>
                <DonutChart
                  data={leadChart}
                  centerLabel="Leads"
                  centerValue={leadCenterValue}
                />
                <div className={styles.legend}>
                  {leadChart?.map((item) => (
                    <div key={item?.name} className={styles.legendItem}>
                      <span
                        className={styles.colorDot}
                        style={{ backgroundColor: item.fill }}
                      />
                      {item?.name}
                      <strong>{item.value}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Call Status */}
            <div className={styles.chartCard}>
              <h4>Call Status</h4>
              <div className={styles.chartContent}>
                <DonutChart
                  data={callStatusChart || []}
                  centerLabel="Calls"
                  centerValue={callCenterValue}
                />
                <div className={styles.legend}>
                  {callStatusChart?.map((item) => (
                    <div key={item?.name} className={styles.legendItem}>
                      <span
                        className={styles.colorDot}
                        style={{ backgroundColor: item.fill }}
                      />
                      {item?.name}
                      <strong>{item?.value}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
