import Banner from '@/components/layout/Banner/Banner';
import styles from './Call.module.scss';
import { PiEye, PiMagnifyingGlass } from 'react-icons/pi';
import { useCall } from '../components/useCall';
import { useMemo, useState } from 'react';
import {
  Call,
  getStatusVariant,
  getStatusLabel,
  SearchType,
  SEARCH_TYPE,
} from '../components/call.types';
import ViewCall from './ViewCall';
import { Button, Empty, Flex, Input, Pagination } from 'antd';
import UploadPage from '@/features/upload/pages/UploadPage';
import TriggerCallDetails from '../components/triggerCallsView/TriggerCallDetails';
import { TableSkeleton } from '@/components/TableSkeleton/TableSkeleton';
import { Badge } from '@/components/ui/Badge/Badge';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { Select } from '@/components/ui/Select/Select';
import { useDebounce } from '@/components/Hooks/useDebounce';
import { DEBOUNCE_TIMEOUT } from '@/components/constants/Constant';
import dayjs from 'dayjs';

const CallPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isUplodaModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [isTriggerModalOpen, setIsTriggerModalOpen] = useState<boolean>(false);
  const [selectedCallId, setSelectedCallId] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchType, setSearchType] = useState<SearchType>(SEARCH_TYPE.NAME);
  const [searchValue, setSearchValue] = useState<string>('');

  const debouncedSearchValue = useDebounce(searchValue, DEBOUNCE_TIMEOUT);

  const param = useMemo(() => {
    return {
      page: currentPage,
      page_size: pageSize,
      ...(debouncedSearchValue && {
        [searchType]: debouncedSearchValue,
      }),
    };
  }, [currentPage, pageSize, debouncedSearchValue, searchType]);

  const { getCallLogs, getTriggerCall } = useCall(
    selectedCallId as string,
    param,
    isTriggerModalOpen
  );

  const callLogs = getCallLogs?.data?.data;

  const totalItems = getCallLogs?.data?.total || 0;

  const pagination = {
    current: currentPage,
    total: totalItems,
    pageSize: pageSize,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
    onChange: (page: number, pageSize: number) => {
      setCurrentPage(page);
      setPageSize(pageSize);
    },
  };

  const handleViewDetails = (id: string) => {
    setSelectedCallId(id);
  };

  const handleSearchTypeChange = (value: SearchType) => {
    setSearchType(value);
    setSearchValue('');
    setCurrentPage(1);
  };

  const onSearch = (value: string) => {
    setSearchValue(value);
    setCurrentPage(1);
  };

  const formatCallTriggeredAt = (call_triggered_at: string) =>
    dayjs(call_triggered_at).format('DD MMM YYYY, hh:mm A');

  return (
    <div className={styles.container}>
      {/* Header */}
      <Banner>
        <div className={styles.header}>
          <h1 className={styles.title}>Call Logs</h1>

          <div className={styles.filters}>
            <Flex gap={'small'}>
              <Select
                value={searchType}
                onChange={(value: SearchType) => handleSearchTypeChange(value)}
                options={[
                  { label: 'Patient name', value: SEARCH_TYPE.NAME },
                  { label: 'Phone number', value: SEARCH_TYPE.PHONE },
                ]}
              />
              <Input
                allowClear
                placeholder={`Search by ${searchType}`}
                value={searchValue}
                onChange={(e) => onSearch(e.target.value)}
                suffix={<PiMagnifyingGlass />}
              />
            </Flex>

            {isTriggerModalOpen && (
              <TriggerCallDetails
                open={isTriggerModalOpen}
                onClose={() => setIsTriggerModalOpen(false)}
                callsTrigger={getTriggerCall}
              />
            )}

            <Button type="primary" onClick={() => setIsUploadModalOpen(true)}>
              <IoCloudUploadOutline />
              <span>Upload Contacts</span>
            </Button>
            {isUplodaModalOpen && (
              <UploadPage
                open={isUplodaModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
              />
            )}
          </div>
        </div>
      </Banner>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Phone</th>
              <th>Call Status</th>
              <th>Intent</th>
              <th>Duration</th>
              <th>Triggered At</th>
              <th>Action</th>
            </tr>
          </thead>
          {getCallLogs?.isLoading ? (
            <tr>
              <td colSpan={8} style={{ textAlign: 'center', padding: '20px' }}>
                <TableSkeleton rows={10} columns={6} />
              </td>
            </tr>
          ) : (
            <tbody>
              {callLogs?.map((log: Call) => {
                return (
                  <tr key={log?.id}>
                    <td>{log?.patient_name}</td>
                    <td>{log?.phone_number}</td>
                    <td>
                      <Badge variant={getStatusVariant(log?.status)}>
                        {getStatusLabel(log?.status)}
                      </Badge>
                    </td>
                    <td>{log?.intent}</td>
                    <td>{log?.call_duration}</td>
                    <td>
                      {formatCallTriggeredAt(log?.call_triggered_at as string)}
                    </td>
                    <td>
                      <button
                        className={styles.actionButton}
                        onClick={() => handleViewDetails(log?.id)}
                        aria-label="View details"
                      >
                        <PiEye />
                      </button>
                    </td>
                  </tr>
                );
              })}

              {!callLogs?.length && (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center' }}>
                    <Empty />
                  </td>
                </tr>
              )}
            </tbody>
          )}
        </table>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.totalCount}>
          {getCallLogs?.data?.total} Calls
        </div>

        <div className={styles.pagination}>
          <Pagination {...pagination} />
        </div>
      </div>

      {/* Call Log Detail Drawer */}
      <ViewCall
        isOpen={!!selectedCallId}
        onClose={() => setSelectedCallId(null)}
        selectedCallId={selectedCallId as string}
      />
    </div>
  );
};

export default CallPage;
