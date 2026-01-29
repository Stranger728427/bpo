import type { Meta, StoryObj } from '@storybook/react';
import { BarChart } from './BarChart';

const meta = {
  title: 'UI/Charts/BarChart',
  component: BarChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An interactive bar chart component built with Recharts. Supports highlighting, custom colors, tooltips, and labels.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      description: 'Array of data points with label and value',
    },
    height: {
      control: { type: 'range', min: 40, max: 300, step: 10 },
      description: 'Chart height in pixels',
    },
    barColor: {
      control: 'color',
      description: 'Default bar color',
    },
    highlightColor: {
      control: 'color',
      description: 'Highlighted bar color',
    },
    highlightIndex: {
      control: { type: 'number', min: 0, max: 10 },
      description: 'Index of the bar to highlight',
    },
    showLabels: {
      control: 'boolean',
      description: 'Show X-axis labels',
    },
    maxBarSize: {
      control: { type: 'range', min: 10, max: 60, step: 5 },
      description: 'Maximum bar width',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 400, padding: 20, background: '#fff', borderRadius: 8 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const hourlyData = [
  { label: '6a', value: 18 },
  { label: '', value: 22 },
  { label: '', value: 20 },
  { label: '9a', value: 28 },
  { label: '', value: 32 },
  { label: '', value: 30 },
  { label: '12p', value: 65 },
  { label: '', value: 42 },
  { label: '3p', value: 35 },
  { label: '', value: 28 },
  { label: '6p', value: 22 },
];

const weeklyData = [
  { label: 'Mon', value: 45 },
  { label: 'Tue', value: 52 },
  { label: 'Wed', value: 38 },
  { label: 'Thu', value: 65 },
  { label: 'Fri', value: 48 },
  { label: 'Sat', value: 28 },
  { label: 'Sun', value: 15 },
];

const monthlyData = [
  { label: 'Jan', value: 4200 },
  { label: 'Feb', value: 3800 },
  { label: 'Mar', value: 5100 },
  { label: 'Apr', value: 4600 },
  { label: 'May', value: 5800 },
  { label: 'Jun', value: 6200 },
];

export const Default: Story = {
  args: {
    data: hourlyData,
    height: 80,
  },
};

export const WithHighlight: Story = {
  args: {
    data: hourlyData,
    height: 80,
    highlightIndex: 6,
  },
  parameters: {
    docs: {
      description: {
        story: 'Highlight a specific bar to draw attention to a particular data point.',
      },
    },
  },
};

export const WeeklyStats: Story = {
  args: {
    data: weeklyData,
    height: 120,
    highlightIndex: 3,
    maxBarSize: 40,
  },
  parameters: {
    docs: {
      description: {
        story: 'Weekly statistics with larger bars and all labels visible.',
      },
    },
  },
};

export const MonthlyRevenue: Story = {
  args: {
    data: monthlyData,
    height: 150,
    highlightIndex: 5,
    maxBarSize: 50,
    barColor: '#93c5fd',
    highlightColor: '#3b82f6',
    tooltipFormatter: (value) => `$${value.toLocaleString()}`,
  },
  parameters: {
    docs: {
      description: {
        story: 'Monthly revenue chart with custom colors and formatted tooltips.',
      },
    },
  },
};

export const CustomColors: Story = {
  args: {
    data: weeklyData,
    height: 100,
    highlightIndex: 3,
    barColor: '#fcd34d',
    highlightColor: '#f59e0b',
  },
  parameters: {
    docs: {
      description: {
        story: 'Chart with custom color scheme (amber/yellow).',
      },
    },
  },
};

export const NoLabels: Story = {
  args: {
    data: hourlyData,
    height: 60,
    showLabels: false,
    highlightIndex: 6,
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact chart without X-axis labels, useful for small spaces.',
      },
    },
  },
};

export const MiniChart: Story = {
  args: {
    data: hourlyData.slice(0, 7),
    height: 40,
    showLabels: false,
    maxBarSize: 12,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 150, padding: 10, background: '#fff', borderRadius: 8 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Mini sparkline-style chart for dashboard cards.',
      },
    },
  },
};

export const LargeChart: Story = {
  args: {
    data: monthlyData,
    height: 250,
    highlightIndex: 5,
    maxBarSize: 60,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 600, padding: 20, background: '#fff', borderRadius: 8 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Large chart for detailed data visualization.',
      },
    },
  },
};
