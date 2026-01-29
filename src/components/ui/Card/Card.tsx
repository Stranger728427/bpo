import { Card as AntdCard } from 'antd';
import type { CardProps as AntdCardProps } from 'antd';
import styles from './Card.module.scss';

export interface CardProps extends Omit<AntdCardProps, 'variant'> {
  /**
   * Card visual variant.
   * @default 'elevated'
   */
  variant?: 'elevated' | 'outlined' | 'filled';
  /**
   * Padding size.
   * @default 'md'
   */
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

/**
 * Card component built on Ant Design Card.
 *
 * Provides container with consistent styling and variant options.
 *
 * @example
 * ```tsx
 * // Elevated card with title
 * <Card title="Section Title" variant="elevated">
 *   Card content here
 * </Card>
 *
 * // Outlined hoverable card
 * <Card variant="outlined" hoverable>
 *   Hoverable card content
 * </Card>
 *
 * // Card with extra actions
 * <Card
 *   title="Card Title"
 *   extra={<Button type="link">More</Button>}
 * >
 *   Content
 * </Card>
 * ```
 */
export function Card({
  variant = 'elevated',
  padding = 'md',
  hoverable = false,
  className = '',
  bordered,
  ...props
}: CardProps) {
  const classNames = [
    styles.card,
    styles[`card--${variant}`],
    styles[`card--padding-${padding}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <AntdCard
      className={classNames}
      bordered={bordered ?? variant === 'outlined'}
      hoverable={hoverable}
      {...props}
    />
  );
}
