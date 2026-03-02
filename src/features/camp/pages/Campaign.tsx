import { useMemo, useState } from 'react';
import { Badge } from '@components/ui/Badge/Badge';
import { ActionMenu } from '@components/ui/ActionMenu/ActionMenu';
import styles from './Campaign.module.scss';
import Banner from '@/components/layout/Banner/Banner';
import { Flex, Input, Pagination } from 'antd';
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

function Campaign() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [campaignAction, setCampaignAction] = useState<{
    type: 'view' | 'edit' | null;
    campaignId?: string;
  }>({
    type: null,
  });
  const [isCreateCampaignModalOpen, setIsCreateCampaignModalOpen] =
    useState(false);
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

  const { data: campaigns } = useGetAllCampaign(param);

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

  const getActionItems = (campaign: Campaigns) => [
    {
      key: 'view',
      label: 'View Details',
      onClick: () =>
        setCampaignAction({
          type: 'view',
          campaignId: campaign.id,
        }),
    },
    {
      key: 'edit',
      label: 'Edit',
      onClick: () =>
        setCampaignAction({
          type: 'edit',
          campaignId: campaign.id,
        }),
    },
    {
      key: 'end',
      label: 'End',
      danger: true,
      onClick: () => console.log('End', campaign.id),
    },
  ];
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

  return (
    <div className={styles.container}>
      <Banner>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Campaign</h1>
          <div className={styles.actions}>
            <div className={styles.filters}>
              <Flex gap={'small'}>
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

            {/* Create Campaign Button */}
            <button
              className={styles.createButton}
              onClick={() => setIsCreateCampaignModalOpen(true)}
            >
              <HiOutlinePlus size={18} />
              <span>Create Campaign</span>
            </button>
          </div>
        </div>
      </Banner>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Campaign</th>
              <th>Status</th>
              <th>Type</th>
              <th>Start / End</th>
              <th>Calls made</th>
              <th>Conversion rate</th>
              <th>Spend</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {campaignData?.map((campaign: Campaigns) => (
              <tr key={campaign?.id}>
                <td>{campaign?.name}</td>
                <td>
                  <Badge variant={getStatusVariant(campaign?.status)}>
                    {getStatusLabel(campaign?.status)}
                  </Badge>
                </td>
                <td>{campaign?.type}</td>
                <td>
                  {campaign?.start_date} – {campaign?.end_date}
                </td>
                <td>{campaign?.calls_made?.toLocaleString()}</td>
                <td>{campaign?.conversion_rate}%</td>
                <td>{campaign?.spend?.toLocaleString()} credits</td>
                <td>
                  <ActionMenu items={getActionItems(campaign)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.totalCount}>{totalCampaigns} Campaigns</div>

        <div className={styles.pagination}>
          <Pagination {...pagination} />
        </div>
      </div>

      {/* Campaign Detail Modal */}
      <CampaignDetailModal
        isOpen={campaignAction.type === 'view'}
        campaignId={campaignAction.campaignId!}
        onClose={() => setCampaignAction({ type: null })}
      />

      {/* Create Campaign Form */}
      <CreateCampaignForm
        isOpen={campaignAction.type === 'edit'}
        selectedCampaignId={campaignAction.campaignId!}
        onClose={() => setCampaignAction({ type: null })}
      />
    </div>
  );
}

export default Campaign;
