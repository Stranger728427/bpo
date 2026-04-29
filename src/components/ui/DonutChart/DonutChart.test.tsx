import { render, screen } from '@testing-library/react';
import { DonutChart } from './DonutChart';

const mockData = [
  { name: 'Completed', value: 50, fill: '#00C49F' },
  { name: 'Remaining', value: 50, fill: '#FF8042' },
];

describe('DonutChart', () => {
  it('renders without crashing and shows total', () => {
    render(<DonutChart data={mockData} />);
    expect(screen.getByText('100')).toBeInTheDocument(); // total = 50 + 50
  });

  it('displays center label', () => {
    render(<DonutChart data={mockData} centerLabel="Progress" />);
    expect(screen.getByText('Progress')).toBeInTheDocument();
  });

  it('displays custom center value', () => {
    render(
      <DonutChart
        data={mockData}
        centerValue="50%"
      />
    );
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('applies custom size', () => {
    const { container } = render(
      <DonutChart data={mockData} size={200} />
    );

    const wrapper = container.querySelector('[class*="chartWrapper"]');
    expect(wrapper).toHaveStyle({
      width: '200px',
      height: '200px',
    });
  });
});