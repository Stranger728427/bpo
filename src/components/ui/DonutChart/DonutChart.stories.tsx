import type { Meta, StoryObj } from '@storybook/react';
import { DonutChart } from './DonutChart';

const createData = (
  value: number,
  total: number,
  primaryColor = '#3b82f6',
  secondaryColor = '#e5e7eb'
) => [
  { name: 'Value', value, fill: primaryColor },
  { name: 'Remaining', value: total - value, fill: secondaryColor },
];

const meta = {
  title: 'UI/Charts/DonutChart',
  component: DonutChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A donut/ring chart component for displaying proportions with customizable center content.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    centerLabel: { control: 'text' },
    centerValue: { control: 'text' },
    size: {
      control: { type: 'range', min: 60, max: 200, step: 10 },
    },
    strokeWidth: {
      control: { type: 'range', min: 4, max: 24, step: 2 },
    },
  },
} satisfies Meta<typeof DonutChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: createData(112, 500),
    centerValue: 112,
    centerLabel: 'Today',
  },
};

export const HalfFilled: Story = {
  args: {
    data: createData(250, 500),
    centerLabel: 'Progress',
  },
};

export const AlmostComplete: Story = {
  args: {
    data: createData(450, 500),
    centerLabel: 'Complete',
  },
};

export const PercentageDisplay: Story = {
  args: {
    data: createData(75, 100),
    centerValue: '75%',
    centerLabel: 'Score',
  },
};

export const SuccessColors: Story = {
  args: {
    data: createData(85, 100, '#22c55e', '#bbf7d0'),
    centerValue: '85%',
    centerLabel: 'Health',
  },
};

export const WarningColors: Story = {
  args: {
    data: createData(45, 100, '#f59e0b', '#fef3c7'),
    centerValue: '45%',
    centerLabel: 'Storage',
  },
};

export const DangerColors: Story = {
  args: {
    data: createData(15, 100, '#ef4444', '#fee2e2'),
    centerValue: '15%',
    centerLabel: 'Battery',
  },
};

export const LargeSize: Story = {
  args: {
    data: createData(112, 500),
    centerLabel: 'Credits',
    size: 180,
    strokeWidth: 20,
  },
};

export const SmallSize: Story = {
  args: {
    data: createData(75, 100),
    centerValue: '75',
    centerLabel: '%',
    size: 80,
    strokeWidth: 8,
  },
};

export const ThinRing: Story = {
  args: {
    data: createData(300, 500),
    centerLabel: 'Used',
    size: 140,
    strokeWidth: 6,
  },
};

export const ThickRing: Story = {
  args: {
    data: createData(300, 500),
    centerLabel: 'Used',
    size: 140,
    strokeWidth: 24,
  },
};

export const BlueTheme: Story = {
  args: {
    data: createData(65, 100, '#3b82f6', '#dbeafe'),
    centerValue: '65%',
    centerLabel: 'Progress',
  },
};