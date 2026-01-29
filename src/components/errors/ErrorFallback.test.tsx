import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfigProvider } from 'antd';
import { ErrorFallback } from './ErrorFallback';
import { lightTheme } from '@lib/antd/theme';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ConfigProvider theme={lightTheme}>{ui}</ConfigProvider>);
};

describe('ErrorFallback', () => {
  it('renders alert role for accessibility', () => {
    renderWithTheme(<ErrorFallback error={null} />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('displays default error message when error is null', () => {
    renderWithTheme(<ErrorFallback error={null} />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('An unexpected error occurred')).toBeInTheDocument();
  });

  it('displays error message from error object', () => {
    const error = new Error('Custom error message');
    renderWithTheme(<ErrorFallback error={error} />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Custom error message')).toBeInTheDocument();
  });

  it('renders Try again button when resetError is provided', () => {
    const handleReset = vi.fn();
    renderWithTheme(<ErrorFallback error={null} resetError={handleReset} />);
    expect(
      screen.getByRole('button', { name: 'Try again' })
    ).toBeInTheDocument();
  });

  it('does not render Try again button when resetError is not provided', () => {
    renderWithTheme(<ErrorFallback error={null} />);
    expect(
      screen.queryByRole('button', { name: 'Try again' })
    ).not.toBeInTheDocument();
  });

  it('calls resetError when Try again button is clicked', async () => {
    const user = userEvent.setup();
    const handleReset = vi.fn();
    renderWithTheme(<ErrorFallback error={null} resetError={handleReset} />);

    await user.click(screen.getByRole('button', { name: 'Try again' }));
    expect(handleReset).toHaveBeenCalledTimes(1);
  });

  it('renders error icon', () => {
    const { container } = renderWithTheme(<ErrorFallback error={null} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders title', () => {
    renderWithTheme(<ErrorFallback error={null} />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Something went wrong');
  });

  it('displays empty error message gracefully', () => {
    const error = new Error('');
    renderWithTheme(<ErrorFallback error={error} />);
    // When error message is empty string, it should show that empty string
    // or fall back to default - let's check what actually renders
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('handles error with complex message', () => {
    const error = new Error(
      'Network error: Failed to fetch data from https://api.example.com/users'
    );
    renderWithTheme(<ErrorFallback error={error} />);
    expect(
      screen.getByText(
        'Network error: Failed to fetch data from https://api.example.com/users'
      )
    ).toBeInTheDocument();
  });

  it('applies container class', () => {
    const { container } = renderWithTheme(<ErrorFallback error={null} />);
    const alertContainer = container.querySelector('[role="alert"]');
    expect(alertContainer?.className).toMatch(/container/i);
  });

  it('applies content class', () => {
    const { container } = renderWithTheme(<ErrorFallback error={null} />);
    // Check that content wrapper exists
    const contentElement = container.querySelector('[role="alert"] > div');
    expect(contentElement?.className).toMatch(/content/i);
  });

  it('renders as primary button type', () => {
    const handleReset = vi.fn();
    renderWithTheme(<ErrorFallback error={null} resetError={handleReset} />);
    const button = screen.getByRole('button', { name: 'Try again' });
    expect(button).toHaveClass('ant-btn-primary');
  });
});
