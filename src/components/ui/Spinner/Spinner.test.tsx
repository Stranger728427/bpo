import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ConfigProvider } from 'antd';
import { Spinner } from './Spinner';
import { lightTheme } from '@lib/antd/theme';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ConfigProvider theme={lightTheme}>{ui}</ConfigProvider>);
};

describe('Spinner', () => {
  it('renders correctly', () => {
    renderWithTheme(<Spinner />);
    expect(document.querySelector('.ant-spin')).toBeInTheDocument();
  });

  it('applies small size', () => {
    renderWithTheme(<Spinner size="sm" />);
    expect(document.querySelector('.ant-spin-sm')).toBeInTheDocument();
  });

  it('applies large size', () => {
    renderWithTheme(<Spinner size="lg" />);
    expect(document.querySelector('.ant-spin-lg')).toBeInTheDocument();
  });

  it('renders in fullscreen mode', () => {
    const { container } = renderWithTheme(<Spinner fullScreen />);
    // Check fullScreen class exists (CSS modules transform names)
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toMatch(/fullScreen/i);
  });

  it('renders with tip prop in fullscreen mode', () => {
    // antd Spin tip requires wrapping children to display
    // This test just verifies the component renders without errors
    const { container } = renderWithTheme(
      <Spinner fullScreen tip="Loading data..." />
    );
    expect(container.querySelector('.ant-spin')).toBeInTheDocument();
  });
});
