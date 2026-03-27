import { useMemo, useState } from 'react';
import { Badge } from '@components/ui/Badge/Badge';
import { ActionMenu } from '@components/ui/ActionMenu/ActionMenu';
import styles from './Campaign.module.scss';
import Banner from '@/components/layout/Banner/Banner';
import { Flex, Input, Pagination, Table } from 'antd';
import { HiOutlinePlus } from 'react-icons/hi';
import {
  Campaigns,
  getStatusLabel,
  getStatusVariant,
} from '../component/campaign.type';
import { CampaignDetailModal } from '@/features/campaigns/components/CampaignDetailModal';
import { useGetAllCampaign } from '../component/api/useGetAllCampaign';
import CreateCampaignForm from '../component/Forms/CreateCampaignForm';
import { PiMagnifyingGlass } from 'react-icons/pi';
import { Select } from '@/components/ui/Select/Select';
import { SEARCH_TYPE, SearchType } from '@/features/call/components/call.types';
import { useDebounce } from '@/components/Hooks/useDebounce';
import { DEBOUNCE_TIMEOUT } from '@/components/constants/Constant';
import { TableSkeleton } from '@/components/TableSkeleton/TableSkeleton';
import UploadPage from '@/features/upload/pages/UploadPage';

function Campaign() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [campaignAction, setCampaignAction] = useState<{
    type: 'view' | 'edit' | 'create' | 'upload' | null;
    campaignId: string | null;
  }>({
    type: null,
    campaignId: null,
  });

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

  const { data: campaigns, isPending } = useGetAllCampaign(param);

  const campaignData = campaigns?.data;
  const totalCampaigns = campaigns?.total;

  const handleSearchTypeChange = (value: SearchType) => {
    setSearchType(value);
    setSearchValue('');
    setCurrentPage(1);
  };

  const onSearch = (value: string) => {
    setSearchValue(value);
    setCurrentPage(1);
  };

  const getActionItems = (campaign: any) => {
    const id = campaign?.id || campaign?.campaignId;
    return [
      {
        key: 'view',
        label: 'View Details',
        onClick: () => {
          if (!id) return;

          setCampaignAction({
            type: 'view',
            campaignId: id,
          });
        },
      },
      {
        key: 'edit',
        label: 'Edit',
        onClick: () => {
          if (!id) return;

          setCampaignAction({
            type: 'edit',
            campaignId: id,
          });
        },
      },
      {
        key: 'upload',
        label: 'Upload Csv',
        onClick: () => {
          if (!id) return;

          setCampaignAction({
            type: 'upload',
            campaignId: id,
          });
        },
      },
    ];
  };

  const pagination = {
    current: currentPage,
    total: totalCampaigns,
    pageSize: pageSize,
    showSizeChanger: true,
    pageSizeOptions: [10, 20, 50, 100],
    onChange: (page: number, pageSize: number) => {
      setCurrentPage(page);
      setPageSize(pageSize);
    },
  };

  const columns = [
    {
      title: 'Campaign',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge variant={getStatusVariant(status as any)}>
          {getStatusLabel(status as any)}
        </Badge>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Start / End',
      key: 'date',
      render: (_: any, record: Campaigns) => (
        <>
          {record.start_date} - {record.end_date}
        </>
      ),
    },
    {
      title: 'Conversion rate',
      dataIndex: 'conversion_rate',
      key: 'conversion_rate',
      render: (value: number) => `${value}%`,
    },
    {
      title: 'Spend',
      dataIndex: 'spend',
      key: 'spend',
      render: (value: number) => `${value?.toLocaleString()} credits`,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Campaigns) => (
        <ActionMenu items={getActionItems(record)} />
      ),
    },
  ];

  

  return (
    <div className={styles.container}>
      <Banner>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Campaign</h1>

          <div className={styles.actions}>
            <div className={styles.filters}>
              <Flex gap="small">
                <Select
                  value={searchType}
                  onChange={(value: SearchType) =>
                    handleSearchTypeChange(value)
                  }
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
            </div>

            {/* Create Campaign */}
            <button
              className={styles.createButton}
              onClick={() =>
                setCampaignAction({ type: 'create', campaignId: null })
              }
            >
              <HiOutlinePlus size={18} />
              <span>Create Campaign</span>
            </button>
          </div>
        </div>
      </Banner>

      {/* Table */}
      <div className={styles.tableWrapper}>
        {isPending ? (
          <TableSkeleton rows={10} columns={7} />
        ) : (
          <Table
            bordered={false}
            columns={columns}
            dataSource={campaignData}
            rowKey="id"
            pagination={false}
            className={styles.table}
          />
        )}
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.totalCount}>{totalCampaigns} Campaigns</div>

        <div className={styles.pagination}>
          <Pagination {...pagination} />
        </div>
      </div>

      {/* View Campaign */}
      <CampaignDetailModal
        isOpen={campaignAction.type === 'view' && !!campaignAction.campaignId}
        campaignId={campaignAction.campaignId}
        onClose={() => setCampaignAction({ type: null, campaignId: null })}
      />

      {/* Create / Edit Campaign */}
      <CreateCampaignForm
        isOpen={
          campaignAction.type === 'create' ||
          (campaignAction.type === 'edit' && !!campaignAction.campaignId)
        }
        selectedCampaignId={campaignAction.campaignId}
        onClose={() => setCampaignAction({ type: null, campaignId: null })}
      />
    <UploadPage
  open={campaignAction.type === 'upload' && !!campaignAction.campaignId}
  selectedCampaignId={campaignAction.campaignId}
  onClose={() => setCampaignAction({ type: null, campaignId: null })}
/>
    </div>
  );
}

export default Campaign;
