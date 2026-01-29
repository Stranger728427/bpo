import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfigProvider } from 'antd';
import { Dropdown } from './Dropdown';
import { Button } from '../Button/Button';
import { lightTheme } from '@lib/antd/theme';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ConfigProvider theme={lightTheme}>{ui}</ConfigProvider>);
};

const items = [
  { key: '1', label: 'Option 1' },
  { key: '2', label: 'Option 2' },
  { key: '3', label: 'Option 3' },
];

describe('Dropdown', () => {
  it('renders trigger element', () => {
    renderWithTheme(
      <Dropdown items={items}>
        <Button>Click me</Button>
      </Dropdown>
    );
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('shows menu items when clicked', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <Dropdown items={items}>
        <Button>Click me</Button>
      </Dropdown>
    );

    const button = screen.getByRole('button', { name: 'Click me' });
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('calls onClick when menu item is selected', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    const itemsWithClick = [
      { key: '1', label: 'Option 1', onClick: handleClick },
    ];

    renderWithTheme(
      <Dropdown items={itemsWithClick}>
        <Button>Click me</Button>
      </Dropdown>
    );

    const button = screen.getByRole('button', { name: 'Click me' });
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    const option1 = screen.getByText('Option 1');
    await user.click(option1);

    expect(handleClick).toHaveBeenCalled();
  });

  it('renders disabled menu items', async () => {
    const user = userEvent.setup();
    const disabledItems = [
      { key: '1', label: 'Enabled' },
      { key: '2', label: 'Disabled', disabled: true },
    ];

    renderWithTheme(
      <Dropdown items={disabledItems}>
        <Button>Menu</Button>
      </Dropdown>
    );

    const button = screen.getByRole('button', { name: 'Menu' });
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('Enabled')).toBeInTheDocument();
    });
    expect(screen.getByText('Disabled')).toBeInTheDocument();
  });

  it('renders with custom menu prop', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <Dropdown menu={{ items }}>
        <Button>Custom Menu</Button>
      </Dropdown>
    );

    const button = screen.getByRole('button', { name: 'Custom Menu' });
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });
  });
});
