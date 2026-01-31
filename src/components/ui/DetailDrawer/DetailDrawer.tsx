import { useState, ReactNode } from 'react';
import { Drawer } from '@components/ui/Drawer/Drawer';
import { TranscriptMessage } from '@/types/call';
import styles from './DetailDrawer.module.scss';
import { FiArrowRight, FiCornerDownLeft } from 'react-icons/fi';
import { on } from 'events';
import { PiPaperPlaneRightLight } from 'react-icons/pi';

// Icons
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M13 7L7 13M7 7L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 3L13 8L4 13V3Z" fill="currentColor"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 2V10M8 10L5 7M8 10L11 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const AIIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="6" cy="6" r="1" fill="currentColor"/>
    <circle cx="10" cy="6" r="1" fill="currentColor"/>
    <path d="M5 10C5 10 6.5 11.5 8 11.5C9.5 11.5 11 10 11 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2 14C2 11.2386 4.68629 9 8 9C11.3137 9 14 11.2386 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// Types
export interface InfoField {
  label: string;
  value: ReactNode;
}

export interface DetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  infoFields: InfoField[];
  transcript: TranscriptMessage[];
  callSummary?: string;
  notes?: string;
  onNotesChange?: (notes: string) => void;
  currentTime?: number;
  totalTime?: number;
  onPlay?: () => void;
  onDownload?: () => void;
  width?: number;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  noteList?: string[];
  onNoteListChange?: (notes: string[]) => void;
  onNoteEnter?: () => void;
}

export function DetailDrawer({
  isOpen,
  onClose,
  title = 'Details',
  infoFields,
  transcript,
  callSummary = '',
  notes,
  onNotesChange,
  currentTime = 2.53,
  totalTime = 4.0,
  onPlay,
  onDownload,
  width = 400,
  onKeyDown,
  noteList,
  onNoteEnter,

}: DetailDrawerProps) {
  const [activeTab, setActiveTab] = useState<'transcript' | 'notes'>('transcript');

  const progressPercent = (currentTime / totalTime) * 100;

  const formatTime = (time: number) => {
    const minutes = Math.floor(time);
    const seconds = Math.round((time - minutes) * 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement="right"
      width={width}
      closable={false}
      className={styles.drawer}
    >
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        </div>

        {/* Info Section */}
        <div className={styles.infoSection}>
          {infoFields.map((field, index) => (
            <div key={index} className={styles.infoRow}>
              <span className={styles.infoLabel}>{field.label}</span>
              <span className={styles.infoValue}>{field.value}</span>
            </div>
          ))}
        </div>

        {/* Audio Player */}
        <div className={styles.audioPlayer}>
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${progressPercent}%` }}
              />
              <div
                className={styles.progressThumb}
                style={{ left: `${progressPercent}%` }}
              />
            </div>
            <div className={styles.timeLabels}>
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(totalTime)}</span>
            </div>
          </div>
          <div className={styles.audioControls}>
            <button className={styles.playButton} onClick={onPlay}>
              <PlayIcon />
              <span>Play</span>
            </button>
            <button className={styles.downloadButton} onClick={onDownload}>
              <DownloadIcon />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'transcript' ? styles.active : ''}`}
            onClick={() => setActiveTab('transcript')}
          >
            Transcript
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'notes' ? styles.active : ''}`}
            onClick={() => setActiveTab('notes')}
          >
            Notes
          </button>
        </div>

        {/* Tab Content */}
        <div className={styles.tabContent}>
          {activeTab === 'transcript' && (
            <div className={styles.transcript}>
              {transcript.length > 0 ? (
                transcript.map((message) => (
                  <div key={message.id} className={styles.message}>
                    <div className={styles.messageHeader}>
                      <div className={styles.speakerInfo}>
                        <span className={styles.speakerIcon}>
                          {message.speaker === 'ai' ? <AIIcon /> : <UserIcon />}
                        </span>
                        <span className={styles.speakerName}>
                          {message.speaker === 'ai' ? 'AI Assistant' : 'Caller'}
                        </span>
                      </div>
                      <span className={styles.messageTime}>
                        {message.timestamp} | {message.duration}
                      </span>
                    </div>
                    <p className={styles.messageText}>{message.message}</p>
                  </div>
                ))
              ) : (
                <p className={styles.emptyState}>No transcript available</p>
              )}
            </div>
          )}

          {activeTab === 'notes' && (
            <div className={styles.notes}>
              <div className={styles.callSummary}>
                <h4 className={styles.sectionTitle}>Call Summary</h4>
                <p className={styles.summaryText}>
                  {callSummary || 'No summary available'}
                </p>
              </div>
              <div className={styles.userNotes}>
                <div className={styles.notesList}>
                  <h4 className={styles.sectionTitle}>Notes:</h4>
                  {noteList?.map((note, index) => (
                    <div key={index} className={styles.noteItem}>
                      <span className={styles.noteText}>{note}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.notesInputContainer}>
                  <input
                  // className={styles.notesInput}
                  placeholder="Enter Your Notes"
                  value={notes}
                  onChange={(e) => onNotesChange?.(e.target.value)}
                  onKeyDown={onKeyDown}
                />
                <button
                  type="button"
                  // className={styles.enterButton}
                  onClick={onNoteEnter}
                  aria-label="Submit notes"
                >
                  <PiPaperPlaneRightLight className={styles.enterIcon} />
                </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Drawer>
  );
}

// Status Badge Component
export interface StatusBadgeProps {
  variant: 'success' | 'error' | 'warning' | 'default';
  children: ReactNode;
}

export function StatusBadge({ variant, children }: StatusBadgeProps) {
  return (
    <span className={`${styles.statusBadge} ${styles[variant]}`}>
      {children}
    </span>
  );
}
