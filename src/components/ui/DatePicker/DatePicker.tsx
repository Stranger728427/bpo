import { DatePicker as AntdDatePicker } from 'antd';
import type { DatePickerProps as AntdDatePickerProps } from 'antd';
import styles from './DatePicker.module.scss';

export interface DatePickerProps extends AntdDatePickerProps {
  /**
   * Label text displayed above the date picker.
   */
  label?: string;
  /**
   * Error message to display below the date picker.
   */
  error?: string;
  /**
   * Helper text to display below the date picker when no error.
   */
  helperText?: string;
  /**
   * Full width date picker (default: true).
   * @default true
   */
  fullWidth?: boolean;
}

/**
 * DatePicker component built on Ant Design DatePicker.
 *
 * Provides date and time selection with calendar interface.
 *
 * @example
 * ```tsx
 * // Basic date picker
 * <DatePicker
 *   label="Birth Date"
 *   placeholder="Select date"
 * />
 *
 * // Date picker with time
 * <DatePicker
 *   label="Event Time"
 *   showTime
 *   placeholder="Select date and time"
 * />
 *
 * // With error
 * <DatePicker
 *   label="Date"
 *   error="This field is required"
 * />
 *
 * // Date range picker
 * <DatePicker.RangePicker
 *   label="Date Range"
 *   placeholder={['Start Date', 'End Date']}
 * />
 * ```
 */
export function DatePicker({
  label,
  error,
  helperText,
  fullWidth = true,
  className = '',
  status,
  ...props
}: DatePickerProps) {
  const wrapperClasses = [
    styles.datePickerWrapper,
    fullWidth && styles['datePickerWrapper--fullWidth'],
  ]
    .filter(Boolean)
    .join(' ');

  const pickerClasses = [styles.datePicker, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      {label && <label className={styles.label}>{label}</label>}
      <AntdDatePicker
        status={error ? 'error' : status}
        className={pickerClasses}
        {...props}
      />
      {error && (
        <span className={styles.error} role="alert">
          {error}
        </span>
      )}
      {!error && helperText && (
        <span className={styles.helperText}>{helperText}</span>
      )}
    </div>
  );
}

// Export RangePicker as a sub-component
DatePicker.RangePicker = AntdDatePicker.RangePicker;
