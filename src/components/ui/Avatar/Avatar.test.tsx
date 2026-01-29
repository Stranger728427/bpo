import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ConfigProvider } from 'antd';
import { Avatar } from './Avatar';
import { UserOutlined } from '@ant-design/icons';
import { lightTheme } from '@lib/antd/theme';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ConfigProvider theme={lightTheme}>{ui}</ConfigProvider>);
};

describe('Avatar', () => {
  it('renders with text content', () => {
    renderWithTheme(<Avatar>JD</Avatar>);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders with image source', () => {
    renderWithTheme(<Avatar src="https://example.com/avatar.jpg" alt="User" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('renders with icon', () => {
    const { container } = renderWithTheme(<Avatar icon={<UserOutlined />} />);
    expect(container.querySelector('.anticon-user')).toBeInTheDocument();
  });

  it('applies small size', () => {
    const { container } = renderWithTheme(<Avatar size="small">JD</Avatar>);
    expect(container.querySelector('.ant-avatar-sm')).toBeInTheDocument();
  });

  it('applies large size', () => {
    const { container } = renderWithTheme(<Avatar size="large">JD</Avatar>);
    expect(container.querySelector('.ant-avatar-lg')).toBeInTheDocument();
  });

  it('applies custom size', () => {
    const { container } = renderWithTheme(<Avatar size={64}>JD</Avatar>);
    const avatar = container.querySelector('.ant-avatar');
    expect(avatar).toBeInTheDocument();
  });

  it('applies square shape', () => {
    const { container } = renderWithTheme(<Avatar shape="square">JD</Avatar>);
    expect(container.querySelector('.ant-avatar-square')).toBeInTheDocument();
  });

  it('shows online status indicator', () => {
    renderWithTheme(
      <Avatar status="online" showStatus>
        JD
      </Avatar>
    );
    const statusIndicator = screen.getByLabelText('Status: online');
    expect(statusIndicator).toBeInTheDocument();
  });

  it('shows offline status indicator', () => {
    renderWithTheme(
      <Avatar status="offline" showStatus>
        JD
      </Avatar>
    );
    const statusIndicator = screen.getByLabelText('Status: offline');
    expect(statusIndicator).toBeInTheDocument();
  });

  it('shows away status indicator', () => {
    renderWithTheme(
      <Avatar status="away" showStatus>
        JD
      </Avatar>
    );
    const statusIndicator = screen.getByLabelText('Status: away');
    expect(statusIndicator).toBeInTheDocument();
  });

  it('shows busy status indicator', () => {
    renderWithTheme(
      <Avatar status="busy" showStatus>
        JD
      </Avatar>
    );
    const statusIndicator = screen.getByLabelText('Status: busy');
    expect(statusIndicator).toBeInTheDocument();
  });

  it('does not show status indicator when showStatus is false', () => {
    renderWithTheme(
      <Avatar status="online" showStatus={false}>
        JD
      </Avatar>
    );
    const statusIndicator = screen.queryByLabelText('Status: online');
    expect(statusIndicator).not.toBeInTheDocument();
  });

  it('renders avatar group', () => {
    const { container } = renderWithTheme(
      <Avatar.Group>
        <Avatar>JD</Avatar>
        <Avatar>JS</Avatar>
        <Avatar>AB</Avatar>
      </Avatar.Group>
    );
    expect(container.querySelector('.ant-avatar-group')).toBeInTheDocument();
  });
});
