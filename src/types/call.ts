// Shared types for call-related data used across Call Logs and Lead List features

export type CallStatus = 'interested' | 'not_interested' | 'callback' | 'no_answer' | 'completed';

export interface TranscriptMessage {
  id: string;
  speaker: 'ai' | 'caller';
  timestamp: string;
  duration: string;
  message: string;
}

export interface CallRecord {
  id: string;
  timestamp: string;
  campaign: string;
  phone: string;
  name: string;
  duration: string;
  callStatus: CallStatus;
  cost?: number;
  transcript: TranscriptMessage[];
  callSummary: string;
  notes: string;
}

// Status utilities
export const getStatusLabel = (status: CallStatus): string => {
  switch (status) {
    case 'interested':
      return 'Interested';
    case 'not_interested':
      return 'Not Interested';
    case 'callback':
      return 'Callback scheduled';
    case 'no_answer':
      return 'No Answer';
    case 'completed':
      return 'Completed';
    default:
      return status;
  }
};

export const getStatusVariant = (status: CallStatus): 'success' | 'error' | 'warning' | 'default' => {
  switch (status) {
    case 'interested':
      return 'success';
    case 'not_interested':
      return 'error';
    case 'callback':
      return 'warning';
    case 'no_answer':
    case 'completed':
    default:
      return 'default';
  }
};
