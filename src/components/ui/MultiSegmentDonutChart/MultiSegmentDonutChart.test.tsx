import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MultiSegmentDonutChart } from './MultiSegmentDonutChart';

const mockData = [
  { name: 'Connected', value: 42, color: '#8b5cf6' },
  { name: 'No Answer', value: 35, color: '#c4b5fd' },
  { name: 'Busy / Failed', value: 23, color: '#6b7280' },
];

describe('MultiSegmentDonutChart', () => {
  it('renders without crashing', () => {
    render(<MultiSegmentDonutChart data={mockData} />);

    expect(screen.getByText('Connected')).toBeInTheDocument();
    expect(screen.getByText('No Answer')).toBeInTheDocument();
    expect(screen.getByText('Busy / Failed')).toBeInTheDocument();
  });

  it('shows percentage by default', () => {
    render(<MultiSegmentDonutChart data={mockData} />);

    // Should show the first segment's percentage by default
    expect(screen.getByText('Connected • 42%')).toBeInTheDocument();
  });

  it('renders with custom size', () => {
    const { container } = render(<MultiSegmentDonutChart data={mockData} size={300} />);

    const chartWrapper = container.querySelector('[class*="chartWrapper"]');
    expect(chartWrapper).toHaveStyle({ width: '300px', height: '300px' });
  });

  it('hides legend when showLegend is false', () => {
    render(<MultiSegmentDonutChart data={mockData} showLegend={false} />);

    // Legend items should still be present in the chart's built-in legend
    // but not in the custom legend wrapper
    const legendWrapper = document.querySelector('[class*="legendWrapper"]');
    expect(legendWrapper).not.toBeInTheDocument();
  });

  it('hides percentage when showPercentage is false', () => {
    render(<MultiSegmentDonutChart data={mockData} showPercentage={false} />);

    expect(screen.queryByText('Connected • 42%')).not.toBeInTheDocument();
  });
});
