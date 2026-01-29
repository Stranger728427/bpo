import { useState } from 'react';
import { Badge } from '@components/ui/Badge/Badge';
import styles from './CreateCampaignModal.module.scss';

interface CreateCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Types
interface CampaignFormData {
  // Step 1
  name: string;
  type: string;
  startDate: string;
  endDate: string;
  // Step 2
  aiAssistant: string;
  phoneNumber: string;
  leadsInputType: 'manual' | 'import';
  leadsManual: string;
  leadsFile: File | null;
  // Step 3
  callingDays: string[];
  startTime: string;
  endTime: string;
  retryAttempts: string;
  retryInterval: string;
  timeZone: string;
}

const STEPS = [
  { id: 1, label: 'Campaign Basics' },
  { id: 2, label: 'Leads & Resources' },
  { id: 3, label: 'Scheduling' },
  { id: 4, label: 'Review & Create' },
];

const AI_ASSISTANTS = [
  { id: '1', name: 'AI Voice Script v1', model: 'gpt-4o • F6nGhEBLtOt20NQduTGn' },
  { id: '2', name: 'AI Voice Script v2', model: 'gpt-4o • F6nGhEBLtOt20NQduTGn' },
  { id: '3', name: 'AI Voice Script v3', model: 'gpt-4o • F6nGhEBLtOt20NQduTGn' },
  { id: '4', name: 'AI Voice Script v4', model: 'gpt-4o • F6nGhEBLtOt20NQduTGn' },
];

