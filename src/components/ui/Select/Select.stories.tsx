import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta = {
  title: 'UI/Select',
  component: Select,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
];

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'cn', label: 'China' },
];

export const Default: Story = {
  args: {
    label: 'Framework',
    placeholder: 'Select a framework',
    options,
  },
};

export const WithValue: Story = {
  args: {
    label: 'Framework',
    placeholder: 'Select a framework',
    options,
    defaultValue: 'react',
  },
};

export const Multiple: Story = {
  args: {
    label: 'Skills',
    placeholder: 'Select multiple skills',
    mode: 'multiple',
    options,
  },
};

export const WithSearch: Story = {
  args: {
    label: 'Country',
    placeholder: 'Search for a country',
    showSearch: true,
    options: countries,
    filterOption: (input, option) =>
      String(option?.label ?? '').toLowerCase().includes(input.toLowerCase()),
  },
};

export const WithError: Story = {
  args: {
    label: 'Framework',
    placeholder: 'Select a framework',
    options,
    error: 'This field is required',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Framework',
    placeholder: 'Select a framework',
    options,
    helperText: 'Choose your preferred framework',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Framework',
    placeholder: 'Select a framework',
    options,
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    label: 'Framework',
    placeholder: 'Loading...',
    options,
    loading: true,
  },
};

export const Clearable: Story = {
  args: {
    label: 'Framework',
    placeholder: 'Select a framework',
    options,
    allowClear: true,
    defaultValue: 'react',
  },
};

export const Tags: Story = {
  args: {
    label: 'Tags',
    placeholder: 'Enter tags',
    mode: 'tags',
    options,
  },
};

export const Small: Story = {
  args: {
    label: 'Framework',
    placeholder: 'Select a framework',
    options,
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    label: 'Framework',
    placeholder: 'Select a framework',
    options,
    size: 'large',
  },
};

export const NotFullWidth: Story = {
  args: {
    label: 'Framework',
    placeholder: 'Select a framework',
    options,
    fullWidth: false,
    style: { width: 200 },
  },
};
