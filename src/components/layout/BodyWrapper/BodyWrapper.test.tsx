import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BodyWrapper } from './BodyWrapper';

describe('BodyWrapper', () => {
  it('renders children correctly', () => {
    render(
      <BodyWrapper>
        <div data-testid="child">Content</div>
      </BodyWrapper>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders multiple children', () => {
    render(
      <BodyWrapper>
        <section>Section 1</section>
        <section>Section 2</section>
        <section>Section 3</section>
      </BodyWrapper>
    );
    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
    expect(screen.getByText('Section 3')).toBeInTheDocument();
  });

  it('applies bodyWrapper class', () => {
    const { container } = render(
      <BodyWrapper>
        <div>Content</div>
      </BodyWrapper>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toMatch(/bodyWrapper/i);
  });

  it('wraps content in a div element', () => {
    const { container } = render(
      <BodyWrapper>
        <span>Content</span>
      </BodyWrapper>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.tagName).toBe('DIV');
  });

  it('renders complex nested content', () => {
    render(
      <BodyWrapper>
        <header>Header</header>
        <main>
          <article>Article content</article>
        </main>
        <footer>Footer</footer>
      </BodyWrapper>
    );
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Article content')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });
});
