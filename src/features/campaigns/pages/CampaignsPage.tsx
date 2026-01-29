import { useState } from 'react';
import { Badge } from '@components/ui/Badge/Badge';
import { ActionMenu } from '@components/ui/ActionMenu/ActionMenu';
import { Dropdown } from '@components/ui/Dropdown/Dropdown';
import type { MenuProps } from 'antd';
import { CampaignDetailModal } from '../components/CampaignDetailModal';
import { CreateCampaignModal } from '../components/CreateCampaignModal';
import styles from './CampaignsPage.module.scss';

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

// Icons
const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M14 4H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M6 4H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="8" cy="4" r="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M14 12H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M6 12H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="8" cy="12" r="1.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const GearIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 1V3M8 13V15M1 8H3M13 8H15M2.93 2.93L4.34 4.34M11.66 11.66L13.07 13.07M2.93 13.07L4.34 11.66M11.66 4.34L13.07 2.93" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="3" width="12" height="11" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2 6H14" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M5 1V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M11 1V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronLeftIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M8.5 10L5.5 7L8.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M5.5 4L8.5 7L5.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

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

// Filter options
const campaignTypeOptions = [
  { key: 'all', label: 'All Types' },
  { key: 'onboarding', label: 'Onboarding' },
  { key: 'lead_generation', label: 'Lead generation' },
  { key: 'reminder', label: 'Reminder' },
];

const statusOptions = [
  { key: 'all', label: 'All Statuses' },
  { key: 'active', label: 'Active' },
  { key: 'paused', label: 'Paused' },
  { key: 'completed', label: 'Completed' },
];

const dateOptions = [
  { key: 'today', label: 'Today' },
  { key: 'yesterday', label: 'Yesterday' },
  { key: 'last_7_days', label: 'Last 7 Days' },
  { key: 'last_30_days', label: 'Last 30 Days' },
  { key: 'all_time', label: 'All Time' },
];

export function CampaignsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [campaignTypeFilter, setCampaignTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('today');
  const totalPages = 3;

  const getCampaignTypeLabel = () => campaignTypeOptions.find((o) => o.key === campaignTypeFilter)?.label || 'Campaign Type';
  const getStatusFilterLabel = () => statusOptions.find((o) => o.key === statusFilter)?.label || 'Status';
  const getDateLabel = () => dateOptions.find((o) => o.key === dateFilter)?.label || 'Today';

  const campaignTypeMenuItems: MenuProps['items'] = campaignTypeOptions.map((option) => ({
    key: option.key,
    label: option.label,
    onClick: () => setCampaignTypeFilter(option.key),
  }));

  const statusMenuItems: MenuProps['items'] = statusOptions.map((option) => ({
    key: option.key,
    label: option.label,
    onClick: () => setStatusFilter(option.key),
  }));

  const dateMenuItems: MenuProps['items'] = dateOptions.map((option) => ({
    key: option.key,
    label: option.label,
    onClick: () => setDateFilter(option.key),
  }));

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
      (campaignTypeFilter === 'lead_generation' && campaign.type === 'Lead generation') ||
      (campaignTypeFilter === 'reminder' && campaign.type === 'Reminder');

    // Status filter
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;

    return matchesType && matchesStatus;
  });

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Campaign</h1>

        <div className={styles.actions}>
          {/* Campaign Type Filter */}
          <Dropdown items={campaignTypeMenuItems} trigger={['click']}>
            <button className={styles.filterButton}>
              <FilterIcon />
              <span>{getCampaignTypeLabel()}</span>
              <ChevronDownIcon />
            </button>
          </Dropdown>

          {/* Status Filter */}
          <Dropdown items={statusMenuItems} trigger={['click']}>
            <button className={styles.filterButton}>
              <GearIcon />
              <span>{getStatusFilterLabel()}</span>
              <ChevronDownIcon />
            </button>
          </Dropdown>

          {/* Date Filter */}
          <Dropdown items={dateMenuItems} trigger={['click']}>
            <button className={styles.filterButton}>
              <CalendarIcon />
              <span>{getDateLabel()}</span>
              <ChevronDownIcon />
            </button>
          </Dropdown>

          {/* Create Campaign Button */}
          <button className={styles.createButton} onClick={() => setIsCreateModalOpen(true)}>
            <PlusIcon />
            <span>Create Campaign</span>
          </button>
        </div>
      </div>

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
                <td>{campaign.startDate} – {campaign.endDate}</td>
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
          <button
            className={styles.paginationButton}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
          >
            <ChevronLeftIcon />
            <ChevronLeftIcon />
          </button>

          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={`${styles.paginationNumber} ${currentPage === page ? styles.active : ''}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            className={styles.paginationButton}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
          >
            <ChevronRightIcon />
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      {/* Campaign Detail Modal */}
      {selectedCampaign && (
        <CampaignDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          campaign={selectedCampaign}
        />
      )}

      {/* Create Campaign Modal */}
      <CreateCampaignModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
