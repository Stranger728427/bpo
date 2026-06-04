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
import { Flex, Input, Pagination } from 'antd';
import { TableSkeleton } from '@/components/TableSkeleton/TableSkeleton';
import { Badge } from '@/components/ui/Badge/Badge';
import { Select } from '@/components/ui/Select/Select';
import { useDebounce } from '@/components/Hooks/useDebounce';
import { DATE_FORMAT, DEBOUNCE_TIMEOUT } from '@/components/constants/Constant';
import { Table } from '@/components/ui/Table/Table';
import useDateUtils from '@/components/Hooks/useDateUtils';

const CallPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCallId, setSelectedCallId] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchType, setSearchType] = useState<SearchType>(SEARCH_TYPE.PATIENT);
  const [searchValue, setSearchValue] = useState<string>('');
  const {getLocal} = useDateUtils();

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

  const { getCallLogs } = useCall(selectedCallId as string, param);

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

  const columns = [
    {
      title: 'Patient Name',
      dataIndex: 'patient_name',
      key: 'patient_name',
    },
    {
      title: 'Phone',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'Call Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge variant={getStatusVariant(status)}>
          {getStatusLabel(status)}
        </Badge>
      ),
    },
    {
      title: 'Intent',
      dataIndex: 'intent',
      key: 'intent',
    },
    {
      title: 'Campaign',
      dataIndex: 'campaign_name',
      key: 'campaign_name',
    },
    {
      title: 'Triggered At',
      dataIndex: 'call_triggered_at',
      key: 'call_triggered_at',
      render: (value: string) => getLocal(value).format(DATE_FORMAT.AbbreviatedDayMonthYear),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Call) => (
        <button
          className={styles.actionButton}
          onClick={() => handleViewDetails(record.id)}
        >
          <PiEye />
        </button>
      ),
    },
  ];
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
                  { label: 'Patient', value: SEARCH_TYPE.PATIENT },
                  { label: 'Phone', value: SEARCH_TYPE.PHONE },
                  { label: 'Campaign', value: SEARCH_TYPE.CAMPAIGN }
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
          </div>
        </div>
      </Banner>

      {/* Table */}
      <div className={styles.tableWrapper}>
        {getCallLogs.isPending ? (
          <TableSkeleton rows={10} columns={6} />
        ) : (
          <Table
            bordered={false}
            columns={columns}
            dataSource={callLogs}
            rowKey="id"
            pagination={false}
            className={styles.table}
          />
        )}
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
        getLocal={getLocal}
      />
    </div>
  );
};

export default CallPage;