const PHONE_NUMBERS = [
  { id: '1', label: 'Phone Number', number: '+1 787 789 7894', status: 'active' as const },
  { id: '2', label: 'Phone Number', number: '+1 787 789 7894', status: 'active' as const },
  { id: '3', label: 'Accident Centers of Texas', number: '+1 787 789 7894', status: 'active' as const },
  { id: '4', label: 'Mynx Softwares', number: '+1 787 789 7894', status: 'inactive' as const },
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Icons
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <path d="M15 9L9 15M9 9L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="2" y="3" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2 7H18" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M6 1V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M14 1V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M5 10L8 13L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RobotIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="4" y="6" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="9" cy="12" r="1.5" fill="currentColor"/>
    <circle cx="15" cy="12" r="1.5" fill="currentColor"/>
    <path d="M9 16H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 3V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="2" r="1" fill="currentColor"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M20 16V19C20 19.5523 19.5523 20 19 20C10.1634 20 3 12.8366 3 4C3 3.44772 3.44772 3 4 3H7C7.27614 3 7.5 3.22386 7.5 3.5C7.5 5.32071 7.875 7.06284 8.565 8.66L6.17 11.055C7.865 14.355 10.645 17.135 13.945 18.83L16.34 16.435C17.9372 17.125 19.6793 17.5 21.5 17.5C21.7761 17.5 22 17.7239 22 18V16H20Z" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="17" cy="7" r="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M3 20C3 16.6863 5.68629 14 9 14C12.3137 14 15 16.6863 15 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M15 14C17.2091 14 19 15.7909 19 18V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const FileIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="3" y="2" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M7 7H13M7 10H13M7 13H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const CalendarDaysIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M3 9H21" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 2V5M16 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <rect x="7" y="12" width="3" height="3" rx="0.5" fill="currentColor"/>
    <rect x="14" y="12" width="3" height="3" rx="0.5" fill="currentColor"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const RetryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M4 12C4 7.58172 7.58172 4 12 4C14.5 4 16.7 5.1 18.2 6.8L20 5V10H15L17 8C15.8 6.5 14 5.5 12 5.5C8.41015 5.5 5.5 8.41015 5.5 12C5.5 15.5899 8.41015 18.5 12 18.5C14.5 18.5 16.7 17.1 17.8 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const GlobeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M3 12H21M12 3C14 5.5 15 8.5 15 12C15 15.5 14 18.5 12 21C10 18.5 9 15.5 9 12C9 8.5 10 5.5 12 3Z" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const SummaryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M7 8H17M7 12H14M7 16H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const InfoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M7 6V10M7 4.5V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export function CreateCampaignModal({ isOpen, onClose }: CreateCampaignModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CampaignFormData>({
    name: '',
    type: '',
    startDate: '',
    endDate: '',
    aiAssistant: '',
    phoneNumber: '',
    leadsInputType: 'manual',
    leadsManual: '',
    leadsFile: null,
    callingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    startTime: '',
    endTime: '',
    retryAttempts: '',
    retryInterval: '',
    timeZone: 'Eastern Time (ET)',
  });

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    console.log('Creating campaign:', formData);
    onClose();
  };

  const updateFormData = (updates: Partial<CampaignFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const toggleDay = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      callingDays: prev.callingDays.includes(day)
        ? prev.callingDays.filter((d) => d !== day)
        : [...prev.callingDays, day],
    }));
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h2 className={styles.title}>Create New Campaign</h2>
            <p className={styles.subtitle}>Configure the details for your calling campaign.</p>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        {/* Step Indicator */}
        <div className={styles.stepIndicator}>
          <div className={styles.stepLabels}>
            {STEPS.map((step) => (
              <span
                key={step.id}
                className={`${styles.stepLabel} ${currentStep >= step.id ? styles.active : ''}`}
              >
                {step.label}
              </span>
            ))}
          </div>
          <div className={styles.stepProgress}>
            <div className={styles.progressLine}>
              <div
                className={styles.progressFill}
                style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
              />
            </div>
            {STEPS.map((step) => (
              <div
                key={step.id}
                className={`${styles.stepDot} ${currentStep >= step.id ? styles.active : ''} ${currentStep === step.id ? styles.current : ''}`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {currentStep === 1 && (
            <Step1CampaignBasics formData={formData} updateFormData={updateFormData} />
          )}
          {currentStep === 2 && (
            <Step2LeadsResources formData={formData} updateFormData={updateFormData} />
          )}
          {currentStep === 3 && (
            <Step3Scheduling formData={formData} updateFormData={updateFormData} toggleDay={toggleDay} />
          )}
          {currentStep === 4 && (
            <Step4Review formData={formData} />
          )}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          {currentStep > 1 && (
            <button className={styles.secondaryButton} onClick={handlePrevious}>
              Previous Page
            </button>
          )}
          <div className={styles.footerSpacer} />
          {currentStep < 4 ? (
            <button className={styles.primaryButton} onClick={handleNext}>
              Save & Proceed
            </button>
          ) : (
            <button className={styles.primaryButton} onClick={handleSubmit}>
              Create Campaign
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Step 1: Campaign Basics
function Step1CampaignBasics({
  formData,
  updateFormData,
}: {
  formData: CampaignFormData;
  updateFormData: (updates: Partial<CampaignFormData>) => void;
}) {
  return (
    <div className={styles.stepContent}>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Campaign Name</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Winter Sale Blast"
            value={formData.name}
            onChange={(e) => updateFormData({ name: e.target.value })}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Type</label>
          <div className={styles.selectWrapper}>
            <select
              className={styles.select}
              value={formData.type}
              onChange={(e) => updateFormData({ type: e.target.value })}
            >
              <option value="">Select type</option>
              <option value="onboarding">Onboarding</option>
              <option value="lead-generation">Lead Generation</option>
              <option value="reminder">Reminder</option>
              <option value="survey">Survey</option>
            </select>
            <ChevronDownIcon />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Start Date</label>
          <div className={styles.inputWithIcon}>
            <input
              type="date"
              className={styles.input}
              value={formData.startDate}
              onChange={(e) => updateFormData({ startDate: e.target.value })}
            />
            <CalendarIcon />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>End Date</label>
          <div className={styles.inputWithIcon}>
            <input
              type="date"
              className={styles.input}
              value={formData.endDate}
              onChange={(e) => updateFormData({ endDate: e.target.value })}
            />
            <CalendarIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

// Step 2: Leads & Resources
function Step2LeadsResources({
  formData,
  updateFormData,
}: {
  formData: CampaignFormData;
  updateFormData: (updates: Partial<CampaignFormData>) => void;
}) {
  return (
    <div className={styles.stepContent}>
      {/* AI Assistant Section */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <RobotIcon />
          </div>
          <div>
            <h3 className={styles.sectionTitle}>AI Assistant that will place the calls</h3>
            <p className={styles.sectionSubtitle}>Select the AI assistant that will handle the conversations</p>
          </div>
        </div>
        <div className={styles.cardGrid}>
          {AI_ASSISTANTS.map((assistant) => (
            <button
              key={assistant.id}
              className={`${styles.selectionCard} ${formData.aiAssistant === assistant.id ? styles.selected : ''}`}
              onClick={() => updateFormData({ aiAssistant: assistant.id })}
            >
              <div className={styles.cardContent}>
                <span className={styles.cardTitle}>{assistant.name}</span>
                <span className={styles.cardMeta}>{assistant.model}</span>
              </div>
              {formData.aiAssistant === assistant.id && (
                <div className={styles.checkMark}>
                  <CheckIcon />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Phone Number Section */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <PhoneIcon />
          </div>
          <div>
            <h3 className={styles.sectionTitle}>Phone number that will make the calls</h3>
            <p className={styles.sectionSubtitle}>Select the phone number that will be used for outbound calls</p>
          </div>
        </div>
        <div className={styles.cardGrid}>
          {PHONE_NUMBERS.map((phone) => (
            <button
              key={phone.id}
              className={`${styles.selectionCard} ${styles.phoneCard} ${formData.phoneNumber === phone.id ? styles.selected : ''}`}
              onClick={() => updateFormData({ phoneNumber: phone.id })}
            >
              <div className={styles.cardContent}>
                <span className={styles.cardTitle}>{phone.label}</span>
                <div className={styles.phoneInfo}>
                  <span className={styles.phoneNumber}>{phone.number}</span>
                  <Badge variant={phone.status === 'active' ? 'success' : 'default'}>
                    {phone.status === 'active' ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>
              {formData.phoneNumber === phone.id && (
                <div className={styles.checkMark}>
                  <CheckIcon />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Section */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <UsersIcon />
          </div>
          <div>
            <h3 className={styles.sectionTitle}>Leads to Call</h3>
            <p className={styles.sectionSubtitle}>
              {formData.leadsInputType === 'manual'
                ? 'Enter one lead per line: Name, Phone Number (any format, spaces will be removed)'
                : 'Import leads from a CSV or Excel file'}
            </p>
          </div>
        </div>

        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${formData.leadsInputType === 'manual' ? styles.active : ''}`}
              onClick={() => updateFormData({ leadsInputType: 'manual' })}
            >
              <UsersIcon />
              <span>Manual Entry</span>
            </button>
            <button
              className={`${styles.tab} ${formData.leadsInputType === 'import' ? styles.active : ''}`}
              onClick={() => updateFormData({ leadsInputType: 'import' })}
            >
              <FileIcon />
              <span>Import CSV/Excel</span>
            </button>
          </div>

          {formData.leadsInputType === 'manual' ? (
            <textarea
              className={styles.textarea}
              placeholder="John Doe, +15551234567&#10;Jane Smith, +15553234567"
              value={formData.leadsManual}
              onChange={(e) => updateFormData({ leadsManual: e.target.value })}
            />
          ) : (
            <div className={styles.uploadArea}>
              <p className={styles.uploadText}>Drop files to upload</p>
              <span className={styles.uploadOr}>or</span>
              <button className={styles.chooseFileButton}>Choose File</button>
              <p className={styles.uploadHint}>
                CSV or Excel file with name and phone number columns.{' '}
                <a href="#" className={styles.sampleLink}>View Sample</a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Step 3: Scheduling
function Step3Scheduling({
  formData,
  updateFormData,
  toggleDay,
}: {
  formData: CampaignFormData;
  updateFormData: (updates: Partial<CampaignFormData>) => void;
  toggleDay: (day: string) => void;
}) {
  return (
    <div className={styles.stepContent}>
      {/* Calling Days */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <CalendarDaysIcon />
          </div>
          <div>
            <h3 className={styles.sectionTitle}>Calling days</h3>
            <p className={styles.sectionSubtitle}>Select which days of the week calls should be made</p>
          </div>
        </div>
        <div className={styles.daysGrid}>
          {DAYS.map((day) => (
            <button
              key={day}
              className={`${styles.dayButton} ${formData.callingDays.includes(day) ? styles.selected : ''}`}
              onClick={() => toggleDay(day)}
            >
              <span className={styles.dayLabel}>{day}</span>
              <div className={styles.checkbox}>
                {formData.callingDays.includes(day) && <CheckIcon />}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Calling Hours */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <ClockIcon />
          </div>
          <div>
            <h3 className={styles.sectionTitle}>Calling Hours</h3>
            <p className={styles.sectionSubtitle}>Set the time window when calls should be placed</p>
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
                value={formData.startTime}
                onChange={(e) => updateFormData({ startTime: e.target.value })}
              />
              <ClockIcon />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>End Time</label>
            <div className={styles.timeInput}>
              <span className={styles.timeLabel}>To</span>
              <input
                type="time"
                className={styles.input}
                value={formData.endTime}
                onChange={(e) => updateFormData({ endTime: e.target.value })}
              />
              <ClockIcon />
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
            <p className={styles.sectionSubtitle}>Configure how many times to retry calls and how long to wait between attempts</p>
          </div>
        </div>
        <div className={styles.formGridHalf}>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Retry Attempts <InfoIcon />
            </label>
            <div className={styles.selectWrapper}>
              <select
                className={styles.select}
                value={formData.retryAttempts}
                onChange={(e) => updateFormData({ retryAttempts: e.target.value })}
              >
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="5">5</option>
              </select>
              <ChevronDownIcon />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Retry Interval (Hours) <InfoIcon />
            </label>
            <div className={styles.selectWrapper}>
              <select
                className={styles.select}
                value={formData.retryInterval}
                onChange={(e) => updateFormData({ retryInterval: e.target.value })}
              >
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="24">24</option>
              </select>
              <ChevronDownIcon />
            </div>
          </div>
        </div>
      </div>

      {/* Time Zone */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <GlobeIcon />
          </div>
          <div>
            <h3 className={styles.sectionTitle}>Time Zone</h3>
            <p className={styles.sectionSubtitle}>Select the time zone for scheduling calls</p>
          </div>
        </div>
        <div className={styles.selectWrapper}>
          <select
            className={styles.select}
            value={formData.timeZone}
            onChange={(e) => updateFormData({ timeZone: e.target.value })}
          >
            <option value="Eastern Time (ET)">Eastern Time (ET)</option>
            <option value="Central Time (CT)">Central Time (CT)</option>
            <option value="Mountain Time (MT)">Mountain Time (MT)</option>
            <option value="Pacific Time (PT)">Pacific Time (PT)</option>
          </select>
          <ChevronDownIcon />
        </div>
      </div>
    </div>
  );
}

// Step 4: Review & Create
function Step4Review({ formData }: { formData: CampaignFormData }) {
  const selectedAssistant = AI_ASSISTANTS.find((a) => a.id === formData.aiAssistant);
  const selectedPhone = PHONE_NUMBERS.find((p) => p.id === formData.phoneNumber);
  const leadsCount = formData.leadsManual.split('\n').filter((l) => l.trim()).length;

  return (
    <div className={styles.stepContent}>
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <SummaryIcon />
          </div>
          <div>
            <h3 className={styles.sectionTitle}>Campaign Summary</h3>
            <p className={styles.sectionSubtitle}>Review the detail summary of campaign you are creating</p>
          </div>
        </div>

        <div className={styles.summaryGrid}>
          <div className={styles.summaryCard}>
            <div className={styles.summaryNumber}>1</div>
            <div className={styles.summaryContent}>
              <h4 className={styles.summaryTitle}>Campaign Details</h4>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Name:</span>
                <span className={styles.summaryValue}>{formData.name || 'Test Campaign'}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Date:</span>
                <span className={styles.summaryValue}>
                  {formData.startDate || '08/06/2025'} - {formData.endDate || '08/06/2026'}
                </span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Leads:</span>
                <span className={styles.summaryValue}>{leadsCount || 145} Leads</span>
              </div>
            </div>
          </div>

          <div className={styles.summaryCard}>
            <div className={styles.summaryNumber}>2</div>
            <div className={styles.summaryContent}>
              <h4 className={styles.summaryTitle}>Schedule</h4>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Calling Days:</span>
                <span className={styles.summaryValue}>{formData.callingDays.join(', ')}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Calling Hours:</span>
                <span className={styles.summaryValue}>
                  {formData.startTime || '09:00'}-{formData.endTime || '17:00'}
                </span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Time Zone:</span>
                <span className={styles.summaryValue}>{formData.timeZone}</span>
              </div>
            </div>
          </div>

          <div className={styles.summaryCard}>
            <div className={styles.summaryNumber}>3</div>
            <div className={styles.summaryContent}>
              <h4 className={styles.summaryTitle}>Resources</h4>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>AI Assistant:</span>
                <span className={styles.summaryValue}>{selectedAssistant?.name || 'Act Assistant (Copy)'}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Phone Number:</span>
                <span className={styles.summaryValue}>{selectedPhone?.number || '+19723705282'}</span>
              </div>
            </div>
          </div>

          <div className={styles.summaryCard}>
            <div className={styles.summaryNumber}>4</div>
            <div className={styles.summaryContent}>
              <h4 className={styles.summaryTitle}>Retry Settings</h4>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Attempts:</span>
                <span className={styles.summaryValue}>{formData.retryAttempts || 'Test Campaign'}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Interval:</span>
                <span className={styles.summaryValue}>{formData.retryInterval || '2025-07-03'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
