import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfigProvider } from 'antd';
import { Modal } from './Modal';
import { lightTheme } from '@lib/antd/theme';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ConfigProvider theme={lightTheme}>{ui}</ConfigProvider>);
};

describe('Modal', () => {
  it('renders when isOpen is true', () => {
    renderWithTheme(
      <Modal isOpen title="Test Modal">
        Modal content
      </Modal>
    );
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    renderWithTheme(
      <Modal isOpen={false} title="Test Modal">
        Modal content
      </Modal>
    );
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
  });

  it('calls onCancel when cancel button is clicked', async () => {
    const user = userEvent.setup();
    const handleCancel = vi.fn();

    renderWithTheme(
      <Modal isOpen title="Test Modal" onCancel={handleCancel}>
        Modal content
      </Modal>
    );

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);

    expect(handleCancel).toHaveBeenCalled();
  });

  it('calls onOk when OK button is clicked', async () => {
    const user = userEvent.setup();
    const handleOk = vi.fn();

    renderWithTheme(
      <Modal isOpen title="Test Modal" onOk={handleOk}>
        Modal content
      </Modal>
    );

    const okButton = screen.getByRole('button', { name: /ok/i });
    await user.click(okButton);

    expect(handleOk).toHaveBeenCalled();
  });

  it('renders custom footer', () => {
    renderWithTheme(
      <Modal
        isOpen
        title="Test Modal"
        footer={<button>Custom Action</button>}
      >
        Modal content
      </Modal>
    );

    expect(
      screen.getByRole('button', { name: 'Custom Action' })
    ).toBeInTheDocument();
  });

  it('renders without footer when footer is null', () => {
    renderWithTheme(
      <Modal isOpen title="Test Modal" footer={null}>
        Modal content
      </Modal>
    );

    expect(screen.queryByRole('button', { name: /ok/i })).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /cancel/i })
    ).not.toBeInTheDocument();
  });

  it('uses open prop as fallback for isOpen', () => {
    renderWithTheme(
      <Modal open title="Test Modal">
        Modal content
      </Modal>
    );
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
  });
});
