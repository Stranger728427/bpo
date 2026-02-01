import { DetailDrawer, StatusBadge } from '@components/ui/DetailDrawer/DetailDrawer';
import { CallRecord, getStatusLabel, getStatusVariant } from '@/types/call';
import { useState } from 'react';
import { Note } from './NoteChat/NotesChat';
interface CallLogDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  callLog: CallRecord | null;
}

export function CallLogDetailDrawer({ isOpen, onClose, callLog }: CallLogDetailDrawerProps) {
  if (!callLog) return null;

  const infoFields = [
    { label: 'Campaign Name', value: callLog.campaign },
    {
      label: 'Call Status',
      value: (
        <StatusBadge variant={getStatusVariant(callLog.callStatus)}>
          {getStatusLabel(callLog.callStatus)}
        </StatusBadge>
      ),
    },
    { label: 'Customer Phone', value: callLog.phone },
    { label: 'Customer Name', value: callLog.name },
    { label: 'Timestamp', value: callLog.timestamp },
    ...(callLog.cost !== undefined ? [{ label: 'Call Cost', value: `$ ${callLog.cost.toFixed(4)}` }] : []),
  ];

  // Parse duration to get total time in minutes.seconds format
  const parseDuration = (duration: string): number => {
    const [minutes, seconds] = duration.split(':').map(Number);
    return minutes + (seconds / 60);
  };

  const totalTime = parseDuration(callLog.duration);

  // Initialize with some mock notes if desired, or empty
  const [notes, setNotes] = useState<Note[]>([]);

  const handleAddNote = (newNote: Note) => {
    setNotes((prev) => [...prev, newNote]);
  }

  return (
    <DetailDrawer
      isOpen={isOpen}
      onClose={onClose}
      title="Details"
      infoFields={infoFields}
      transcript={callLog.transcript}
      callSummary={callLog.callSummary}
      notes={notes}
      onAddNote={handleAddNote}
      currentUser="You"
      currentTime={totalTime * 0.63} // Mock: 63% progress
      totalTime={totalTime}
      onPlay={() => console.log('Play audio')}
      onDownload={() => console.log('Download audio')}
    />
  );
}
