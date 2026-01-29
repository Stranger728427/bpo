import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders correctly with default variant', () => {
    render(<Badge>Default</Badge>);
    expect(screen.getByText('Default')).toBeInTheDocument();
  });

  it('renders with success variant', () => {
    render(<Badge variant="success">Active</Badge>);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('renders with warning variant', () => {
    render(<Badge variant="warning">Paused</Badge>);
    expect(screen.getByText('Paused')).toBeInTheDocument();
  });

  it('renders with error variant', () => {
    render(<Badge variant="error">Failed</Badge>);
    expect(screen.getByText('Failed')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Badge className="custom-class">Custom</Badge>);
    expect(screen.getByText('Custom')).toHaveClass('custom-class');
  });
});
