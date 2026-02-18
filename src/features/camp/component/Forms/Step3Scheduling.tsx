import { IoChevronDownCircleOutline } from 'react-icons/io5';
import styles from './CreateCampaignForm.module.scss';
import { CreateCampaignRequest } from '../campaign.type';
import { Select } from '@/components/ui/Select/Select';
import { ClockCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { IoIosCheckmark } from 'react-icons/io';
import { LuCalendar } from 'react-icons/lu';
import { TbTimezone } from 'react-icons/tb';

interface Props {
  formData: CreateCampaignRequest;
  updateFormData: (updates: Partial<CreateCampaignRequest>) => void;
  toggleDay: (day: string) => void;
}

const RetryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M4 12C4 7.58172 7.58172 4 12 4C14.5 4 16.7 5.1 18.2 6.8L20 5V10H15L17 8C15.8 6.5 14 5.5 12 5.5C8.41015 5.5 5.5 8.41015 5.5 12C5.5 15.5899 8.41015 18.5 12 18.5C14.5 18.5 16.7 17.1 17.8 15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function Step3Scheduling({ formData, updateFormData, toggleDay }: Props) {
  return (
    <div className={styles.stepContent}>
      {' '}
      <div className={styles.stepContent}>
        {/* Calling Days */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <LuCalendar />
            </div>
            <div>
              <h3 className={styles.sectionTitle}>Calling days</h3>
              <p className={styles.sectionSubtitle}>
                Select which days of the week calls should be made
              </p>
            </div>
          </div>
          <div className={styles.daysGrid}>
            {DAYS.map((day: any) => (
              <button
                key={day}
                className={`${styles.dayButton} ${formData?.calling_days?.includes(day) ? styles.selected : ''}`}
                onClick={() => toggleDay(day)}
              >
                <span className={styles.dayLabel}>{day}</span>
                <div className={styles.checkbox}>
                  {formData?.calling_days?.includes(day) && <IoIosCheckmark />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Calling Hours */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <ClockCircleOutlined />
            </div>
            <div>
              <h3 className={styles.sectionTitle}>Calling Hours</h3>
              <p className={styles.sectionSubtitle}>
                Set the time window when calls should be placed
              </p>
            </div>
          </div>
          <div className={styles.timeGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Start Time</label>
              <div className={styles.timeInput}>
                <span className={styles.timeLabel}>From</span>
                <input
                  type="time"
                  className={styles.input}
                  value={formData?.start_time!}
                  onChange={(e) =>
                    updateFormData({ start_time: e.target.value })
                  }
                />
                <ClockCircleOutlined />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>End Time</label>
              <div className={styles.timeInput}>
                <span className={styles.timeLabel}>To</span>
                <input
                  type="time"
                  className={styles.input}
                  value={formData?.end_time!}
                  onChange={(e) => updateFormData({ end_time: e.target.value })}
                />
                <ClockCircleOutlined />
              </div>
            </div>
          </div>
        </div>

        {/* Retry Settings */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <RetryIcon />
            </div>
            <div>
              <h3 className={styles.sectionTitle}>Retry Settings</h3>
              <p className={styles.sectionSubtitle}>
                Configure how many times to retry calls and how long to wait
                between attempts
              </p>
            </div>
          </div>
          <div className={styles.formGridHalf}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Retry Attempts <InfoCircleOutlined />
              </label>
              <div className={styles.selectWrapper}>
                <select
                  className={styles.select}
                  value={formData?.retry_attempts!}
                  onChange={(e) =>
                    updateFormData({ retry_attempts: Number(e.target.value) })
                  }
                >
                  <option value="">Select</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="5">5</option>
                </select>
                <IoChevronDownCircleOutline />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Retry Interval (Hours) <InfoCircleOutlined />
              </label>
              <div className={styles.selectWrapper}>
                <select
                  className={styles.select}
                  value={formData?.retry_interval!}
                  onChange={(e) =>
                    updateFormData({ retry_interval: Number(e.target.value) })
                  }
                >
                  <option value="">Select</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="24">24</option>
                </select>
                <IoChevronDownCircleOutline />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Status <InfoCircleOutlined />
              </label>
              <div className={styles.selectWrapper}>
                <Select
                  placeholder="Select Status"
                  className={styles.select}
                  options={[
                    { value: 'active', label: 'Active' },
                    { value: 'paused', label: 'Paused' },
                    { value: 'completed', label: 'Completed' },
                  ]}
                  onChange={(value) => {
                    console.log(value);
                    updateFormData({ status: value });
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Time Zone */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <TbTimezone />
            </div>
            <div>
              <h3 className={styles.sectionTitle}>Time Zone</h3>
              <p className={styles.sectionSubtitle}>
                Select the time zone for scheduling calls
              </p>
            </div>
          </div>
          <div className={styles.selectWrapper}>
            <select
              className={styles.select}
              value={formData?.time_zone!}
              onChange={(e) => updateFormData({ time_zone: e.target.value })}
            >
              <option value="Eastern Time (ET)">Eastern Time (ET)</option>
              <option value="Central Time (CT)">Central Time (CT)</option>
              <option value="Mountain Time (MT)">Mountain Time (MT)</option>
              <option value="Pacific Time (PT)">Pacific Time (PT)</option>
            </select>
            <IoChevronDownCircleOutline />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step3Scheduling;
