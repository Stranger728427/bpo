import type { Meta, StoryObj } from '@storybook/react';
import { DetailDrawer, StatusBadge } from './DetailDrawer';

const meta = {
  title: 'UI/DetailDrawer',
  component: DetailDrawer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
    },
    width: {
      control: { type: 'number', min: 300, max: 600 },
    },
  },
} satisfies Meta<typeof DetailDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockTranscript = [
  {
    id: '1',
    speaker: 'ai' as const,
    timestamp: '3:48',
    duration: '00:01',
    message: 'Thank you for calling Accident Centers of Texas. This is Riley. Which language would you like to continue in, English or Spanish?',
  },
  {
    id: '2',
    speaker: 'caller' as const,
    timestamp: '3:48',
    duration: '00:01',
    message: 'Thank you for calling Accident Centers of Texas. This is Riley. Which language would you like to continue in, English or Spanish?',
  },
];

const mockInfoFields = [
  { label: 'Campaign Name', value: 'New User Onboarding' },
  { label: 'Call Status', value: <StatusBadge variant="success">Interested</StatusBadge> },
  { label: 'Customer Phone', value: '+1 98765 12345' },
  { label: 'Customer Name', value: 'Sabrina Carpenter' },
  { label: 'Timestamp', value: '08/06/2025, 03:48:44' },
  { label: 'Call Cost', value: '$ 0.5439' },
];

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Close clicked'),
    title: 'Details',
    infoFields: mockInfoFields,
    transcript: mockTranscript,
    callSummary:
      'The call began with an AI offering language selection, to which the user chose Spanish. The user identified themselves as a new patient, and the AI offered to schedule an appointment, asking for their full name. The call ended before the user could provide their name.',

    notes: [
      {
        id: 1,
        speaker: 'ai',
        timestamp: '08/06/2025, 09:00 AM',
        message:
          'Thank you for calling Accident Centers of Texas. This is Riley. Which language would you like to continue in, English or Spanish?',
      },
      {
        id: 2,
        speaker: 'user',
        timestamp: '08/06/2025, 09:01 AM',
        message: 'English please.',
      },
    ],

    currentTime: 2.53,
    totalTime: 4.0,
  },
}

export const EmptyTranscript: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Close clicked'),
    title: 'Details',
    infoFields: mockInfoFields,
    transcript: [],
    callSummary: '',
    notes: [],
    currentTime: 0,
    totalTime: 4.0,
  },
};

export const WideDrawer: Story = {
  args: {
    ...Default.args,
    width: 500,
  },
};
