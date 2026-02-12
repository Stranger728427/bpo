import { useCall } from '../components/useCall';
import { Drawer } from '@/components/ui/Drawer/Drawer';
import { Divider, Skeleton, Tag } from 'antd';
import styles from '../pages/ViewCall.module.scss';
import { CloseCircleOutlined } from '@ant-design/icons';

interface CallLogDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCallId: string | null;
}

const getStatusColor = (status?: string) => {
  switch (status) {
    case 'completed':
      return 'green';
    case 'failed':
      return 'red';
    case 'missed':
      return 'orange';
    default:
      return 'blue';
  }
};

const AIIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect
      x="2"
      y="2"
      width="12"
      height="12"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle cx="6" cy="6" r="1" fill="currentColor" />
    <circle cx="10" cy="6" r="1" fill="currentColor" />
    <path
      d="M5 10C5 10 6.5 11.5 8 11.5C9.5 11.5 11 10 11 10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M2 14C2 11.2386 4.68629 9 8 9C11.3137 9 14 11.2386 14 14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const ViewCall = ({ isOpen, onClose, selectedCallId }: CallLogDrawerProps) => {
  const { getCallLogsById } = useCall(selectedCallId as string);

  const call = getCallLogsById?.data;

  const infoFields = [
    { label: 'Patient Name', value: call?.patient_name },
    { label: 'Phone Number', value: call?.phone_number },
    { label: 'Status', value: call?.status },
    { label: 'Call Duration', value: call?.call_duration },
    { label: 'Intent', value: call?.intent },
    { label: 'Overall Rating', value: call?.overall_rating },
    { label: 'Confidence', value: call?.confidence },
  ];

  console.log('patient', call?.patient_name);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement="right"
      width={'400px'}
      closable={false}
      className={styles.drawer}
    >
      {getCallLogsById?.isLoading ? (
        <Skeleton active={getCallLogsById?.isLoading} paragraph={{ rows: 6 }} />
      ) : (
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.header}>
            <h2 className={styles.title}>{'Call Details'}</h2>
            <button
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close"
            >
              <CloseCircleOutlined />
            </button>
          </div>

          {/* Info Section */}
          <div className={styles.infoSection}>
            {infoFields.map((field, index) => (
              <div key={index} className={styles.infoRow}>
                <span className={styles.infoLabel}>{field.label}</span>

                <span className={styles.infoValue}>
                  {field.label.toLowerCase() === 'status' ? (
                    <Tag color={getStatusColor(field?.value as string)}>
                      {field.value}
                    </Tag>
                  ) : (
                    field.value
                  )}
                </span>
              </div>
            ))}
          </div>

          <div className={styles.tabContent}>
            <h5>Transcript</h5>
            <Divider />
            <div className={styles.transcript}>
              {call?.transcript?.length! > 0 ? (
                call?.transcript?.map((message) => (
                  <div key={message.message} className={styles.message}>
                    <div className={styles.messageHeader}>
                      <div className={styles.speakerInfo}>
                        <span className={styles.speakerIcon}>
                          {message.speaker === 'ai' || 'bot' ? (
                            <AIIcon />
                          ) : (
                            <UserIcon />
                          )}
                        </span>
                        <span className={styles.speakerName}>
                          {message.speaker === 'ai' || 'bot'
                            ? 'AI Assistant'
                            : 'Caller'}
                        </span>
                      </div>
                      {/* <span className={styles.messageTime}>
                          {message.timestamp} | {message.duration}
                        </span> */}
                    </div>
                    <p className={styles.messageText}>{message.message}</p>
                  </div>
                ))
              ) : (
                <p className={styles.emptyState}>No transcript available</p>
              )}
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
};

export default ViewCall;
