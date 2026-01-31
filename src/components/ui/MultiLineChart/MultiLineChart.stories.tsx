import type { Meta, StoryObj } from '@storybook/react';
import { MultiLineChart } from './MultiLineChart';

const meta: Meta<typeof MultiLineChart> = {
  title: 'UI/MultiLineChart',
  component: MultiLineChart,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px', padding: '20px', background: '#fff' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MultiLineChart>;

const performanceData = [
  { date: '4 Dec', calls: 50, conversion: 30 },
  { date: '5 Dec', calls: 80, conversion: 55 },
  { date: '6 Dec', calls: 180, conversion: 68 },
  { date: '7 Dec', calls: 150, conversion: 85 },
  { date: '8 Dec', calls: 200, conversion: 95 },
  { date: '9 Dec', calls: 230, conversion: 105 },
  { date: '10 Dec', calls: 210, conversion: 110 },
];

const performanceLines = [
  { dataKey: 'calls', name: 'Calls', color: '#8b5cf6' },
  { dataKey: 'conversion', name: 'Conversion', color: '#6b7280' },
];

export const Default: Story = {
  args: {
    data: performanceData,
    lines: performanceLines,
    xAxisKey: 'date',
    height: 280,
  },
};

export const WithYAxisConfig: Story = {
  args: {
    data: performanceData,
    lines: performanceLines,
    xAxisKey: 'date',
    height: 280,
    yAxisDomain: [0, 500],
    yAxisTicks: [0, 100, 200, 300, 400, 500],
  },
};

export const SingleLine: Story = {
  args: {
    data: performanceData,
    lines: [{ dataKey: 'calls', name: 'Calls', color: '#8b5cf6' }],
    xAxisKey: 'date',
    height: 250,
  },
};

export const ThreeLines: Story = {
  args: {
    data: [
      { date: 'Mon', sales: 100, returns: 20, revenue: 80 },
      { date: 'Tue', sales: 150, returns: 25, revenue: 125 },
      { date: 'Wed', sales: 200, returns: 30, revenue: 170 },
      { date: 'Thu', sales: 180, returns: 35, revenue: 145 },
      { date: 'Fri', sales: 220, returns: 28, revenue: 192 },
    ],
    lines: [
      { dataKey: 'sales', name: 'Sales', color: '#8b5cf6' },
      { dataKey: 'returns', name: 'Returns', color: '#ef4444' },
      { dataKey: 'revenue', name: 'Revenue', color: '#22c55e' },
    ],
    xAxisKey: 'date',
    height: 280,
  },
};
