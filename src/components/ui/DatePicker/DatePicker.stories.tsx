import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';
import dayjs from 'dayjs';

const meta = {
  title: 'UI/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Select Date',
    placeholder: 'Select a date',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Birth Date',
    placeholder: 'Select a date',
    defaultValue: dayjs('2000-01-01'),
  },
};

export const WithTime: Story = {
  args: {
    label: 'Event Date & Time',
    placeholder: 'Select date and time',
    showTime: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Date',
    placeholder: 'Select a date',
    error: 'This field is required',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Appointment Date',
    placeholder: 'Select a date',
    helperText: 'Please select your preferred appointment date',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Date',
    placeholder: 'Select a date',
    disabled: true,
  },
};

export const DisabledDates: Story = {
  args: {
    label: 'Weekdays Only',
    placeholder: 'Select a weekday',
    disabledDate: (current) => {
      // Disable weekends
      return current && (current.day() === 0 || current.day() === 6);
    },
  },
};

export const Small: Story = {
  args: {
    label: 'Date',
    placeholder: 'Select a date',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    label: 'Date',
    placeholder: 'Select a date',
    size: 'large',
  },
};

export const NotFullWidth: Story = {
  args: {
    label: 'Date',
    placeholder: 'Select a date',
    fullWidth: false,
    style: { width: 200 },
  },
};

export const MonthPicker: Story = {
  args: {
    label: 'Select Month',
    placeholder: 'Select a month',
    picker: 'month',
  },
};

export const YearPicker: Story = {
  args: {
    label: 'Select Year',
    placeholder: 'Select a year',
    picker: 'year',
  },
};

export const WeekPicker: Story = {
  args: {
    label: 'Select Week',
    placeholder: 'Select a week',
    picker: 'week',
  },
};
