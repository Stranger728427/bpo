import type { Meta, StoryObj } from '@storybook/react';
import type { ColumnsType } from 'antd/es/table';
import { Table } from './Table';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  email: string;
}

const meta = {
  title: 'UI/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a: DataType, b: DataType) => a.name.localeCompare(b.name),
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    sorter: (a: DataType, b: DataType) => a.age - b.age,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    email: 'john.brown@example.com',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    email: 'jim.green@example.com',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    email: 'joe.black@example.com',
  },
  {
    key: '4',
    name: 'Jane Smith',
    age: 28,
    address: 'Paris No. 1 Lake Park',
    email: 'jane.smith@example.com',
  },
];

export const Default: Story = {
  args: {
    columns: columns as never,
    dataSource: data,
  },
};

export const Compact: Story = {
  args: {
    compact: true,
    columns: columns as never,
    dataSource: data,
  },
};

export const Striped: Story = {
  args: {
    striped: true,
    columns: columns as never,
    dataSource: data,
  },
};

export const WithPagination: Story = {
  args: {
    columns: columns as never,
    dataSource: data,
    pagination: {
      pageSize: 2,
      showSizeChanger: true,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    },
  },
};

export const Loading: Story = {
  args: {
    columns: columns as never,
    dataSource: data,
    loading: true,
  },
};

export const Bordered: Story = {
  args: {
    columns: columns as never,
    dataSource: data,
    bordered: true,
  },
};

export const Empty: Story = {
  args: {
    columns: columns as never,
    dataSource: [],
  },
};
