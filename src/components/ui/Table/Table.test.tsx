import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ConfigProvider } from 'antd';
import { Table } from './Table';
import { lightTheme } from '@lib/antd/theme';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ConfigProvider theme={lightTheme}>{ui}</ConfigProvider>);
};

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
];

const data = [
  { key: '1', name: 'John', age: 32 },
  { key: '2', name: 'Jane', age: 28 },
];

describe('Table', () => {
  it('renders correctly with data', () => {
    renderWithTheme(<Table columns={columns} dataSource={data} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
  });

  it('renders empty state when no data', () => {
    const { container } = renderWithTheme(<Table columns={columns} dataSource={[]} />);
    // Check for empty state
    expect(container.querySelector('.ant-empty')).toBeInTheDocument();
  });

  it('applies compact size', () => {
    const { container } = renderWithTheme(
      <Table compact columns={columns} dataSource={data} />
    );
    expect(container.querySelector('.ant-table-small')).toBeInTheDocument();
  });

  it('applies striped class', () => {
    const { container } = renderWithTheme(
      <Table striped columns={columns} dataSource={data} />
    );
    // The striped class is applied directly to the table wrapper (CSS modules transform class names)
    const tableWrapper = container.querySelector('.ant-table-wrapper');
    expect(tableWrapper?.className).toMatch(/table--striped/);
  });

  it('shows loading state', () => {
    const { container } = renderWithTheme(
      <Table loading columns={columns} dataSource={data} />
    );
    expect(container.querySelector('.ant-spin')).toBeInTheDocument();
  });

  it('renders bordered table', () => {
    const { container } = renderWithTheme(
      <Table bordered columns={columns} dataSource={data} />
    );
    expect(
      container.querySelector('.ant-table-bordered')
    ).toBeInTheDocument();
  });
});
