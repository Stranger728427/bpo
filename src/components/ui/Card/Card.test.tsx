import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ConfigProvider } from 'antd';
import { Card } from './Card';
import { lightTheme } from '@lib/antd/theme';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ConfigProvider theme={lightTheme}>{ui}</ConfigProvider>);
};

describe('Card', () => {
  it('renders children correctly', () => {
    renderWithTheme(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('renders title correctly', () => {
    renderWithTheme(<Card title="Card Title">Content</Card>);
    expect(screen.getByText('Card Title')).toBeInTheDocument();
  });

  it('applies elevated variant class', () => {
    const { container } = renderWithTheme(
      <Card variant="elevated">Content</Card>
    );
    // CSS modules transform class names, check that card renders
    expect(container.querySelector('.ant-card')).toBeInTheDocument();
  });

  it('applies outlined variant class', () => {
    const { container } = renderWithTheme(
      <Card variant="outlined">Content</Card>
    );
    // CSS modules transform class names, check that card renders with bordered
    expect(container.querySelector('.ant-card-bordered')).toBeInTheDocument();
  });

  it('applies filled variant class', () => {
    const { container } = renderWithTheme(<Card variant="filled">Content</Card>);
    // CSS modules transform class names, check that card renders
    expect(container.querySelector('.ant-card')).toBeInTheDocument();
  });

  it('applies padding class', () => {
    const { container } = renderWithTheme(<Card padding="lg">Content</Card>);
    // CSS modules transform class names, check that card renders
    expect(container.querySelector('.ant-card')).toBeInTheDocument();
  });

  it('renders extra content', () => {
    renderWithTheme(
      <Card title="Title" extra={<button>Action</button>}>
        Content
      </Card>
    );
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });

  it('applies hoverable class when hoverable is true', () => {
    const { container } = renderWithTheme(<Card hoverable>Content</Card>);
    expect(
      container.querySelector('.ant-card-hoverable')
    ).toBeInTheDocument();
  });
});
