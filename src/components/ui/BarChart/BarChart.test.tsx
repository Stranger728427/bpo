import { render, screen } from '@testing-library/react';
import { BarChart } from './BarChart';

const sampleData = [
  { label: '6a', value: 18 },
  { label: '9a', value: 28 },
  { label: '12p', value: 65 },
];

describe('BarChart', () => {
  it('renders without crashing', () => {
    render(<BarChart data={sampleData} />);
    expect(screen.getByText('6a')).toBeInTheDocument();
    expect(screen.getByText('9a')).toBeInTheDocument();
    expect(screen.getByText('12p')).toBeInTheDocument();
  });

  it('hides labels when showLabels is false', () => {
    render(<BarChart data={sampleData} showLabels={false} />);
    expect(screen.queryByText('6a')).not.toBeInTheDocument();
  });

  it('applies custom height', () => {
    const { container } = render(<BarChart data={sampleData} height={100} />);
    const responsiveContainer = container.querySelector('.recharts-responsive-container');
    expect(responsiveContainer).toHaveStyle({ height: '100px' });
  });
});
