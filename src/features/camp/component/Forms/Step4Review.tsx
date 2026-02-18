import { MdOutlineSummarize } from 'react-icons/md';
import styles from './CreateCampaignForm.module.scss';
import { CreateCampaignRequest } from '../campaign.type';

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
              <MdOutlineSummarize />
            </div>
            <div>
              <h3 className={styles.sectionTitle}>Campaign Summary</h3>
              <p className={styles.sectionSubtitle}>
                Review the detail summary of campaign you are creating
              </p>
            </div>
          </div>

          <div className={styles.summaryGrid}>
            <div className={styles.summaryCard}>
              <div className={styles.summaryNumber}>1</div>
              <div className={styles.summaryContent}>
                <h4 className={styles.summaryTitle}>Campaign Details</h4>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Name:</span>
                  <span className={styles.summaryValue}>
                    {formData.name || 'Test Campaign'}
                  </span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Date:</span>
                  <span className={styles.summaryValue}>
                    {formData?.start_date || '08/06/2025'} -{' '}
                    {formData?.end_date || '08/06/2026'}
                  </span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Leads:</span>
                  <span className={styles.summaryValue}>
                    {formData?.contacts_count || 145} Leads
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.summaryCard}>
              <div className={styles.summaryNumber}>2</div>
              <div className={styles.summaryContent}>
                <h4 className={styles.summaryTitle}>Schedule</h4>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Calling Days:</span>
                  <span className={styles.summaryValue}>
                    {formData?.calling_days?.join(', ')}
                  </span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Calling Hours:</span>
                  <span className={styles.summaryValue}>
                    {formData?.start_time || '09:00'}-
                    {formData?.end_time || '17:00'}
                  </span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Time Zone:</span>
                  <span className={styles.summaryValue}>
                    {formData.time_zone}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.summaryCard}>
              <div className={styles.summaryNumber}>3</div>
              <div className={styles.summaryContent}>
                <h4 className={styles.summaryTitle}>Resources</h4>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>AI Assistant:</span>
                  <span className={styles.summaryValue}>
                    {formData?.ai_assistant_name || 'Act Assistant (Copy)'}
                  </span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Phone Number:</span>
                  <span className={styles.summaryValue}>
                    {formData?.phone_number || '+19723705282'}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.summaryCard}>
              <div className={styles.summaryNumber}>4</div>
              <div className={styles.summaryContent}>
                <h4 className={styles.summaryTitle}>Retry Settings</h4>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Attempts:</span>
                  <span className={styles.summaryValue}>
                    {formData?.retry_attempts || 'Test Campaign'}
                  </span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Interval:</span>
                  <span className={styles.summaryValue}>
                    {formData?.retry_interval || '2025-07-03'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step4Review;
