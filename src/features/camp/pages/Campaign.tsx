import { useMemo, useState } from 'react';
import { Badge } from '@components/ui/Badge/Badge';
import { ActionMenu } from '@components/ui/ActionMenu/ActionMenu';
import styles from './Campaign.module.scss';
import Banner from '@/components/layout/Banner/Banner';
import { Flex, Input, Pagination, Table } from 'antd';
import { HiOutlinePlus } from 'react-icons/hi';
import { PiMagnifyingGlass } from 'react-icons/pi';
import {
  CAMPAIGN_FILTERS,
  Campaigns,
  CampaignStatus,
  getStatusLabel,
  getStatusVariant,
} from '../component/campaign.type';
import { useGetAllCampaign } from '../component/api/useGetAllCampaign';
import CreateCampaignForm from '../component/Forms/CreateCampaignForm';
import { Select } from '@/components/ui/Select/Select';
import { useDebounce } from '@/components/Hooks/useDebounce';
import { DATE_FORMAT, DEBOUNCE_TIMEOUT } from '@/components/constants/Constant';
import { TableSkeleton } from '@/components/TableSkeleton/TableSkeleton';
import { CampaignDetailModal } from '../component/viewDetails/CampaignDetailModal';
import useGlobalDate from '@/components/Hooks/useDateUtils';

type CampaignActionType = 'view' | 'edit' | 'create';

type CampaignAction = {
  type: CampaignActionType | null;
  campaignId: string | null;
};

const CLOSED_ACTION: CampaignAction = { type: null, campaignId: null };

function Campaign() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [campaignAction, setCampaignAction] = useState<CampaignAction>(CLOSED_ACTION);
  const [searchType, setSearchType] = useState<CAMPAIGN_FILTERS>(CAMPAIGN_FILTERS.NAME);
  const [searchValue, setSearchValue] = useState('');

  const debouncedSearchValue = useDebounce(searchValue, DEBOUNCE_TIMEOUT);
  const { getLocal } = useGlobalDate();

  const param = useMemo(() => ({
    page: currentPage,
    page_size: pageSize,
    ...(debouncedSearchValue && { [searchType]: debouncedSearchValue }),
  }), [currentPage, pageSize, debouncedSearchValue, searchType]);

  const { data: campaigns, isPending } = useGetAllCampaign(param);

  const campaignData = campaigns?.data;
  const totalCampaigns = campaigns?.total ?? 0;

  const handleSearchTypeChange = (value: CAMPAIGN_FILTERS) => {
    setSearchType(value);
    setSearchValue('');
    setCurrentPage(1);
  };

  const onSearch = (value: string) => {
    setSearchValue(value);
    setCurrentPage(1);
  };

  const getActionItems = (campaign: Campaigns) => [
    {
      key: 'view',
      label: 'View Details',
      onClick: () => setCampaignAction({ type: 'view', campaignId: campaign?.id }),
    },
    {
      key: 'edit',
      label: 'Edit',
      onClick: () => setCampaignAction({ type: 'edit', campaignId: campaign?.id }),
    },
  ];

  const pagination = useMemo(() => ({
    current: currentPage,
    total: totalCampaigns,
    pageSize,
    showSizeChanger: true,
    pageSizeOptions: [20, 50, 100],
    onChange: (page: number, size: number) => {
      setCurrentPage(page);
      setPageSize(size);
    },
  }), [currentPage, totalCampaigns, pageSize]);

  const columns = useMemo(() => [
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
        <Badge variant={getStatusVariant(status as CampaignStatus)}>
          {getStatusLabel(status as CampaignStatus)}
        </Badge>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Start Date - End Date',
      key: 'date',
      render: (_: unknown, record: Campaigns) => (
        <>
          {getLocal(record.start_date).format(DATE_FORMAT.AbbreviatedDayMonthYear)}
          {' - '}
          {getLocal(record.end_date).format(DATE_FORMAT.AbbreviatedDayMonthYear)}
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
      render: (_: unknown, record: Campaigns) => (
        <ActionMenu items={getActionItems(record)} />
      ),
    },
  ], [getLocal]);

  return (
    <div className={styles.container}>
      <Banner>
        <div className={styles.header}>
          <h1 className={styles.title}>Campaign</h1>

          <div className={styles.actions}>
            <div className={styles.filters}>
              <Flex gap="small">
                <Select
                  value={searchType}
                  onChange={handleSearchTypeChange}
                  options={[
                    { label: 'Campaign', value: CAMPAIGN_FILTERS.NAME },
                    { label: 'Status', value: CAMPAIGN_FILTERS.STATUS },
                    { label: 'Type', value: CAMPAIGN_FILTERS.TYPE },
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
        onClose={() => setCampaignAction(CLOSED_ACTION)}
      />

      {/* Create / Edit Campaign */}
      <CreateCampaignForm
        isOpen={
          campaignAction.type === 'create' ||
          (campaignAction.type === 'edit' && !!campaignAction.campaignId)
        }
        selectedCampaignId={
          campaignAction.type === 'edit' ? campaignAction.campaignId : null
        }
        onClose={() => setCampaignAction(CLOSED_ACTION)}
      />
    </div>
  );
}

export default Campaign;