import { Spin } from 'antd';
import type { SpinProps } from 'antd';
import styles from './Spinner.module.scss';

export interface SpinnerProps extends Omit<SpinProps, 'size'> {
  /**
   * Size of the spinner.
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Display spinner in fullscreen overlay.
   * @default false
   */
  fullScreen?: boolean;
}

const sizeMap: Record<'sm' | 'md' | 'lg', 'small' | 'default' | 'large'> = {
  sm: 'small',
  md: 'default',
  lg: 'large',
};

/**
 * Spinner component built on Ant Design Spin.
 *
 * Provides loading indicator with fullscreen overlay option.
 *
 * @example
 * ```tsx
 * // Inline spinner
 * <Spinner size="md" />
 *
 * // Full screen loading overlay
 * <Spinner fullScreen />
 *
 * // With loading text
 * <Spinner tip="Loading data..." />
 * ```
 */
export function Spinner({
  size = 'md',
  fullScreen = false,
  className = '',
  ...props
}: SpinnerProps) {
  const antdSize = sizeMap[size];

  if (fullScreen) {
    return (
      <div className={styles.fullScreen}>
        <Spin size={antdSize} {...props} />
      </div>
    );
  }

  return <Spin size={antdSize} className={className} {...props} />;
}
