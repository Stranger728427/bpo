import { MdOutlineCampaign } from 'react-icons/md';
import styles from './CreateCampaignForm.module.scss';
import { Badge } from 'antd';
import { useFormContext } from 'react-hook-form';
import { CreateCampaignRequest } from '../campaign.type';
import useDateUtils from '@/components/Hooks/useDateUtils';
import { DATE_FORMAT } from '@/components/constants/Constant';

function Step4Review() {
  const { watch } = useFormContext<CreateCampaignRequest>();
  const {getLocal} = useDateUtils();

  const {
    name,
    start_date,
    end_date,
    type,
    calling_days = [],
    start_time,
    end_time,
    time_zone,
  } = watch();

  const startDate = getLocal(start_date).format(DATE_FORMAT.USA_DATE)
  const endDate = getLocal(end_date).format(DATE_FORMAT.USA_DATE)


  return (
    <div className={styles.stepContent}>
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <MdOutlineCampaign size={24} />
          </div>
          <div>
            <h3 className={styles.sectionTitle}>Campaign Summary</h3>
            <p className={styles.sectionSubtitle}>
              Review the detail summary of the campaign you are creating
            </p>
          </div>
        </div>

        <div className={styles.summaryGrid}>
          <Badge.Ribbon className={styles.summaryNumber} text="1" placement="start">
            <div className={styles.summaryCard}>
              <div className={styles.summaryContent}>
                <h4 className={styles.summaryTitle}>Campaign Details</h4>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Name:</span>
                  <span className={styles.summaryValue}>{name || '-'}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Date:</span>
                  <span className={styles.summaryValue}>
                    {[startDate, endDate].filter(Boolean).join(' - ') || '-'}
                  </span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Type:</span>
                  <span className={styles.summaryValue}>{type || '-'}</span>
                </div>
              </div>
            </div>
          </Badge.Ribbon>

          <Badge.Ribbon className={styles.summaryNumber} text="2" placement="start">
            <div className={styles.summaryCard}>
              <div className={styles.summaryContent}>
                <h4 className={styles.summaryTitle}>Schedule</h4>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Calling Days:</span>
                  <span className={styles.summaryValue}>
                    {calling_days?.length ? calling_days.join(', ') : '-'}
                  </span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Calling Hours:</span>
                  <span className={styles.summaryValue}>
                    {[start_time, end_time].filter(Boolean).join(' - ') || '-'}
                  </span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Time Zone:</span>
                  <span className={styles.summaryValue}>{time_zone || '-'}</span>
                </div>
              </div>
            </div>
          </Badge.Ribbon>
        </div>
      </div>
    </div>
  );
}

export default Step4Review;
