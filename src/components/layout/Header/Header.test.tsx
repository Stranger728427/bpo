import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
  it('renders children correctly', () => {
    render(
      <Header>
        <span>Header Content</span>
      </Header>
    );
    expect(screen.getByText('Header Content')).toBeInTheDocument();
  });

  it('renders as a header element', () => {
    render(<Header>Content</Header>);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders without children', () => {
    const { container } = render(<Header />);
    const header = container.querySelector('header');
    expect(header).toBeInTheDocument();
    expect(header).toBeEmptyDOMElement();
  });

  it('renders complex children', () => {
    render(
      <Header>
        <nav>
          <a href="/home">Home</a>
          <a href="/about">About</a>
        </nav>
        <button>Login</button>
      </Header>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('applies header class', () => {
    const { container } = render(<Header>Content</Header>);
    const header = container.firstChild as HTMLElement;
    expect(header.className).toMatch(/header/i);
  });
});
