import { Dropdown as AntdDropdown } from 'antd';
import type { DropdownProps as AntdDropdownProps, MenuProps } from 'antd';
import styles from './Dropdown.module.scss';

export interface DropdownProps extends AntdDropdownProps {
  /**
   * Dropdown menu items.
   */
  items?: MenuProps['items'];
}

/**
 * Dropdown component built on Ant Design Dropdown.
 *
 * Provides a dropdown menu for commands and actions.
 *
 * @example
 * ```tsx
 * // Basic dropdown
 * const items = [
 *   { key: '1', label: 'Option 1' },
 *   { key: '2', label: 'Option 2' },
 *   { key: '3', label: 'Option 3' },
 * ];
 * <Dropdown items={items}>
 *   <Button>Click me</Button>
 * </Dropdown>
 *
 * // Dropdown with divider
 * const items = [
 *   { key: '1', label: 'Option 1' },
 *   { type: 'divider' },
 *   { key: '2', label: 'Option 2' },
 * ];
 * <Dropdown items={items}>
 *   <Button>Actions</Button>
 * </Dropdown>
 *
 * // Dropdown with icons
 * const items = [
 *   { key: '1', label: 'Edit', icon: <EditOutlined /> },
 *   { key: '2', label: 'Delete', icon: <DeleteOutlined />, danger: true },
 * ];
 * <Dropdown items={items}>
 *   <Button>More</Button>
 * </Dropdown>
 * ```
 */
export function Dropdown({
  className = '',
  menu,
  items,
  ...props
}: DropdownProps) {
  const classNames = [styles.dropdown, className].filter(Boolean).join(' ');

  const menuProps = items ? { items, ...menu } : menu;

  return (
    <AntdDropdown menu={menuProps} className={classNames} {...props} />
  );
}
