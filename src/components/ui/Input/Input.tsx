import { forwardRef, useId } from 'react';
import { Input as AntdInput } from 'antd';
import type { InputProps as AntdInputProps, InputRef } from 'antd';
import styles from './Input.module.scss';

export interface InputProps extends AntdInputProps {
  /**
   * Label displayed above the input.
   */
  label?: string;
  /**
   * Error message to display.
   */
  error?: string;
  /**
   * Helper text displayed below the input.
   */
  helperText?: string;
  /**
   * Make input span full width of container.
   * @default true
   */
  fullWidth?: boolean;
}

/**
 * Input component built on Ant Design Input.
 *
 * Provides text input with label, error, and helper text support.
 *
 * @example
 * ```tsx
 * // Basic input with label
 * <Input
 *   label="Email"
 *   placeholder="Enter your email"
 * />
 *
 * // Input with error
 * <Input
 *   label="Password"
 *   type="password"
 *   error="Password is required"
 * />
 *
 * // Input with helper text and prefix icon
 * <Input
 *   label="Search"
 *   helperText="Enter at least 3 characters"
 *   prefix={<SearchOutlined />}
 * />
 * ```
 */
export const Input = forwardRef<InputRef, InputProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = true,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const hasError = Boolean(error);

    const wrapperClassNames = [
      styles.wrapper,
      fullWidth && styles['wrapper--fullWidth'],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperClassNames}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}
        <AntdInput
          ref={ref}
          id={inputId}
          status={hasError ? 'error' : undefined}
          aria-invalid={hasError}
          aria-describedby={
            hasError
              ? `${inputId}-error`
              : helperText
                ? `${inputId}-helper`
                : undefined
          }
          {...props}
        />
        {hasError && (
          <span id={`${inputId}-error`} className={styles.error} role="alert">
            {error}
          </span>
        )}
        {!hasError && helperText && (
          <span id={`${inputId}-helper`} className={styles.helperText}>
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
