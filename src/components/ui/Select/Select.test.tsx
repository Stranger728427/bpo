import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfigProvider } from 'antd';
import { Select } from './Select';
import { lightTheme } from '@lib/antd/theme';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ConfigProvider theme={lightTheme}>{ui}</ConfigProvider>);
};

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
];

describe('Select', () => {
  it('renders correctly', () => {
    renderWithTheme(<Select placeholder="Select..." options={options} />);
    expect(screen.getByText('Select...')).toBeInTheDocument();
  });

  it('renders label correctly', () => {
    renderWithTheme(
      <Select label="Framework" placeholder="Select..." options={options} />
    );
    expect(screen.getByText('Framework')).toBeInTheDocument();
  });

  it('shows error message', () => {
    renderWithTheme(
      <Select
        label="Framework"
        error="This field is required"
        options={options}
      />
    );
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('shows helper text when no error', () => {
    renderWithTheme(
      <Select
        label="Framework"
        helperText="Choose your framework"
        options={options}
      />
    );
    expect(screen.getByText('Choose your framework')).toBeInTheDocument();
  });

  it('hides helper text when error is present', () => {
    renderWithTheme(
      <Select
        label="Framework"
        helperText="Choose your framework"
        error="Required"
        options={options}
      />
    );
    expect(screen.queryByText('Choose your framework')).not.toBeInTheDocument();
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('opens dropdown when clicked', async () => {
    const user = userEvent.setup();
    const { container } = renderWithTheme(<Select placeholder="Select..." options={options} />);

    const selectSelector = container.querySelector('.ant-select-selector');
    if (selectSelector) {
      await user.click(selectSelector);

      await waitFor(() => {
        expect(screen.getByText('React')).toBeInTheDocument();
      });
      expect(screen.getByText('Vue')).toBeInTheDocument();
      expect(screen.getByText('Angular')).toBeInTheDocument();
    }
  });

  it('calls onChange when option is selected', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    const { container } = renderWithTheme(
      <Select
        placeholder="Select..."
        options={options}
        onChange={handleChange}
      />
    );

    const selectSelector = container.querySelector('.ant-select-selector');
    if (selectSelector) {
      await user.click(selectSelector);

      await waitFor(() => {
        expect(screen.getByText('React')).toBeInTheDocument();
      });

      const reactOption = screen.getByText('React');
      await user.click(reactOption);

      expect(handleChange).toHaveBeenCalledWith('react', expect.anything());
    }
  });

  it('can be disabled', () => {
    const { container } = renderWithTheme(
      <Select placeholder="Disabled" disabled options={options} />
    );
    const select = container.querySelector('.ant-select-disabled');
    expect(select).toBeInTheDocument();
  });

  it('applies fullWidth class by default', () => {
    const { container } = renderWithTheme(
      <Select placeholder="Select..." options={options} />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toMatch(/fullWidth/i);
  });

  it('does not apply fullWidth when set to false', () => {
    const { container } = renderWithTheme(
      <Select fullWidth={false} placeholder="Select..." options={options} />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).not.toMatch(/fullWidth/i);
  });

  it('applies error status to select', () => {
    const { container } = renderWithTheme(
      <Select error="Error" placeholder="Select..." options={options} />
    );
    const select = container.querySelector('.ant-select-status-error');
    expect(select).toBeInTheDocument();
  });
});
