import { render, screen, fireEvent } from '@testing-library/react';
import { ConfigProvider } from 'antd';
import { lightTheme } from '@lib/antd/theme';
import { DetailDrawer, StatusBadge } from './DetailDrawer';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ConfigProvider theme={lightTheme}>
      {ui}
    </ConfigProvider>
  );
};

const mockTranscript = [
  {
    id: '1',
    speaker: 'ai' as const,
    timestamp: '3:48',
    duration: '00:01',
    message: 'Hello, how can I help you today?',
  },
  {
    id: '2',
    speaker: 'caller' as const,
    timestamp: '3:49',
    duration: '00:02',
    message: 'I need information about your services.',
  },
];

const mockInfoFields = [
  { label: 'Campaign Name', value: 'Test Campaign' },
  { label: 'Customer Name', value: 'John Doe' },
];

describe('DetailDrawer', () => {
  it('renders the drawer when open', () => {
    renderWithTheme(
      <DetailDrawer
        isOpen={true}
        onClose={() => {}}
        infoFields={mockInfoFields}
        transcript={mockTranscript}
      />
    );

    expect(screen.getByText('Details')).toBeInTheDocument();
  });

  it('displays info fields correctly', () => {
    renderWithTheme(
      <DetailDrawer
        isOpen={true}
        onClose={() => {}}
        infoFields={mockInfoFields}
        transcript={mockTranscript}
      />
    );

    expect(screen.getByText('Campaign Name')).toBeInTheDocument();
    expect(screen.getByText('Test Campaign')).toBeInTheDocument();
    expect(screen.getByText('Customer Name')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('displays transcript messages', () => {
    renderWithTheme(
      <DetailDrawer
        isOpen={true}
        onClose={() => {}}
        infoFields={mockInfoFields}
        transcript={mockTranscript}
      />
    );

    expect(screen.getByText('Hello, how can I help you today?')).toBeInTheDocument();
    expect(screen.getByText('I need information about your services.')).toBeInTheDocument();
  });

  it('shows empty state when no transcript', () => {
    renderWithTheme(
      <DetailDrawer
        isOpen={true}
        onClose={() => {}}
        infoFields={mockInfoFields}
        transcript={[]}
      />
    );

    expect(screen.getByText('No transcript available')).toBeInTheDocument();
  });

  it('switches between tabs', () => {
    renderWithTheme(
      <DetailDrawer
        isOpen={true}
        onClose={() => {}}
        infoFields={mockInfoFields}
        transcript={mockTranscript}
        callSummary="Test summary"
      />
    );

    // Click Notes tab
    fireEvent.click(screen.getByText('Notes'));
    expect(screen.getByText('Call Summary')).toBeInTheDocument();
    expect(screen.getByText('Test summary')).toBeInTheDocument();

    // Click Transcript tab
    fireEvent.click(screen.getByText('Transcript'));
    expect(screen.getByText('Hello, how can I help you today?')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    renderWithTheme(
      <DetailDrawer
        isOpen={true}
        onClose={onClose}
        infoFields={mockInfoFields}
        transcript={mockTranscript}
      />
    );

    fireEvent.click(screen.getByLabelText('Close'));
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onPlay when play button is clicked', () => {
    const onPlay = vi.fn();
    renderWithTheme(
      <DetailDrawer
        isOpen={true}
        onClose={() => {}}
        infoFields={mockInfoFields}
        transcript={mockTranscript}
        onPlay={onPlay}
      />
    );

    fireEvent.click(screen.getByText('Play'));
    expect(onPlay).toHaveBeenCalled();
  });

  it('calls onDownload when download button is clicked', () => {
    const onDownload = vi.fn();
    renderWithTheme(
      <DetailDrawer
        isOpen={true}
        onClose={() => {}}
        infoFields={mockInfoFields}
        transcript={mockTranscript}
        onDownload={onDownload}
      />
    );

    fireEvent.click(screen.getByText('Download'));
    expect(onDownload).toHaveBeenCalled();
  });

  it('renders custom title', () => {
    renderWithTheme(
      <DetailDrawer
        isOpen={true}
        onClose={() => {}}
        title="Custom Title"
        infoFields={mockInfoFields}
        transcript={mockTranscript}
      />
    );

    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });
});

describe('StatusBadge', () => {
  it('renders with success variant', () => {
    renderWithTheme(<StatusBadge variant="success">Interested</StatusBadge>);
    expect(screen.getByText('Interested')).toBeInTheDocument();
  });

  it('renders with error variant', () => {
    renderWithTheme(<StatusBadge variant="error">Not Interested</StatusBadge>);
    expect(screen.getByText('Not Interested')).toBeInTheDocument();
  });

  it('renders with warning variant', () => {
    renderWithTheme(<StatusBadge variant="warning">Callback</StatusBadge>);
    expect(screen.getByText('Callback')).toBeInTheDocument();
  });

  it('renders with default variant', () => {
    renderWithTheme(<StatusBadge variant="default">No Answer</StatusBadge>);
    expect(screen.getByText('No Answer')).toBeInTheDocument();
  });
});
