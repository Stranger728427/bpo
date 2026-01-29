import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfigProvider } from 'antd';
import { Input } from './Input';
import { lightTheme } from '@lib/antd/theme';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ConfigProvider theme={lightTheme}>{ui}</ConfigProvider>);
};

describe('Input', () => {
  it('renders correctly', () => {
    renderWithTheme(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('renders label correctly', () => {
    renderWithTheme(<Input label="Email" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('shows error message', () => {
    renderWithTheme(<Input error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('shows helper text when no error', () => {
    renderWithTheme(<Input helperText="Enter a valid email" />);
    expect(screen.getByText('Enter a valid email')).toBeInTheDocument();
  });

  it('hides helper text when error is present', () => {
    renderWithTheme(
      <Input helperText="Enter a valid email" error="Invalid email" />
    );
    expect(screen.queryByText('Enter a valid email')).not.toBeInTheDocument();
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('handles value changes', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    renderWithTheme(
      <Input placeholder="Enter text" onChange={handleChange} />
    );

    const input = screen.getByPlaceholderText('Enter text');
    await user.type(input, 'Hello');

    expect(handleChange).toHaveBeenCalled();
  });

  it('can be disabled', () => {
    renderWithTheme(<Input placeholder="Disabled" disabled />);
    expect(screen.getByPlaceholderText('Disabled')).toBeDisabled();
  });

  it('applies fullWidth class by default', () => {
    const { container } = renderWithTheme(<Input />);
    // Check wrapper has fullWidth class (CSS modules transform names)
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toMatch(/fullWidth/i);
  });

  it('does not apply fullWidth when set to false', () => {
    const { container } = renderWithTheme(<Input fullWidth={false} />);
    // Check wrapper does not have fullWidth class
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).not.toMatch(/fullWidth/i);
  });

  it('applies error status to input', () => {
    renderWithTheme(<Input error="Error" placeholder="test" />);
    const input = screen.getByPlaceholderText('test');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });
});
