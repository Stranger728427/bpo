import { useState } from 'react';
import { Badge } from '@components/ui/Badge/Badge';
import { ActionMenu } from '@components/ui/ActionMenu/ActionMenu';
// import { CampaignDetailModal } from '../components/CampaignDetailModal';
// import { CreateCampaignModal } from '../components/CreateCampaignModal';
import styles from './Campaign.module.scss';
import Banner from '@/components/layout/Banner/Banner';
import { Pagination } from 'antd';
import { HiOutlinePlus } from 'react-icons/hi';

// Types
interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  type: string;
  startDate: string;
  endDate: string;
  callsMade: number;
  conversionRate: number;
  spend: number;
}

// Mock data
const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Winter Sale Blast',
    status: 'active',
    type: 'Onboarding',
    startDate: 'Jan 12',
    endDate: 'Feb 2',
    callsMade: 4320,
    conversionRate: 18.5,
    spend: 2450,
  },
  {
    id: '2',
    name: 'Winter Sale Blast',
    status: 'paused',
    type: 'Lead generation',
    startDate: 'Jan 12',
    endDate: 'Feb 2',
    callsMade: 4320,
    conversionRate: 18.5,
    spend: 2450,
  },
  {
    id: '3',
    name: 'Renewal Follow-up',
    status: 'completed',
    type: 'Reminder',
    startDate: 'Jan 12',
    endDate: 'Feb 2',
    callsMade: 4320,
    conversionRate: 18.5,
    spend: 2450,
  },
];

const getStatusVariant = (status: Campaign['status']) => {
  switch (status) {
    case 'active':
      return 'success';
    case 'paused':
      return 'warning';
    case 'completed':
      return 'default';
    default:
      return 'default';
  }
};

const getStatusLabel = (status: Campaign['status']) => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

  function Campaign() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [campaignTypeFilter, setCampaignTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleViewDetails = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
  };

  const getActionItems = (campaign: Campaign) => [
    {
      key: 'view',
      label: 'View Details',
      onClick: () => handleViewDetails(campaign),
    },
    {
      key: 'edit',
      label: 'Edit',
      onClick: () => console.log('Edit', campaign.id),
    },
    {
      key: 'resume',
      label: campaign.status === 'paused' ? 'Resume' : 'Pause',
      onClick: () => console.log('Resume/Pause', campaign.id),
    },
    {
      key: 'end',
      label: 'End',
      danger: true,
      onClick: () => console.log('End', campaign.id),
    },
  ];

  const filteredCampaigns = mockCampaigns.filter((campaign) => {
    // Campaign type filter
    const matchesType =
      campaignTypeFilter === 'all' ||
      (campaignTypeFilter === 'onboarding' && campaign.type === 'Onboarding') ||
      (campaignTypeFilter === 'lead_generation' &&
        campaign.type === 'Lead generation') ||
      (campaignTypeFilter === 'reminder' && campaign.type === 'Reminder');

    // Status filter
    const matchesStatus =
      statusFilter === 'all' || campaign.status === statusFilter;

    return matchesType && matchesStatus;
  });

 const pagination = {
    current: currentPage,
    total: 10,
    pageSize: 10,
    showSizeChanger: false,
    onChange: (page: number) => setCurrentPage(page),
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
              onClick={() => setIsCreateModalOpen(true)}
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
            {filteredCampaigns.map((campaign) => (
              <tr key={campaign.id}>
                <td>{campaign.name}</td>
                <td>
                  <Badge variant={getStatusVariant(campaign.status)}>
                    {getStatusLabel(campaign.status)}
                  </Badge>
                </td>
                <td>{campaign.type}</td>
                <td>
                  {campaign.startDate} – {campaign.endDate}
                </td>
                <td>{campaign.callsMade.toLocaleString()}</td>
                <td>{campaign.conversionRate}%</td>
                <td>{campaign.spend.toLocaleString()} credits</td>
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
        <div className={styles.totalCount}>
          {filteredCampaigns.length} Campaigns
        </div>

        <div className={styles.pagination}>
          <Pagination {...pagination}/>
        </div>
      </div>

      {/* Campaign Detail Modal */}
      {/* {selectedCampaign && (
        <CampaignDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          campaign={selectedCampaign}
        />
      )} */}

      {/* Create Campaign Modal */}
      {/* <CreateCampaignModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      /> */}
    </div>
  );
}

export default Campaign