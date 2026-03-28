import { useCall } from '../components/useCall';
import { Drawer } from '@/components/ui/Drawer/Drawer';
import { Button, Divider, Popover, Skeleton, Tooltip } from 'antd';
import styles from '../pages/ViewCall.module.scss';
import { AiOutlineUser } from 'react-icons/ai';
import { InfoCircleOutlined } from '@ant-design/icons';
import { LucideBot } from '@/components/icons/CallLogs.icons';
import dayjs from 'dayjs';
import { Badge } from '@/components/ui/Badge/Badge';
import { getStatusLabel, getStatusVariant } from '../components/call.types';

interface CallLogDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCallId: string | null;
}

const ViewCall = ({ isOpen, onClose, selectedCallId }: CallLogDrawerProps) => {
  const { getCallLogsById } = useCall(selectedCallId as string, {
    page: 1,
    page_size: 10,
  });

  const call = getCallLogsById?.data;

  const formatCallTriggeredAt = (call_triggered_at: string) =>
    dayjs(call_triggered_at).format('DD MMM YYYY, hh:mm A');

  const infoFields = [
    { label: 'Patient Name', value: call?.patient_name },
    { label: 'Phone Number', value: call?.phone_number },
    { label: 'Status', value: call?.status },
    {label:'Campaign', value: call?.campaign_name},
    { label: 'Call Duration', value: call?.call_duration },
    { label: 'Intent', value: call?.intent },
    {
      label: 'Triggered At',
      value: formatCallTriggeredAt(call?.call_triggered_at as string),
    },
  ];

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement="right"
      className={styles.drawer}
      title="Call Details"
      
    >
      {getCallLogsById?.isLoading ? (
        <Skeleton active paragraph={{ rows: 6 }} />
      ) : (
        <div className={styles.container}>
          {/* Info Section */}
          <div className={styles.infoSection}>
            {infoFields.map((field) => (
              <div key={field.label} className={styles.infoRow}>
                <span className={styles.infoLabel}>{field.label}</span>

                <span className={styles.infoValue}>
                  {field.label.toLowerCase() === 'status' ? (
                    <Badge variant={getStatusVariant(field.value as string)}>
                      {getStatusLabel(field.value)}
                    </Badge>
                  ) : (
                    field.value || '-'
                  )}
                </span>
              </div>
            ))}
          </div>

          {/* Summary Action (Below Info Section) */}
          {call?.summary && (
            <div className={styles.summaryWrapper}>
                <Popover
                  content={
                    <div className={styles.summaryContent}>{call.summary}</div>
                  }
                  title="Call Summary"
                  trigger="click"
                  placement="bottom"
                >
                  <Button
                  title='click to view summary'
                    type="text"
                    icon={<InfoCircleOutlined />}
                    className={styles.summaryButton}
                  >
                    View Summary
                  </Button>
                </Popover>
            </div>
          )}

          {/* Transcript Section */}
          <div className={styles.transcriptSection}>
            <h5 className={styles.sectionTitle}>Transcript</h5>
            <Divider />

            <div className={styles.transcript}>
              {call?.transcript?.length ? (
                call.transcript.map((message, ind) => {
                  const isBot = ['ai', 'bot'].includes(message.speaker);

                  return (
                    <div
                      key={ind}
                      className={`${styles.message} ${isBot ? styles.ai : styles.user}`}
                    >
                      <div className={styles.messageHeader}>
                        <div className={styles.speakerIcon}>
                          {isBot ? <LucideBot /> : <AiOutlineUser size={14} />}
                        </div>
                        <span className={styles.speakerName}>
                          {isBot ? 'AI Assistant' : 'Caller'}
                        </span>
                      </div>

                      <p className={styles.messageText}>{message.message}</p>
                    </div>
                  );
                })
              ) : (
                <div className={styles.emptyState}>No transcript available</div>
              )}
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
};

export default ViewCall;
