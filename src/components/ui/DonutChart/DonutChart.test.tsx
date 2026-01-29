import { render, screen } from '@testing-library/react';
import { DonutChart } from './DonutChart';

describe('DonutChart', () => {
  it('renders without crashing', () => {
    render(<DonutChart value={50} total={100} />);
    expect(screen.getByText('50')).toBeInTheDocument();
  });

  it('displays center label', () => {
    render(<DonutChart value={50} total={100} centerLabel="Progress" />);
    expect(screen.getByText('Progress')).toBeInTheDocument();
  });

  it('displays custom center value', () => {
    render(<DonutChart value={50} total={100} centerValue="50%" />);
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('applies custom size', () => {
    const { container } = render(
      <DonutChart value={50} total={100} size={200} />
    );
    const wrapper = container.querySelector('[class*="chartWrapper"]');
    expect(wrapper).toHaveStyle({ width: '200px', height: '200px' });
  });
});
