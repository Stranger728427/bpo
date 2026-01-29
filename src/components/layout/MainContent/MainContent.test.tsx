import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MainContent } from './MainContent';
import { LayoutProvider } from '../LayoutContext';

const renderWithProvider = (
  ui: React.ReactElement,
  { defaultExpanded = false }: { defaultExpanded?: boolean } = {}
) => {
  return render(
    <LayoutProvider defaultExpanded={defaultExpanded}>{ui}</LayoutProvider>
  );
};

describe('MainContent', () => {
  it('renders children correctly', () => {
    renderWithProvider(
      <MainContent>
        <div data-testid="child">Main Content</div>
      </MainContent>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Main Content')).toBeInTheDocument();
  });

  it('renders as a main element', () => {
    renderWithProvider(<MainContent>Content</MainContent>);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('renders complex content', () => {
    renderWithProvider(
      <MainContent>
        <h1>Page Title</h1>
        <p>Page content paragraph</p>
        <button>Action</button>
      </MainContent>
    );
    expect(screen.getByText('Page Title')).toBeInTheDocument();
    expect(screen.getByText('Page content paragraph')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });

  it('applies sidebarCollapsed class when sidebar is collapsed', () => {
    const { container } = renderWithProvider(
      <MainContent>Content</MainContent>,
      { defaultExpanded: false }
    );
    const main = container.querySelector('main');
    expect(main?.className).toMatch(/sidebarCollapsed/i);
  });

  it('applies sidebarExpanded class when sidebar is expanded', () => {
    const { container } = renderWithProvider(
      <MainContent>Content</MainContent>,
      { defaultExpanded: true }
    );
    const main = container.querySelector('main');
    expect(main?.className).toMatch(/sidebarExpanded/i);
  });

  it('applies mainContent base class', () => {
    const { container } = renderWithProvider(
      <MainContent>Content</MainContent>
    );
    const main = container.querySelector('main');
    expect(main?.className).toMatch(/mainContent/i);
  });

  it('throws error when used outside LayoutProvider', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<MainContent>Content</MainContent>);
    }).toThrow('useLayout must be used within a LayoutProvider');

    consoleSpy.mockRestore();
  });

  it('renders nested sections and articles', () => {
    renderWithProvider(
      <MainContent>
        <section>
          <article>
            <h2>Article Title</h2>
            <p>Article content</p>
          </article>
        </section>
      </MainContent>
    );
    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByText('Article Title')).toBeInTheDocument();
    expect(screen.getByText('Article content')).toBeInTheDocument();
  });
});
