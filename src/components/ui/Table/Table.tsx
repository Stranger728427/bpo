import { Table as AntdTable } from 'antd';
import type { TableProps as AntdTableProps } from 'antd';
import styles from './Table.module.scss';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface TableProps<T = any> extends AntdTableProps<T> {
  /**
   * Compact table layout with reduced padding.
   * @default false
   */
  compact?: boolean;
  /**
   * Enable striped rows for better readability.
   * @default false
   */
  striped?: boolean;
}

/**
 * Table component built on Ant Design Table.
 *
 * Provides data table with sorting, filtering, pagination, and more.
 *
 * @example
 * ```tsx
 * // Basic table
 * const columns = [
 *   { title: 'Name', dataIndex: 'name', key: 'name' },
 *   { title: 'Age', dataIndex: 'age', key: 'age' },
 * ];
 * const data = [
 *   { key: '1', name: 'John', age: 32 },
 *   { key: '2', name: 'Jane', age: 28 },
 * ];
 * <Table columns={columns} dataSource={data} />
 *
 * // Compact table
 * <Table compact columns={columns} dataSource={data} />
 *
 * // Striped table
 * <Table striped columns={columns} dataSource={data} />
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Table<T extends object = any>({
  compact = false,
  striped = false,
  className = '',
  size,
  ...props
}: TableProps<T>) {
  const classNames = [
    compact && styles['table--compact'],
    striped && styles['table--striped'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <AntdTable<T>
      size={compact ? 'small' : size}
      className={classNames}
      {...props}
    />
  );
}
