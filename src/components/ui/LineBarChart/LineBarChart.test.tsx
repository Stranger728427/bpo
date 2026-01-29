import { render, screen } from '@testing-library/react';
import { LineBarChart } from './LineBarChart';

const sampleData = [
  { label: 'Campaign 1', barValue: 5000, lineValue: 10 },
  { label: 'Campaign 2', barValue: 18000, lineValue: 28 },
];

describe('LineBarChart', () => {
  it('renders without crashing', () => {
    render(<LineBarChart data={sampleData} />);
    expect(screen.getByText('Campaign 1')).toBeInTheDocument();
    expect(screen.getByText('Campaign 2')).toBeInTheDocument();
  });

  it('displays custom labels', () => {
    render(
      <LineBarChart data={sampleData} barLabel="Cost" lineLabel="Conversion" />
    );
    expect(screen.getByText('Cost')).toBeInTheDocument();
    expect(screen.getByText('Conversion')).toBeInTheDocument();
  });

  it('applies custom height', () => {
    const { container } = render(
      <LineBarChart data={sampleData} height={300} />
    );
    const chartContainer = container.querySelector('[class*="container"]');
    expect(chartContainer).toHaveStyle({ height: '300px' });
  });
});
