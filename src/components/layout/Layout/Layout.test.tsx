import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Layout } from './Layout';

describe('Layout', () => {
  it('renders children correctly', () => {
    render(
      <Layout>
        <div data-testid="child">Content</div>
      </Layout>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders with default sidebar collapsed', () => {
    const { container } = render(
      <Layout>
        <div>Content</div>
      </Layout>
    );
    const layoutDiv = container.firstChild as HTMLElement;
    expect(layoutDiv).toBeInTheDocument();
  });

  it('accepts defaultSidebarExpanded prop', () => {
    const { container } = render(
      <Layout defaultSidebarExpanded={true}>
        <div>Content</div>
      </Layout>
    );
    const layoutDiv = container.firstChild as HTMLElement;
    expect(layoutDiv).toBeInTheDocument();
  });

  it('renders multiple children', () => {
    render(
      <Layout>
        <header>Header</header>
        <main>Main</main>
        <footer>Footer</footer>
      </Layout>
    );
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Main')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('applies layout class', () => {
    const { container } = render(
      <Layout>
        <div>Content</div>
      </Layout>
    );
    const layoutDiv = container.firstChild as HTMLElement;
    expect(layoutDiv.className).toMatch(/layout/i);
  });
});
