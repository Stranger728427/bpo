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
import { Controller, useFormContext } from 'react-hook-form';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function Step3Scheduling() {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CreateCampaignRequest>();



  const start_time = watch('start_time');
  const calling_days = watch('calling_days') || [];

  const startTime = useMemo(
    () => (start_time ? dayjs(start_time, 'HH:mm') : null),
    [start_time]
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

  const toggleDay = (day: string) => {
    const updatedDays = calling_days.includes(day)
      ? calling_days.filter((d) => d !== day)
      : [...calling_days, day];
    setValue('calling_days', updatedDays);
  };

  return (
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
          {DAYS.map((day) => (
            <button
              key={day}
              type="button"
              className={`${styles.dayButton} ${calling_days.includes(day) ? styles.selected : ''}`}
              onClick={() => toggleDay(day)}
            >
              <span className={styles.dayLabel}>{day}</span>
              <div className={styles.checkbox}>
                {calling_days.includes(day) && <IoIosCheckmark />}
              </div>
            </button>
          ))}
        </div>
        {errors.calling_days && (
          <span className={styles.errorText}>
            {errors.calling_days.message}
          </span>
        )}
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
            <Controller
              name="start_time"
              control={control}
              render={({ field }) => (
                <TimePicker
                  size="large"
                  format="HH:mm"
                  className={styles.timePicker}
                  suffixIcon={<ClockCircleOutlined />}
                  value={field.value ? dayjs(field.value, 'HH:mm') : null}
                  onChange={(time) =>
                    field.onChange(time ? time.format('HH:mm') : '')
                  }
                  status={errors.start_time ? 'error' : ''}
                />
              )}
            />
            {errors.start_time && (
              <span className={styles.errorText}>
                {errors.start_time.message}
              </span>
            )}
          </div>

          {/* End Time */}
          <div className={styles.formGroup}>
            <label className={styles.label}>End Time</label>
            <Controller
              name="end_time"
              control={control}
              render={({ field }) => (
                <TimePicker
                  size="large"
                  format="HH:mm"
                  className={styles.timePicker}
                  suffixIcon={<ClockCircleOutlined />}
                  value={field.value ? dayjs(field.value, 'HH:mm') : null}
                  disabled={!start_time}
                  disabledTime={disabledTime}
                  onChange={(time) =>
                    field.onChange(time ? time.format('HH:mm') : '')
                  }
                  status={errors.end_time ? 'error' : ''}
                />
              )}
            />
            {errors.end_time && (
              <span className={styles.errorText}>
                {errors.end_time.message}
              </span>
            )}
          </div>
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
        <Controller
          name="time_zone"
          control={control}
          render={({ field }) => (
            <Select
              placeholder="Select Time Zone"
              value={field.value}
              size="large"
              options={TIME_ZONES}
              onChange={field.onChange}
              status={errors.time_zone ? 'error' : ''}
            />
          )}
        />
        {errors.time_zone && (
          <span className={styles.errorText}>{errors.time_zone.message}</span>
        )}
      </div>
    </div>
  );
}

export default Step3Scheduling;
