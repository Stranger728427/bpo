import { UseQueryResult } from '@tanstack/react-query';
import styles from './TriggerCallDetails.module.scss';
import { Modal } from '@/components/ui/Modal/Modal';
import { Empty } from 'antd';
import { TableSkeleton } from '@/components/TableSkeleton/TableSkeleton';
import { Badge } from '@/components/ui/Badge/Badge';
import {
  getStatusLabel,
  getStatusVariant,
  TriggerCallResponse,
} from '../call.types';

interface TriggerCallDetailsProps {
  open: boolean;
  onClose: () => void;
  callsTrigger: UseQueryResult<TriggerCallResponse, Error>;
}

const TriggerCallDetails = ({
  open,
  onClose,
  callsTrigger,
}: TriggerCallDetailsProps) => {
  const calls = callsTrigger?.data?.data || [];

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title="Trigger Call Details"
      footer={null}
      width="70vw"
    >
      {callsTrigger?.isError && (
        <div className={styles.state}>
          Error: {callsTrigger.error?.message || 'Something went wrong'}
        </div>
      )}

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Phone</th>
              <th>Patient Name</th>
              <th>Appointment Date</th>
              <th>Appointment Time</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {callsTrigger?.isLoading && (
              <tr>
                <td
                  colSpan={6}
                  style={{ textAlign: 'center', padding: '20px' }}
                >
                  <TableSkeleton rows={10} columns={6} />
                </td>
              </tr>
            )}
            {calls.length > 0 &&
              calls?.map((call) => (
                <tr key={call?.id}>
                  <td>{call?.phone_number}</td>
                  <td>{call?.patient_name}</td>
                  <td>{call?.appointment_date}</td>
                  <td>{call?.appointment_time}</td>
                  <td>
                    <Badge variant={getStatusVariant(call?.status)}>
                      {getStatusLabel(call?.status)}
                    </Badge>
                  </td>
                  <td>{new Date(call?.created_at).toLocaleString()}</td>
                </tr>
              ))}
          </tbody>
          {!callsTrigger?.isLoading &&
            !callsTrigger?.isError &&
            calls.length === 0 && <Empty />}
        </table>
      </div>
    </Modal>
  );
};

export default TriggerCallDetails;
