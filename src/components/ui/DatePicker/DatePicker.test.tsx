import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfigProvider } from 'antd';
import { DatePicker } from './DatePicker';
import { lightTheme } from '@lib/antd/theme';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ConfigProvider theme={lightTheme}>{ui}</ConfigProvider>);
};

describe('DatePicker', () => {
  it('renders correctly', () => {
    renderWithTheme(<DatePicker placeholder="Select date" />);
    expect(screen.getByPlaceholderText('Select date')).toBeInTheDocument();
  });

  it('renders label correctly', () => {
    renderWithTheme(
      <DatePicker label="Birth Date" placeholder="Select date" />
    );
    expect(screen.getByText('Birth Date')).toBeInTheDocument();
  });

  it('shows error message', () => {
    renderWithTheme(
      <DatePicker
        label="Date"
        error="This field is required"
        placeholder="Select date"
      />
    );
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('shows helper text when no error', () => {
    renderWithTheme(
      <DatePicker
        label="Date"
        helperText="Select your preferred date"
        placeholder="Select date"
      />
    );
    expect(
      screen.getByText('Select your preferred date')
    ).toBeInTheDocument();
  });

  it('hides helper text when error is present', () => {
    renderWithTheme(
      <DatePicker
        label="Date"
        helperText="Select your preferred date"
        error="Required"
        placeholder="Select date"
      />
    );
    expect(
      screen.queryByText('Select your preferred date')
    ).not.toBeInTheDocument();
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('opens calendar when clicked', async () => {
    const user = userEvent.setup();
    renderWithTheme(<DatePicker placeholder="Select date" />);

    const input = screen.getByPlaceholderText('Select date');
    await user.click(input);

    // Check if calendar popup is visible
    const calendar = document.querySelector('.ant-picker-dropdown');
    expect(calendar).toBeInTheDocument();
  });

  it('calls onChange when date is selected', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    renderWithTheme(
      <DatePicker placeholder="Select date" onChange={handleChange} />
    );

    const input = screen.getByPlaceholderText('Select date');
    await user.click(input);

    // Find and click today's date
    const today = document.querySelector('.ant-picker-cell-today');
    if (today) {
      await user.click(today);
      expect(handleChange).toHaveBeenCalled();
    }
  });

  it('can be disabled', () => {
    const { container } = renderWithTheme(
      <DatePicker placeholder="Disabled" disabled />
    );
    const input = container.querySelector('.ant-picker-input input');
    expect(input).toBeDisabled();
  });

  it('applies fullWidth class by default', () => {
    const { container } = renderWithTheme(
      <DatePicker placeholder="Select date" />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toMatch(/fullWidth/i);
  });

  it('does not apply fullWidth when set to false', () => {
    const { container } = renderWithTheme(
      <DatePicker fullWidth={false} placeholder="Select date" />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).not.toMatch(/fullWidth/i);
  });

  it('applies error status to picker', () => {
    const { container } = renderWithTheme(
      <DatePicker error="Error" placeholder="Select date" />
    );
    const picker = container.querySelector('.ant-picker-status-error');
    expect(picker).toBeInTheDocument();
  });
});
