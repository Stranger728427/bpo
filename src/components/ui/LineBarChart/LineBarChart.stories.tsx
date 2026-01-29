import type { Meta, StoryObj } from '@storybook/react';
import { LineBarChart } from './LineBarChart';

const meta = {
  title: 'UI/Charts/LineBarChart',
  component: LineBarChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A combined bar and line chart for comparing two related metrics. Features dual Y-axes, custom tooltips, and legend.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    height: {
      control: { type: 'range', min: 150, max: 400, step: 25 },
      description: 'Chart height in pixels',
    },
    barColor: {
      control: 'color',
      description: 'Bar fill color',
    },
    lineColor: {
      control: 'color',
      description: 'Line stroke color',
    },
    barLabel: {
      control: 'text',
      description: 'Label for bars in legend and tooltip',
    },
    lineLabel: {
      control: 'text',
      description: 'Label for line in legend and tooltip',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 600, padding: 20, background: '#fff', borderRadius: 8 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LineBarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const campaignData = [
  { label: 'Campaign 1', barValue: 5000, lineValue: 10 },
  { label: 'Campaign 2', barValue: 18000, lineValue: 28 },
  { label: 'Campaign 3', barValue: 8000, lineValue: 24 },
  { label: 'Campaign 4', barValue: 6000, lineValue: 42 },
];

const monthlyData = [
  { label: 'Jan', barValue: 12000, lineValue: 15 },
  { label: 'Feb', barValue: 15000, lineValue: 18 },
  { label: 'Mar', barValue: 18000, lineValue: 22 },
  { label: 'Apr', barValue: 14000, lineValue: 19 },
  { label: 'May', barValue: 22000, lineValue: 28 },
  { label: 'Jun', barValue: 25000, lineValue: 32 },
];

const quarterlyData = [
  { label: 'Q1', barValue: 45000, lineValue: 18 },
  { label: 'Q2', barValue: 52000, lineValue: 22 },
  { label: 'Q3', barValue: 48000, lineValue: 20 },
  { label: 'Q4', barValue: 61000, lineValue: 28 },
];

export const Default: Story = {
  args: {
    data: campaignData,
    barLabel: 'Cost',
    lineLabel: 'Conversion',
  },
};

export const CostVsConversion: Story = {
  args: {
    data: campaignData,
    height: 280,
    barLabel: 'Cost',
    lineLabel: 'Conversion',
    barValueFormatter: (value) => `$${value.toLocaleString()}`,
    lineValueFormatter: (value) => `${value}%`,
    leftAxisFormatter: (value) => `$${value / 1000}k`,
    rightAxisFormatter: (value) => `${value}%`,
    leftAxisDomain: [0, 25000],
    rightAxisDomain: [0, 50],
    leftAxisTicks: [0, 5000, 10000, 15000, 20000, 25000],
    rightAxisTicks: [0, 10, 20, 30, 40, 50],
  },
  parameters: {
    docs: {
      description: {
        story: 'Compare campaign costs with conversion rates using formatted axes.',
      },
    },
  },
};

export const RevenueVsGrowth: Story = {
  args: {
    data: monthlyData,
    height: 300,
    barLabel: 'Revenue',
    lineLabel: 'Growth',
    barColor: '#93c5fd',
    lineColor: '#3b82f6',
    barValueFormatter: (value) => `$${value.toLocaleString()}`,
    lineValueFormatter: (value) => `${value}%`,
    leftAxisFormatter: (value) => `$${value / 1000}k`,
    rightAxisFormatter: (value) => `${value}%`,
  },
  parameters: {
    docs: {
      description: {
        story: 'Monthly revenue with growth rate overlay in blue theme.',
      },
    },
  },
};

export const QuarterlySales: Story = {
  args: {
    data: quarterlyData,
    height: 280,
    barLabel: 'Sales',
    lineLabel: 'Margin',
    barColor: '#86efac',
    lineColor: '#22c55e',
    barValueFormatter: (value) => `$${value.toLocaleString()}`,
    lineValueFormatter: (value) => `${value}%`,
    leftAxisFormatter: (value) => `$${value / 1000}k`,
    rightAxisFormatter: (value) => `${value}%`,
  },
  parameters: {
    docs: {
      description: {
        story: 'Quarterly sales with profit margin in green theme.',
      },
    },
  },
};

export const CustomColors: Story = {
  args: {
    data: campaignData,
    height: 250,
    barLabel: 'Spend',
    lineLabel: 'ROI',
    barColor: '#fcd34d',
    lineColor: '#f59e0b',
  },
  parameters: {
    docs: {
      description: {
        story: 'Amber/yellow color theme.',
      },
    },
  },
};

export const CompactHeight: Story = {
  args: {
    data: campaignData,
    height: 180,
    barLabel: 'Cost',
    lineLabel: 'Rate',
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact height for smaller dashboard widgets.',
      },
    },
  },
};

export const TallChart: Story = {
  args: {
    data: monthlyData,
    height: 350,
    barLabel: 'Revenue',
    lineLabel: 'Growth',
    barValueFormatter: (value) => `$${value.toLocaleString()}`,
    lineValueFormatter: (value) => `${value}%`,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 700, padding: 20, background: '#fff', borderRadius: 8 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Larger chart for detailed analysis views.',
      },
    },
  },
};

export const PerformanceMetrics: Story = {
  args: {
    data: [
      { label: 'Email', barValue: 1200, lineValue: 24 },
      { label: 'Social', barValue: 3500, lineValue: 18 },
      { label: 'Search', barValue: 5200, lineValue: 32 },
      { label: 'Display', barValue: 2800, lineValue: 12 },
      { label: 'Direct', barValue: 4100, lineValue: 45 },
    ],
    height: 280,
    barLabel: 'Clicks',
    lineLabel: 'Conv. Rate',
    barColor: '#c4b5fd',
    lineColor: '#7c3aed',
    lineValueFormatter: (value) => `${value}%`,
  },
  parameters: {
    docs: {
      description: {
        story: 'Marketing channel performance with clicks and conversion rates.',
      },
    },
  },
};
