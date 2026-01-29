import { DetailDrawer, StatusBadge } from '@components/ui/DetailDrawer/DetailDrawer';
import { CallRecord, getStatusLabel, getStatusVariant } from '@/types/call';

interface LeadDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lead: CallRecord | null;
}

export function LeadDetailDrawer({ isOpen, onClose, lead }: LeadDetailDrawerProps) {
  if (!lead) return null;

  const infoFields = [
    { label: 'Campaign Name', value: lead.campaign },
    {
      label: 'Call Status',
      value: (
        <StatusBadge variant={getStatusVariant(lead.callStatus)}>
          {getStatusLabel(lead.callStatus)}
        </StatusBadge>
      ),
    },
    { label: 'Customer Phone', value: lead.phone },
    { label: 'Customer Name', value: lead.name },
    { label: 'Timestamp', value: '08/06/2025, 03:48:44' },
  ];

  // Parse duration to get total time in minutes.seconds format
  const parseDuration = (duration: string): number => {
    const [minutes, seconds] = duration.split(':').map(Number);
    return minutes + (seconds / 60);
  };

  const totalTime = parseDuration(lead.duration);

  return (
    <DetailDrawer
      isOpen={isOpen}
      onClose={onClose}
      title="Details"
      infoFields={infoFields}
      transcript={lead.transcript}
      callSummary={lead.callSummary}
      notes={lead.notes}
      currentTime={totalTime * 0.63} // Mock: 63% progress
      totalTime={totalTime}
      onPlay={() => console.log('Play audio')}
      onDownload={() => console.log('Download audio')}
    />
  );
}
