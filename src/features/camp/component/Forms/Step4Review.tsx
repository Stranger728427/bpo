import { MdOutlineCampaign } from 'react-icons/md';
import styles from './CreateCampaignForm.module.scss';
import { CreateCampaignRequest } from '../campaign.type';
import { Badge } from 'antd';

interface Props {
  formData: CreateCampaignRequest;
}

export function Step4Review({ formData }: Props) {
  return (
    <div className={styles.stepContent}>
      {' '}
      <div className={styles.stepContent}>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <MdOutlineCampaign size={24} />
            </div>
            <div>
              <h3 className={styles.sectionTitle}>Campaign Summary</h3>
              <p className={styles.sectionSubtitle}>
                Review the detail summary of campaign you are creating
              </p>
            </div>
          </div>

          <div className={styles.summaryGrid}>
            <Badge.Ribbon
              className={styles.summaryNumber}
              text="1"
              placement="start"
            >
              <div className={styles.summaryCard}>
                <div className={styles.summaryContent}>
                  <h4 className={styles.summaryTitle}>Campaign Details</h4>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Name:</span>
                    <span className={styles.summaryValue}>
                      {formData.name || '-'}
                    </span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Date:</span>
                    <span className={styles.summaryValue}>
                      {[formData?.start_date, formData?.end_date].join('-') ||
                        '-'}
                    </span>
                  </div>
                  {/* <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Leads:</span>
                    <span className={styles.summaryValue}>
                      {formData?.contacts_count ?? '-'} Leads
                    </span>
                  </div> */}
                </div>  
              </div>
            </Badge.Ribbon>
            <Badge.Ribbon
              className={styles.summaryNumber}
              text="2"
              placement="start"
            >
              <div className={styles.summaryCard}>
                <div className={styles.summaryContent}>
                  <h4 className={styles.summaryTitle}>Schedule</h4>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Calling Days:</span>
                    <span className={styles.summaryValue}>
                      {formData?.calling_days?.join(', ') || '-'}
                    </span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Calling Hours:</span>
                    <span className={styles.summaryValue}>
                      {[formData?.start_time, formData?.end_time].join(' - ') ||
                        '-'}
                    </span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Time Zone:</span>
                    <span className={styles.summaryValue}>
                      {formData.time_zone || '-'}
                    </span>
                  </div>
                </div>
              </div>
            </Badge.Ribbon>
            {/* <Badge.Ribbon
              className={styles.summaryNumber}
              text="3"
              placement="start"
            >
              <div className={styles.summaryCard}>
                <div className={styles.summaryContent}>
                  <h4 className={styles.summaryTitle}>Resources</h4>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>AI Assistant:</span>
                    <span className={styles.summaryValue}>
                      {formData?.ai_assistant_name || '-'}
                    </span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Phone Number:</span>
                    <span className={styles.summaryValue}>
                      {formData?.phone_number || '-'}
                    </span>
                  </div>
                </div>
              </div>
            </Badge.Ribbon> */}
            {/* <Badge.Ribbon
              className={styles.summaryNumber}
              text="4"
              placement="start"
            >
              <div className={styles.summaryCard}>
                <div className={styles.summaryContent}>
                  <h4 className={styles.summaryTitle}>Retry Settings</h4>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Attempts:</span>
                    <span className={styles.summaryValue}>
                      {formData?.retry_attempts || '-'}
                    </span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Interval:</span>
                    <span className={styles.summaryValue}>
                      {formData?.retry_interval || '-'}
                    </span>
                  </div>
                </div>
              </div>
            </Badge.Ribbon> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step4Review;
