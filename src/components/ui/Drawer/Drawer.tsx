import { Drawer as AntdDrawer } from 'antd';
import type { DrawerProps as AntdDrawerProps } from 'antd';
import styles from './Drawer.module.scss';

export interface DrawerProps extends AntdDrawerProps {
  /**
   * Alias for `open` prop for better readability.
   */
  isOpen?: boolean;
  /**
   * Drawer size preset.
   */
  size?: 'sm' | 'md' | 'lg' | 'full';
}

const sizeMap: Record<'sm' | 'md' | 'lg' | 'full', number | string> = {
  sm: 320,
  md: 480,
  lg: 720,
  full: '100%',
};

/**
 * Drawer component built on Ant Design Drawer.
 *
 * Provides a panel that slides in from the edge of the screen.
 *
 * @example
 * ```tsx
 * // Basic drawer
 * <Drawer
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   title="Drawer Title"
 * >
 *   Drawer content
 * </Drawer>
 *
 * // Drawer with size
 * <Drawer isOpen={isOpen} size="lg" title="Large Drawer">
 *   Content
 * </Drawer>
 *
 * // Drawer from different placement
 * <Drawer isOpen={isOpen} placement="left" title="Left Drawer">
 *   Content
 * </Drawer>
 * ```
 */
export function Drawer({
  isOpen,
  open,
  size,
  width,
  height,
  className = '',
  ...props
}: DrawerProps) {
  const isDrawerOpen = isOpen ?? open;

  let drawerWidth = width;
  let drawerHeight = height;

  if (size && !width && !height) {
    if (props.placement === 'top' || props.placement === 'bottom') {
      drawerHeight = sizeMap[size];
    } else {
      drawerWidth = sizeMap[size];
    }
  }

  const classNames = [styles.drawer, className].filter(Boolean).join(' ');

  return (
    <AntdDrawer
      open={isDrawerOpen}
      width={drawerWidth}
      height={drawerHeight}
      className={classNames}
      {...props}
    />
  );
}
