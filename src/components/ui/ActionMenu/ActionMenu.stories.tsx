import type { Meta, StoryObj } from '@storybook/react';
import { ActionMenu } from './ActionMenu';

const meta = {
  title: 'UI/ActionMenu',
  component: ActionMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ActionMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { key: 'view', label: 'View Details', onClick: () => console.log('View') },
      { key: 'edit', label: 'Edit', onClick: () => console.log('Edit') },
      { key: 'resume', label: 'Resume', onClick: () => console.log('Resume') },
      { key: 'end', label: 'End', danger: true, onClick: () => console.log('End') },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      {
        key: 'view',
        label: 'View Details',
        icon: (
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M1 8C1 8 3.5 3 8 3C12.5 3 15 8 15 8C15 8 12.5 13 8 13C3.5 13 1 8 1 8Z" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        ),
        onClick: () => console.log('View'),
      },
      {
        key: 'edit',
        label: 'Edit',
        icon: (
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        ),
        onClick: () => console.log('Edit'),
      },
      {
        key: 'delete',
        label: 'Delete',
        danger: true,
        icon: (
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M2 4H14M5 4V3C5 2.44772 5.44772 2 6 2H10C10.5523 2 11 2.44772 11 3V4M12 4V13C12 13.5523 11.5523 14 11 14H5C4.44772 14 4 13.5523 4 13V4H12Z" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        ),
        onClick: () => console.log('Delete'),
      },
    ],
  },
};
