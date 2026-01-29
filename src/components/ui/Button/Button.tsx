import { forwardRef } from 'react';
import { Button as AntdButton } from 'antd';
import type { ButtonProps as AntdButtonProps } from 'antd';
import styles from './Button.module.scss';

export interface ButtonProps extends AntdButtonProps {
  /**
   * Makes the button span full width of its container.
   * @default false
   */
  fullWidth?: boolean;
}

/**
 * Button component built on Ant Design Button.
 *
 * Provides all Ant Design Button functionality with additional
 * custom features like fullWidth support.
 *
 * @example
 * ```tsx
 * // Primary button
 * <Button type="primary" onClick={handleClick}>
 *   Click me
 * </Button>
 *
 * // Full width with loading
 * <Button type="primary" fullWidth loading>
 *   Submitting...
 * </Button>
 *
 * // Danger button
 * <Button type="primary" danger>
 *   Delete
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ fullWidth, className, block, ...props }, ref) => {
    const classNames = [
      styles.button,
      fullWidth && styles['button--fullWidth'],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <AntdButton
        ref={ref}
        className={classNames}
        block={fullWidth || block}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
