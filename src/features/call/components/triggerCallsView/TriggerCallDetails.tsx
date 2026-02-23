import { UseQueryResult } from '@tanstack/react-query';
import { Modal } from '@/components/ui/Modal/Modal';
import { Table } from '@/components/ui/Table/Table';
import { Badge } from '@/components/ui/Badge/Badge';
import styles from './TriggerCallDetails.module.scss';
import {
  getStatusLabel,
  getStatusVariant,
  TriggerCallResponse,
} from '../call.types';
import dayjs from 'dayjs';
import { ColumnsType } from 'antd/es/table';
import { Empty } from 'antd';

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
  const { data, isLoading } = callsTrigger;

  // Adjust based on API shape
  const calls = data?.data ?? [];

  const columns: ColumnsType<any> = [
    {
      title: 'Phone',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'Patient Name',
      dataIndex: 'patient_name',
      key: 'patient_name',
    },
    {
      title: 'Appointment Date',
      dataIndex: 'appointment_date',
      key: 'appointment_date',
    },
    {
      title: 'Appointment Time',
      dataIndex: 'appointment_time',
      key: 'appointment_time',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge variant={getStatusVariant(status)}>
          {getStatusLabel(status)}
        </Badge>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (value: string) => dayjs(value).format('DD MMM YYYY, hh:mm A'),
    },
  ];

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title="Trigger Call Details"
      footer={null}
      width="70vw"
      destroyOnHidden
    >
      <Table
        rowKey="id"
        columns={columns}
        dataSource={calls}
        loading={isLoading}
        pagination={false}
        size="middle"
        bordered={false}
        scroll={{ y: 420 }}
        locale={{
          emptyText: <Empty />,
        }}
        className={styles.triggerTable}
      />
    </Modal>
  );
};

export default TriggerCallDetails;
