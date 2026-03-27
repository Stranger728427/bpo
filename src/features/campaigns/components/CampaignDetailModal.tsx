import { Badge } from '@components/ui/Badge/Badge';
import styles from './CampaignDetailModal.module.scss';
import { HugeiconsCall02 } from '@/components/icons/CallLogs.icons';
import { StreamlineFlexDollarIncrease } from '@/components/icons/ConversionRateIcon';

import { useCampaignById } from '@/features/camp/component/api/useCampaignById';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Modal } from '@/components/ui/Modal/Modal';
import { Statistic, Descriptions, Card, Tag } from 'antd';
import { IoTimeOutline } from 'react-icons/io5';

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

  const { data } = useCampaignById(campaignId!);
  const campaign = data?.campaign || data;

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      closeIcon={<CloseCircleOutlined size={24} />}
      footer={null}
      width={1000}
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
          {/* Contacts Count */}
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <span className={styles.statLabel}>Contacts</span>
              <HugeiconsCall02 />
            </div>
            <Statistic
              value={campaign?.contacts_count ?? 0}
              className={styles.statValue}
            />
          </div>

          {/* Calls Made */}
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <span className={styles.statLabel}>Calls made</span>
              <HugeiconsCall02 />
            </div>
            <Statistic
              value={campaign?.calls_made ?? 0}
              className={styles.statValue}
            />
          </div>

          {/* Conversion Rate */}
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <span className={styles.statLabel}>Conversion rate</span>
              <StreamlineFlexDollarIncrease />
            </div>
            <Statistic
              value={campaign?.conversion_rate ?? 0}
              suffix="%"
              valueStyle={{ fontSize: 28, fontWeight: 700 }}
              className={styles.statValue}
            />

            {/* <div className={styles.statChange}>
              {performance?.conversion_rate_change ?? 0}%
            </div> */}
          </div>

          {/* Spend */}
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <span className={styles.statLabel}>Avg call duration</span>
              <IoTimeOutline size={24} />
            </div>

            {/* <Statistic
              value={performance?.avg_call_duration ?? '00:00'}
              valueStyle={{ fontSize: 28, fontWeight: 700 }}
              className={styles.statValue}
            /> */}

            {/* <div className={styles.statChange}>
              {performance?.avg_call_duration_change ?? 0}%
            </div> */}
          </div>

          {/* Average Cost */}
          {/* <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <span className={styles.statLabel}>Average cost</span>
              <AiOutlineDollarCircle size={24} />
            </div>
            <Statistic
              value={campaign?.spend ?? 0}
              suffix=" credits"
              valueStyle={{ fontSize: 24, fontWeight: 700 }}
              className={styles.statValue}
            />
          </div> */}
        </div>

        {/* Configuration Details */}
        <Card
          title="Scheduling & Configuration"
          bordered={false}
          style={{
            borderRadius: 12,
            border: '1px solid #f0f0f0',
            marginTop: 8,
          }}
        >
          <Descriptions
            column={{ xxl: 3, xl: 3, lg: 2, md: 2, sm: 1, xs: 1 }}
            labelStyle={{ color: '#8c8c8c' }}
          >
            <Descriptions.Item label="Start Date">
              {campaign?.start_date || 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="End Date">
              {campaign?.end_date || 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Time Zone">
              {campaign?.time_zone || 'N/A'}
            </Descriptions.Item>

            <Descriptions.Item label="Start Time">
              {campaign?.start_time || 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="End Time">
              {campaign?.end_time || 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Calling Days">
              {campaign?.calling_days?.length
                ? campaign.calling_days.map((day: string) => (
                    <Tag color="blue" key={day}>
                      {day}
                    </Tag>
                  ))
                : 'None'}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    </Modal>
  );
}
