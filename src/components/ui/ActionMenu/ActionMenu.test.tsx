import { render, screen, fireEvent } from '@testing-library/react';
import { ActionMenu } from './ActionMenu';

const mockItems = [
  { key: 'view', label: 'View Details', onClick: vi.fn() },
  { key: 'edit', label: 'Edit', onClick: vi.fn() },
  { key: 'delete', label: 'Delete', danger: true, onClick: vi.fn() },
];

describe('ActionMenu', () => {
  it('renders trigger button', () => {
    render(<ActionMenu items={mockItems} />);
    expect(screen.getByLabelText('Actions menu')).toBeInTheDocument();
  });

  it('shows dropdown on click', () => {
    render(<ActionMenu items={mockItems} />);

    fireEvent.click(screen.getByLabelText('Actions menu'));

    expect(screen.getByText('View Details')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('calls onClick handler when item is clicked', () => {
    render(<ActionMenu items={mockItems} />);

    fireEvent.click(screen.getByLabelText('Actions menu'));
    fireEvent.click(screen.getByText('View Details'));

    expect(mockItems[0].onClick).toHaveBeenCalled();
  });

  it('closes dropdown after item click', () => {
    render(<ActionMenu items={mockItems} />);

    fireEvent.click(screen.getByLabelText('Actions menu'));
    fireEvent.click(screen.getByText('View Details'));

    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });
});
