import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Sidebar } from './Sidebar';
import { LayoutProvider } from '../LayoutContext';

const renderWithProvider = (
  ui: React.ReactElement,
  { defaultExpanded = false }: { defaultExpanded?: boolean } = {}
) => {
  return render(
    <LayoutProvider defaultExpanded={defaultExpanded}>{ui}</LayoutProvider>
  );
};

describe('Sidebar', () => {
  it('renders children correctly', () => {
    renderWithProvider(
      <Sidebar>
        <span>Sidebar Content</span>
      </Sidebar>
    );
    expect(screen.getByText('Sidebar Content')).toBeInTheDocument();
  });

  it('renders as an aside element', () => {
    renderWithProvider(<Sidebar>Content</Sidebar>);
    expect(screen.getByRole('complementary')).toBeInTheDocument();
  });

  it('renders navigation within sidebar', () => {
    renderWithProvider(
      <Sidebar>
        <a href="/home">Home</a>
      </Sidebar>
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders without children', () => {
    renderWithProvider(<Sidebar />);
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('applies collapsed class when sidebar is collapsed', () => {
    const { container } = renderWithProvider(
      <Sidebar>Content</Sidebar>,
      { defaultExpanded: false }
    );
    const aside = container.querySelector('aside');
    expect(aside?.className).toMatch(/collapsed/i);
  });

  it('applies expanded class when sidebar is expanded', () => {
    const { container } = renderWithProvider(
      <Sidebar>Content</Sidebar>,
      { defaultExpanded: true }
    );
    const aside = container.querySelector('aside');
    expect(aside?.className).toMatch(/expanded/i);
  });

  it('renders complex navigation items', () => {
    renderWithProvider(
      <Sidebar>
        <ul>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/settings">Settings</a></li>
          <li><a href="/profile">Profile</a></li>
        </ul>
      </Sidebar>
    );
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('throws error when used outside LayoutProvider', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<Sidebar>Content</Sidebar>);
    }).toThrow('useLayout must be used within a LayoutProvider');

    consoleSpy.mockRestore();
  });
});
