import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfigProvider } from 'antd';
import { Drawer } from './Drawer';
import { lightTheme } from '@lib/antd/theme';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ConfigProvider theme={lightTheme}>{ui}</ConfigProvider>);
};

describe('Drawer', () => {
  it('renders when isOpen is true', () => {
    renderWithTheme(
      <Drawer isOpen title="Test Drawer">
        Drawer content
      </Drawer>
    );
    expect(screen.getByText('Test Drawer')).toBeInTheDocument();
    expect(screen.getByText('Drawer content')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    renderWithTheme(
      <Drawer isOpen={false} title="Test Drawer">
        Drawer content
      </Drawer>
    );
    expect(screen.queryByText('Test Drawer')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    renderWithTheme(
      <Drawer isOpen onClose={handleClose} title="Test Drawer">
        Content
      </Drawer>
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);

    expect(handleClose).toHaveBeenCalled();
  });

  it('uses open prop when isOpen is not provided', () => {
    renderWithTheme(
      <Drawer open title="Test Drawer">
        Content
      </Drawer>
    );
    expect(screen.getByText('Test Drawer')).toBeInTheDocument();
  });

  it('renders with different placements', () => {
    const { rerender } = renderWithTheme(
      <Drawer isOpen placement="left" title="Left Drawer">
        Content
      </Drawer>
    );
    expect(screen.getByText('Left Drawer')).toBeInTheDocument();

    rerender(
      <ConfigProvider theme={lightTheme}>
        <Drawer isOpen placement="right" title="Right Drawer">
          Content
        </Drawer>
      </ConfigProvider>
    );
    expect(screen.getByText('Right Drawer')).toBeInTheDocument();
  });

  it('renders footer when provided', () => {
    renderWithTheme(
      <Drawer isOpen title="Test Drawer" footer={<div>Footer content</div>}>
        Content
      </Drawer>
    );
    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });

  it('applies size preset for width', () => {
    renderWithTheme(
      <Drawer isOpen size="sm" title="Small Drawer">
        Content
      </Drawer>
    );
    // Just verify the drawer renders with the size prop
    expect(screen.getByText('Small Drawer')).toBeInTheDocument();
  });
});
