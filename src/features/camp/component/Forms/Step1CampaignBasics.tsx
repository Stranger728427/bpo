import { CreateCampaignRequest } from '@/features/camp/component/campaign.type';
import styles from './CreateCampaignForm.module.scss';
import { Input, Select, DatePicker } from 'antd';
import type { SelectProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { LuChevronDown, LuCalendar } from 'react-icons/lu';
import { Controller, useFormContext } from 'react-hook-form';

const campaignTypeOptions: SelectProps['options'] = [
  { value: 'onboarding', label: 'Onboarding' },
  { value: 'lead_generation', label: 'Lead Generation' },
  { value: 'reminder', label: 'Reminder' },
  { value: 'survey', label: 'Survey' },
];

function Step1CampaignBasics() {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<CreateCampaignRequest>();

  const startDate = watch('start_date');

  const disableStartDate = (current: Dayjs) =>
    current && current < dayjs().startOf('day');

  const disableEndDate = (current: Dayjs | null): boolean => {
    if (!current) return false;
    return (
      current.isBefore(dayjs().startOf('day')) ||
      (startDate ? current.isBefore(dayjs(startDate).startOf('day')) : false)
    );
  };

  return (
    <div className={styles.stepContent}>
      <div className={styles.formGrid}>
        {/* Campaign Name */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Campaign Name</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                value={field.value ?? ''}
                placeholder="Enter campaign name"
                size="large"
                status={errors.name ? 'error' : ''}
              />
            )}
          />
          {errors.name && (
            <span className={styles.errorText}>{errors.name.message}</span>
          )}
        </div>

        {/* Campaign Type */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Type</label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                size="large"
                placeholder="Select type"
                options={campaignTypeOptions}
                value={field.value}
                onChange={field.onChange}
                suffixIcon={<LuChevronDown />}
                status={errors.type ? 'error' : ''}
              />
            )}
          />
          {errors.type && (
            <span className={styles.errorText}>{errors.type.message}</span>
          )}
        </div>

        {/* Start Date */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Start Date</label>
          <Controller
            name="start_date"
            control={control}
            render={({ field }) => (
              <DatePicker
                size="large"
                style={{ width: '100%' }}
                value={field.value ? dayjs(field.value) : null}
                onChange={(date) =>
                  field.onChange(date ? date.format('YYYY-MM-DD') : '')
                }
                disabledDate={disableStartDate}
                suffixIcon={<LuCalendar />}
                status={errors.start_date ? 'error' : ''}
              />
            )}
          />
          {errors.start_date && (
            <span className={styles.errorText}>
              {errors.start_date.message}
            </span>
          )}
        </div>

        {/* End Date */}
        <div className={styles.formGroup}>
          <label className={styles.label}>End Date</label>
          <Controller
            name="end_date"
            control={control}
            render={({ field }) => (
              <DatePicker
                size="large"
                style={{ width: '100%' }}
                value={field.value ? dayjs(field.value) : null}
                onChange={(date) =>
                  field.onChange(date ? date.format('YYYY-MM-DD') : '')
                }
                disabled={!startDate}
                disabledDate={disableEndDate}
                suffixIcon={<LuCalendar />}
                status={errors.end_date ? 'error' : ''}
              />
            )}
          />
          {errors.end_date && (
            <span className={styles.errorText}>{errors.end_date.message}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Step1CampaignBasics;
