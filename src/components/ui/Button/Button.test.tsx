import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfigProvider } from 'antd';
import { Button } from './Button';
import { lightTheme } from '@lib/antd/theme';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ConfigProvider theme={lightTheme}>{ui}</ConfigProvider>);
};

describe('Button', () => {
  it('renders children correctly', () => {
    renderWithTheme(<Button>Click me</Button>);
    expect(
      screen.getByRole('button', { name: /click me/i })
    ).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    renderWithTheme(<Button onClick={handleClick}>Click me</Button>);
    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    renderWithTheme(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows loading state', () => {
    renderWithTheme(<Button loading>Loading</Button>);
    expect(screen.getByRole('button')).toHaveClass('ant-btn-loading');
  });

  it('applies primary type', () => {
    renderWithTheme(<Button type="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('ant-btn-primary');
  });

  it('applies danger style', () => {
    renderWithTheme(
      <Button type="primary" danger>
        Danger
      </Button>
    );
    expect(screen.getByRole('button')).toHaveClass('ant-btn-dangerous');
  });

  it('applies fullWidth/block when fullWidth is true', () => {
    renderWithTheme(<Button fullWidth>Full Width</Button>);
    // antd sets block class when fullWidth is true
    expect(screen.getByRole('button')).toHaveClass('ant-btn-block');
  });

  it('applies different sizes', () => {
    const { rerender } = renderWithTheme(<Button size="small">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('ant-btn-sm');

    rerender(
      <ConfigProvider theme={lightTheme}>
        <Button size="large">Large</Button>
      </ConfigProvider>
    );
    expect(screen.getByRole('button')).toHaveClass('ant-btn-lg');
  });
});
