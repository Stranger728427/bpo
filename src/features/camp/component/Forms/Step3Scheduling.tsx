import styles from './CreateCampaignForm.module.scss';
import { CreateCampaignRequest } from '../campaign.type';
import { Select } from '@/components/ui/Select/Select';
import { ClockCircleOutlined } from '@ant-design/icons';
import { IoIosCheckmark } from 'react-icons/io';
import { LuCalendar } from 'react-icons/lu';
import { TbTimezone } from 'react-icons/tb';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import { TIME_ZONES } from '@/components/constants/Constant';
import { useMemo } from 'react';

interface Props {
  formData: CreateCampaignRequest;
  updateFormData: (updates: Partial<CreateCampaignRequest>) => void;
  toggleDay: (day: string) => void;
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function Step3Scheduling({ formData, updateFormData, toggleDay }: Props) {
  const startTime = useMemo(
    () => (formData?.start_time ? dayjs(formData.start_time, 'HH:mm') : null),
    [formData?.start_time]
  );

  const disabledTime = useMemo(() => {
    if (!startTime) return undefined;

    const startHour = startTime.hour();
    const startMinute = startTime.minute();

    return () => ({
      disabledHours: () => [...Array(startHour).keys()],

      disabledMinutes: (selectedHour: number) =>
        selectedHour === startHour ? [...Array(startMinute).keys()] : [],
    });
  }, [startTime]);

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
                  size="large"
                  format="hh:mm"
                  className={styles.timePicker}
                  suffixIcon={<ClockCircleOutlined />}
                  value={
                    formData?.start_time
                      ? dayjs(formData.start_time, 'HH:mm')
                      : null
                  }
                  onChange={(time) =>
                    updateFormData({
                      start_time: time ? time.format('HH:mm') : '',
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
                  size="large"
                  format="HH:mm"
                  className={styles.timePicker}
                  suffixIcon={<ClockCircleOutlined />}
                  disabled={!startTime}
                  value={
                    formData?.end_time
                      ? dayjs(formData.end_time, 'HH:mm')
                      : null
                  }
                  disabledTime={disabledTime}
                  onChange={(time) =>
                    updateFormData({
                      end_time: time ? time.format('HH:mm') : '',
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Retry Settings */}
        {/* <div className={styles.section}> */}
        {/* Header */}
        {/* <Flex gap={12} align="flex-start" className={styles.sectionHeader}>
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
          </Flex> */}

        {/* Form Fields */}
        {/* <div className={styles.formGridHalf}> */}
        {/* Retry Attempts */}
        {/* <div className={styles.formGroup}>
              <label className={styles.label}>
                Retry Attempts
                <Tooltip title="Number of retry attempts">
                  <InfoCircleOutlined />
                </Tooltip>
              </label>

              <Select
                placeholder="Select"
                value={formData?.retry_attempts}
                size="large"
                options={[
                  { value: 1, label: '1' },
                  { value: 2, label: '2' },
                  { value: 3, label: '3' },
                  { value: 5, label: '5' },
                ]}
                onChange={(value) => updateFormData({ retry_attempts: value })}
              />
            </div> */}

        {/* Retry Interval */}
        {/* <div className={styles.formGroup}>
              <label className={styles.label}>
                Retry Interval (Hours)
                <Tooltip title="Delay between retries">
                  <InfoCircleOutlined />
                </Tooltip>
              </label>

              <Select
                placeholder="Select"
                size="large"
                // className={styles.select}
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
            </div> */}

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
        {/* </div> */}
        {/* </div> */}

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
              placeholder="Select Time Zone"
              value={formData?.time_zone}
              size="large"
              // className={styles.select}
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
