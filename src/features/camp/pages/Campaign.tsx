import { useMemo, useState } from 'react';
import { Badge } from '@components/ui/Badge/Badge';
import { ActionMenu } from '@components/ui/ActionMenu/ActionMenu';
import styles from './Campaign.module.scss';
import Banner from '@/components/layout/Banner/Banner';
import { Pagination } from 'antd';
import { HiOutlinePlus } from 'react-icons/hi';
import { useGetAllCampaign } from '../component/services/api/useGetAllCampaign';
import {
  Campaigns,
  getStatusLabel,
  getStatusVariant,
} from '../component/campaign.type';

function Campaign() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(
    null
  );
  const [isCreateCampaignModalOpen, setIsCreateCampaignModalOpen] =
    useState(false);

  const param = useMemo(() => {
    return {
      page: currentPage,
      page_size: pageSize,
    };
  }, [currentPage, pageSize]);

  const { data: campaigns } = useGetAllCampaign(param);

  const campaignData = campaigns?.data;
  const totalCampaigns = campaigns?.total;

  const handleViewDetails = (id: string) => {
    setSelectedCampaignId(id);
  };

  const getActionItems = (campaign: Campaigns) => [
    {
      key: 'view',
      label: 'View Details',
      onClick: () => handleViewDetails(campaign?.id),
    },
    {
      key: 'edit',
      label: 'Edit',
      onClick: () => console.log('Edit', campaign.id),
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
      {/* {selectedCampaignId && (
        <CampaignDetailModal
          isOpen={Boolean(selectedCampaignId)}
          onClose={() => setSelectedCampaignId(null)}
          campaignId={selectedCampaignId}
        />
      )} */}

      {/* Create Campaign Modal */}
      {/* <CreateCampaignModal
        isOpen={isCreateCampaignModalOpen}
        onClose={() => setIsCreateCampaignModalOpen(false)}
      /> */}
    </div>
  );
}

export default Campaign;
