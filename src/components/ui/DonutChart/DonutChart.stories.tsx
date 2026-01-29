import type { Meta, StoryObj } from '@storybook/react';
import { DonutChart } from './DonutChart';

const meta = {
  title: 'UI/Charts/DonutChart',
  component: DonutChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A donut/ring chart component for displaying progress or proportions. Features center content, tooltips, and customizable colors.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 500, step: 10 },
      description: 'Current value (filled portion)',
    },
    total: {
      control: { type: 'range', min: 100, max: 1000, step: 50 },
      description: 'Total value (determines proportion)',
    },
    centerLabel: {
      control: 'text',
      description: 'Label shown below center value',
    },
    centerValue: {
      control: 'text',
      description: 'Override the center display value',
    },
    size: {
      control: { type: 'range', min: 60, max: 200, step: 10 },
      description: 'Chart size in pixels',
    },
    strokeWidth: {
      control: { type: 'range', min: 4, max: 24, step: 2 },
      description: 'Ring thickness',
    },
    primaryColor: {
      control: 'color',
      description: 'Color of the filled portion',
    },
    secondaryColor: {
      control: 'color',
      description: 'Color of the remaining portion',
    },
  },
} satisfies Meta<typeof DonutChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 112,
    total: 500,
    centerValue: 112,
    centerLabel: 'Today',
  },
};

export const HalfFilled: Story = {
  args: {
    value: 250,
    total: 500,
    centerLabel: 'Progress',
  },
  parameters: {
    docs: {
      description: {
        story: 'Chart showing 50% completion.',
      },
    },
  },
};

export const AlmostComplete: Story = {
  args: {
    value: 450,
    total: 500,
    centerLabel: 'Complete',
  },
  parameters: {
    docs: {
      description: {
        story: 'Chart showing 90% completion.',
      },
    },
  },
};

export const PercentageDisplay: Story = {
  args: {
    value: 75,
    total: 100,
    centerValue: '75%',
    centerLabel: 'Score',
  },
  parameters: {
    docs: {
      description: {
        story: 'Display percentage as center value.',
      },
    },
  },
};

export const SuccessColors: Story = {
  args: {
    value: 85,
    total: 100,
    centerValue: '85%',
    centerLabel: 'Health',
    primaryColor: '#22c55e',
    secondaryColor: '#bbf7d0',
  },
  parameters: {
    docs: {
      description: {
        story: 'Green color scheme for success/health indicators.',
      },
    },
  },
};

export const WarningColors: Story = {
  args: {
    value: 45,
    total: 100,
    centerValue: '45%',
    centerLabel: 'Storage',
    primaryColor: '#f59e0b',
    secondaryColor: '#fef3c7',
  },
  parameters: {
    docs: {
      description: {
        story: 'Amber color scheme for warning indicators.',
      },
    },
  },
};

export const DangerColors: Story = {
  args: {
    value: 15,
    total: 100,
    centerValue: '15%',
    centerLabel: 'Battery',
    primaryColor: '#ef4444',
    secondaryColor: '#fee2e2',
  },
  parameters: {
    docs: {
      description: {
        story: 'Red color scheme for danger/critical indicators.',
      },
    },
  },
};

export const LargeSize: Story = {
  args: {
    value: 112,
    total: 500,
    centerLabel: 'Credits',
    size: 180,
    strokeWidth: 20,
  },
  parameters: {
    docs: {
      description: {
        story: 'Large chart with thicker ring for prominent display.',
      },
    },
  },
};

export const SmallSize: Story = {
  args: {
    value: 75,
    total: 100,
    centerValue: '75',
    centerLabel: '%',
    size: 80,
    strokeWidth: 8,
  },
  parameters: {
    docs: {
      description: {
        story: 'Small compact chart for dashboard widgets.',
      },
    },
  },
};

export const ThinRing: Story = {
  args: {
    value: 300,
    total: 500,
    centerLabel: 'Used',
    size: 140,
    strokeWidth: 6,
  },
  parameters: {
    docs: {
      description: {
        story: 'Thin ring style for a more minimal look.',
      },
    },
  },
};

export const ThickRing: Story = {
  args: {
    value: 300,
    total: 500,
    centerLabel: 'Used',
    size: 140,
    strokeWidth: 24,
  },
  parameters: {
    docs: {
      description: {
        story: 'Thick ring style for a bolder look.',
      },
    },
  },
};

export const BlueTheme: Story = {
  args: {
    value: 65,
    total: 100,
    centerValue: '65%',
    centerLabel: 'Progress',
    primaryColor: '#3b82f6',
    secondaryColor: '#dbeafe',
  },
  parameters: {
    docs: {
      description: {
        story: 'Blue color scheme.',
      },
    },
  },
};
