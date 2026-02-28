import { IoChevronDownCircleOutline } from 'react-icons/io5';
import styles from './CreateCampaignForm.module.scss';
import { CreateCampaignRequest } from '../campaign.type';
import { Select } from '@/components/ui/Select/Select';
import { ClockCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { IoIosCheckmark } from 'react-icons/io';
import { LuCalendar } from 'react-icons/lu';
import { TbTimezone } from 'react-icons/tb';
import { Flex, TimePicker, Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';
import { BsArrowCounterclockwise } from 'react-icons/bs';
import { TIME_ZONES } from '@/components/constants/Constant';

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
            {/* Start Time */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Start Time</label>

              <div className={styles.timeInput}>
                <span className={styles.timeLabel}>From</span>

                <TimePicker
                  use12Hours
                  format="hh:mm A"
                  className={styles.timePicker}
                  suffixIcon={<ClockCircleOutlined />}
                  value={
                    formData?.start_time
                      ? dayjs(formData.start_time, 'HH:mm')
                      : null
                  }
                  onChange={(time) =>
                    updateFormData({
                      start_time: time ? time.format('HH:mm A') : '',
                    })
                  }
                />
              </div>
            </div>

            {/* End Time */}
            <div className={styles.formGroup}>
              <label className={styles.label}>End Time</label>

              <div className={styles.timeInput}>
                <span className={styles.timeLabel}>To</span>

                <TimePicker
                  use12Hours
                  format="hh:mm A"
                  className={styles.timePicker}
                  suffixIcon={<ClockCircleOutlined />}
                  value={
                    formData?.end_time
                      ? dayjs(formData.end_time, 'HH:mm A')
                      : null
                  }
                  onChange={(time) =>
                    updateFormData({ end_time: time?.format('HH:mm A') })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Retry Settings */}
        <div className={styles.section}>
          {/* Header */}
          <Flex gap={12} align="flex-start" className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <BsArrowCounterclockwise size={20} />
            </div>

            <div>
              <Typography.Title level={5} className={styles.sectionTitle}>
                Retry Settings
              </Typography.Title>

              <Typography.Text type="secondary">
                Configure how many times to retry calls and how long to wait
                between attempts
              </Typography.Text>
            </div>
          </Flex>

          {/* Form Fields */}
          <div className={styles.formGridHalf}>
            {/* Retry Attempts */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Retry Attempts
                <Tooltip title="Number of retry attempts">
                  <InfoCircleOutlined />
                </Tooltip>
              </label>

              <Select
                placeholder="Select"
                value={formData?.retry_attempts}
                options={[
                  { value: 1, label: '1' },
                  { value: 2, label: '2' },
                  { value: 3, label: '3' },
                  { value: 5, label: '5' },
                ]}
                onChange={(value) => updateFormData({ retry_attempts: value })}
              />
            </div>

            {/* Retry Interval */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Retry Interval (Hours)
                <Tooltip title="Delay between retries">
                  <InfoCircleOutlined />
                </Tooltip>
              </label>

              <Select
                placeholder="Select"
                value={formData?.retry_interval}
                options={[
                  { value: 1, label: '1 Hour' },
                  { value: 2, label: '2 Hours' },
                  { value: 4, label: '4 Hours' },
                  { value: 8, label: '8 Hours' },
                  { value: 24, label: '24 Hours' },
                ]}
                onChange={(value) => updateFormData({ retry_interval: value })}
              />
            </div>

            {/* Status */}
            {/* <Flex vertical flex={1} className={styles.formGroup}>
              <label className={styles.label}>
                Status
                <Tooltip title="Campaign status">
                  <InfoCircleOutlined />
                </Tooltip>
              </label>

              <Select
                placeholder="Select Status"
                value={formData?.status}
                options={[
                  { value: 'active', label: 'Active' },
                  { value: 'paused', label: 'Paused' },
                  { value: 'completed', label: 'Completed' },
                ]}
                onChange={(value) => updateFormData({ status: value })}
              />
            </Flex> */}
          </div>
        </div>

        {/* Time Zone */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <TbTimezone size={20} />
            </div>
            <div>
              <h3 className={styles.sectionTitle}>Time Zone</h3>
              <p className={styles.sectionSubtitle}>
                Select the time zone for scheduling calls
              </p>
            </div>
          </div>
          <div className={styles.selectWrapper}>
            <Select
              value={formData?.time_zone}
              className={styles.select}
              options={TIME_ZONES}
              onChange={(value) => updateFormData({ time_zone: value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step3Scheduling;
