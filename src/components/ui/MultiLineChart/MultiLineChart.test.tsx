import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MultiLineChart } from './MultiLineChart';

const mockData = [
  { date: '4 Dec', calls: 50, conversion: 30 },
  { date: '5 Dec', calls: 80, conversion: 55 },
  { date: '6 Dec', calls: 180, conversion: 68 },
];

const mockLines = [
  { dataKey: 'calls', name: 'Calls', color: '#8b5cf6' },
  { dataKey: 'conversion', name: 'Conversion', color: '#6b7280' },
];

describe('MultiLineChart', () => {
  it('renders without crashing', () => {
    render(<MultiLineChart data={mockData} lines={mockLines} xAxisKey="date" />);

    expect(screen.getByText('Calls')).toBeInTheDocument();
    expect(screen.getByText('Conversion')).toBeInTheDocument();
  });

  it('renders with custom height', () => {
    const { container } = render(
      <MultiLineChart data={mockData} lines={mockLines} xAxisKey="date" height={300} />
    );

    const chartContainer = container.querySelector('div');
    expect(chartContainer).toHaveStyle({ height: '300px' });
  });

  it('renders x-axis labels', () => {
    render(<MultiLineChart data={mockData} lines={mockLines} xAxisKey="date" />);

    expect(screen.getByText('4 Dec')).toBeInTheDocument();
    expect(screen.getByText('5 Dec')).toBeInTheDocument();
    expect(screen.getByText('6 Dec')).toBeInTheDocument();
  });
});
