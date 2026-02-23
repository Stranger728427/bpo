import {
  CampaignType,
  CreateCampaignRequest,
} from '@/features/camp/component/campaign.type';
import styles from './CreateCampaignForm.module.scss';
import { Input, Select, DatePicker } from 'antd';
import type { SelectProps } from 'antd';
import dayjs from 'dayjs';

import { LuChevronDown, LuCalendar } from 'react-icons/lu';

interface Props {
  formData: CreateCampaignRequest;
  updateFormData: (updates: Partial<CreateCampaignRequest>) => void;
}

const campaignTypeOptions: SelectProps['options'] = [
  { value: 'onboarding', label: 'Onboarding' },
  { value: 'lead_generation', label: 'Lead Generation' },
  { value: 'reminder', label: 'Reminder' },
  { value: 'survey', label: 'Survey' },
];

function Step1CampaignBasics({ formData, updateFormData }: Props) {
  return (
    <div className={styles.stepContent}>
      <div className={styles.formGrid}>
        {/* Campaign Name */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Campaign Name</label>
          <Input
            placeholder="Winter Sale Blast"
            value={formData.name!}
            onChange={(e) => updateFormData({ name: e.target.value })}
            size="large"
          />
        </div>

        {/* Campaign Type */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Type</label>
          <Select
            size="large"
            placeholder="Select type"
            options={campaignTypeOptions}
            value={formData.type}
            onChange={(value) =>
              updateFormData({ type: value as CampaignType })
            }
            suffixIcon={<LuChevronDown />}
          />
        </div>

        {/* Start Date */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Start Date</label>
          <DatePicker
            size="large"
            style={{ width: '100%' }}
            value={formData.start_date ? dayjs(formData.start_date) : null}
            onChange={(date) =>
              updateFormData({
                start_date: date ? date.format('YYYY-MM-DD') : null,
              })
            }
            suffixIcon={<LuCalendar />}
          />
        </div>

        {/* End Date */}
        <div className={styles.formGroup}>
          <label className={styles.label}>End Date</label>
          <DatePicker
            size="large"
            style={{ width: '100%' }}
            value={formData.end_date ? dayjs(formData.end_date) : null}
            onChange={(date) =>
              updateFormData({
                end_date: date ? date.format('YYYY-MM-DD') : null,
              })
            }
            suffixIcon={<LuCalendar />}
          />
        </div>
      </div>
    </div>
  );
}

export default Step1CampaignBasics;
