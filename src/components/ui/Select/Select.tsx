import { Select as AntdSelect } from 'antd';
import type { SelectProps as AntdSelectProps } from 'antd';
import styles from './Select.module.scss';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface SelectProps<T = any> extends AntdSelectProps<T> {
  /**
   * Label text displayed above the select.
   */
  label?: string;
  /**
   * Error message to display below the select.
   */
  error?: string;
  /**
   * Helper text to display below the select when no error.
   */
  helperText?: string;
  /**
   * Full width select (default: true).
   * @default true
   */
  fullWidth?: boolean;
}

/**
 * Select component built on Ant Design Select.
 *
 * Provides a dropdown select input with search, multi-select, and more.
 *
 * @example
 * ```tsx
 * // Basic select
 * <Select
 *   label="Country"
 *   placeholder="Select a country"
 *   options={[
 *     { value: 'us', label: 'United States' },
 *     { value: 'uk', label: 'United Kingdom' },
 *   ]}
 * />
 *
 * // Multi-select
 * <Select
 *   mode="multiple"
 *   label="Skills"
 *   placeholder="Select skills"
 *   options={skills}
 * />
 *
 * // With search
 * <Select
 *   showSearch
 *   label="Search Country"
 *   placeholder="Search..."
 *   options={countries}
 * />
 *
 * // With error
 * <Select
 *   label="Category"
 *   error="This field is required"
 *   options={categories}
 * />
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Select<T = any>({
  label,
  error,
  helperText,
  fullWidth = true,
  className = '',
  status,
  ...props
}: SelectProps<T>) {
  const wrapperClasses = [
    styles.selectWrapper,
    fullWidth && styles['selectWrapper--fullWidth'],
  ]
    .filter(Boolean)
    .join(' ');

  const selectClasses = [styles.select, className].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses}>
      {label && <label className={styles.label}>{label}</label>}
      <AntdSelect<T>
        status={error ? 'error' : status}
        className={selectClasses}
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
