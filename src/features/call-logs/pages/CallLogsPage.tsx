import { useState } from 'react';
import { CallLogDetailDrawer } from '../components/CallLogDetailDrawer';
import { CallRecord } from '@/types/call';
import { Dropdown } from '@components/ui/Dropdown/Dropdown';
import type { MenuProps } from 'antd';
import styles from './CallLogsPage.module.scss';
import Banner from '@/components/layout/Banner/Banner';

// Mock data for call logs
const mockCallLogs: CallRecord[] = [
  {
    id: '1',
    timestamp: '12 Jan, 03:24 PM',
    campaign: 'Winter Sale Blast',
    phone: '+1 98765 12345',
    name: 'Sabrina Carpenter',
    callStatus: 'callback',
    cost: 0.5439,
    duration: '02:43',
    transcript: [
      {
        id: '1',
        speaker: 'ai',
        timestamp: '3:48',
        duration: '00:01',
        message: 'Thank you for calling Accident Centers of Texas. This is Riley. Which language would you like to continue in, English or Spanish?',
      },
      {
        id: '2',
        speaker: 'caller',
        timestamp: '3:48',
        duration: '00:01',
        message: 'Thank you for calling Accident Centers of Texas. This is Riley. Which language would you like to continue in, English or Spanish?',
      },
    ],
    callSummary: 'The call began with an AI offering language selection, to which the user chose Spanish. The user identified themselves as a new patient, and the AI offered to schedule an appointment, asking for their full name. The call ended before the user could provide their name.',
    notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
  },
  {
    id: '2',
    timestamp: '12 Jan, 03:10 PM',
    campaign: 'Winter Sale Blast',
    phone: '+1 98765 12345',
    name: 'Sabrina',
    callStatus: 'callback',
    cost: 0.5439,
    duration: '02:43',
    transcript: [],
    callSummary: '',
    notes: '',
  },
  {
    id: '3',
    timestamp: '12 Jan, 03:24 PM',
    campaign: 'Renewal Follow-up',
    phone: '+1 98765 12345',
    name: 'Sabrina Carpenter',
    callStatus: 'not_interested',
    cost: 0.5439,
    duration: '02:43',
    transcript: [],
    callSummary: '',
    notes: '',
  },
  {
    id: '4',
    timestamp: '12 Jan, 03:10 PM',
    campaign: 'Winter Sale Blast',
    phone: '+1 98765 12345',
    name: 'Sabrina',
    callStatus: 'callback',
    cost: 0.5439,
    duration: '02:43',
    transcript: [],
    callSummary: '',
    notes: '',
  },
  {
    id: '5',
    timestamp: '12 Jan, 03:24 PM',
    campaign: 'New User Onboarding',
    phone: '+1 98765 12345',
    name: 'Sabrina Carpenter',
    callStatus: 'callback',
    cost: 0.5439,
    duration: '02:43',
    transcript: [
      {
        id: '1',
        speaker: 'ai',
        timestamp: '3:48',
        duration: '00:01',
        message: 'Thank you for calling Accident Centers of Texas. This is Riley. Which language would you like to continue in, English or Spanish?',
      },
      {
        id: '2',
        speaker: 'caller',
        timestamp: '3:48',
        duration: '00:01',
        message: 'Thank you for calling Accident Centers of Texas. This is Riley. Which language would you like to continue in, English or Spanish?',
      },
    ],
    callSummary: 'The call began with an AI offering language selection, to which the user chose Spanish. The user identified themselves as a new patient, and the AI offered to schedule an appointment, asking for their full name. The call ended before the user could provide their name.',
    notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
  },
  {
    id: '6',
    timestamp: '12 Jan, 03:10 PM',
    campaign: 'Winter Sale Blast',
    phone: '+1 98765 12345',
    name: 'Sabrina Carpenter',
    callStatus: 'callback',
    cost: 0.5439,
    duration: '02:43',
    transcript: [],
    callSummary: '',
    notes: '',
  },
  {
    id: '7',
    timestamp: '12 Jan, 03:24 PM',
    campaign: 'Renewal Follow-up',
    phone: '+1 98765 12345',
    name: 'Sabrina',
    callStatus: 'callback',
    cost: 0.5439,
    duration: '02:43',
    transcript: [],
    callSummary: '',
    notes: '',
  },
  {
    id: '8',
    timestamp: '12 Jan, 03:10 PM',
    campaign: 'Winter Sale Blast',
    phone: '+1 98765 12345',
    name: 'Sabrina Carpenter',
    callStatus: 'callback',
    cost: 0.5439,
    duration: '02:43',
    transcript: [],
    callSummary: '',
    notes: '',
  },
  {
    id: '9',
    timestamp: '12 Jan, 03:24 PM',
    campaign: 'New User Onboarding',
    phone: '+1 98765 12345',
    name: 'Sabrina',
    callStatus: 'not_interested',
    cost: 0.5439,
    duration: '02:43',
    transcript: [],
    callSummary: '',
    notes: '',
  },
  {
    id: '10',
    timestamp: '12 Jan, 03:10 PM',
    campaign: 'Renewal Follow-up',
    phone: '+1 98765 12345',
    name: 'Sabrina Carpenter',
    callStatus: 'callback',
    cost: 0.5439,
    duration: '02:43',
    transcript: [],
    callSummary: '',
    notes: '',
  },
];

// Icons
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M14 11V13C14 13.5523 13.5523 14 13 14C6.92487 14 2 9.07513 2 3C2 2.44772 2.44772 2 3 2H5C5.27614 2 5.5 2.22386 5.5 2.5C5.5 3.60857 5.7 4.66684 6.068 5.652L4.624 7.096C5.528 8.856 6.944 10.272 8.704 11.176L10.148 9.732C11.1332 10.1 12.1914 10.3 13.3 10.3C13.5761 10.3 13.8 10.5239 13.8 10.8V11H14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M14 4H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M6 4H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="8" cy="4" r="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M14 12H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M6 12H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="8" cy="12" r="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6 8H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M14 8H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="8" cy="8" r="1.5" stroke="currentColor" strokeWidth="1.5" />
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

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 2V10M8 10L5 7M8 10L11 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ViewIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M1.5 9C1.5 9 4.125 3.75 9 3.75C13.875 3.75 16.5 9 16.5 9C16.5 9 13.875 14.25 9 14.25C4.125 14.25 1.5 9 1.5 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="9" cy="9" r="2.25" stroke="currentColor" strokeWidth="1.5"/>
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

// Status display helper
const getStatusDisplay = (status: CallRecord['callStatus']) => {
  switch (status) {
    case 'callback':
      return { label: 'Callback scheduled', className: styles.statusCallback };
    case 'not_interested':
      return { label: 'Not Interested', className: styles.statusNotInterested };
    case 'interested':
      return { label: 'Interested', className: styles.statusInterested };
    case 'no_answer':
      return { label: 'No Answer', className: styles.statusNoAnswer };
    default:
      return { label: status, className: '' };
  }
};

// Filter options
const callStatusOptions = [
  { key: 'all', label: 'All Statuses' },
  { key: 'callback', label: 'Callback scheduled' },
  { key: 'not_interested', label: 'Not Interested' },
  { key: 'interested', label: 'Interested' },
  { key: 'no_answer', label: 'No Answer' },
];

const campaignOptions = [
  { key: 'all', label: 'All Campaigns' },
  { key: 'winter_sale', label: 'Winter Sale Blast' },
  { key: 'renewal', label: 'Renewal Follow-up' },
  { key: 'onboarding', label: 'New User Onboarding' },
];

const dateOptions = [
  { key: 'today', label: 'Today' },
  { key: 'yesterday', label: 'Yesterday' },
  { key: 'last_7_days', label: 'Last 7 Days' },
  { key: 'last_30_days', label: 'Last 30 Days' },
  { key: 'all_time', label: 'All Time' },
];

  function CallLogsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCallLog, setSelectedCallLog] = useState<CallRecord | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [callStatusFilter, setCallStatusFilter] = useState('all');
  const [campaignFilter, setCampaignFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('today');
  const totalCalls = 1248;
  const totalPages = 3;

  const getCallStatusLabel = () => callStatusOptions.find((o) => o.key === callStatusFilter)?.label || 'Call status';
  const getCampaignLabel = () => campaignOptions.find((o) => o.key === campaignFilter)?.label || 'Campaign';
  const getDateLabel = () => dateOptions.find((o) => o.key === dateFilter)?.label || 'Today';

  const callStatusMenuItems: MenuProps['items'] = callStatusOptions.map((option) => ({
    key: option.key,
    label: option.label,
    onClick: () => setCallStatusFilter(option.key),
  }));

  const campaignMenuItems: MenuProps['items'] = campaignOptions.map((option) => ({
    key: option.key,
    label: option.label,
    onClick: () => setCampaignFilter(option.key),
  }));

  const dateMenuItems: MenuProps['items'] = dateOptions.map((option) => ({
    key: option.key,
    label: option.label,
    onClick: () => setDateFilter(option.key),
  }));

  const handleViewDetails = (callLog: CallRecord) => {
    setSelectedCallLog(callLog);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const filteredCallLogs = mockCallLogs.filter((log) => {
    // Search filter
    const matchesSearch =
      log.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.campaign.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.phone.includes(searchQuery);

    // Call status filter
    const matchesStatus = callStatusFilter === 'all' || log.callStatus === callStatusFilter;

    // Campaign filter
    const matchesCampaign =
      campaignFilter === 'all' ||
      (campaignFilter === 'winter_sale' && log.campaign === 'Winter Sale Blast') ||
      (campaignFilter === 'renewal' && log.campaign === 'Renewal Follow-up') ||
      (campaignFilter === 'onboarding' && log.campaign === 'New User Onboarding');

    return matchesSearch && matchesStatus && matchesCampaign;
  });

  return (
    <div className={styles.container}>
      {/* Header */}
      <Banner>
        <div className={styles.header}>
        <h1 className={styles.title}>Call Logs</h1>

        <div className={styles.filters}>
          {/* Search */}
          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            <span className={styles.searchIcon}>
              <SearchIcon />
            </span>
          </div>

          {/* Call Status Filter */}
          <Dropdown items={callStatusMenuItems} trigger={['click']}>
            <button className={styles.filterButton}>
              <PhoneIcon />
              <span>{getCallStatusLabel()}</span>
              <ChevronDownIcon />
            </button>
          </Dropdown>

          {/* Campaign Filter */}
          <Dropdown items={campaignMenuItems} trigger={['click']}>
            <button className={styles.filterButton}>
              <FilterIcon />
              <span>{getCampaignLabel()}</span>
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

          {/* Download Button */}
          <button className={styles.downloadButton}>
            <DownloadIcon />
          </button>
        </div>
      </div>
      </Banner>
      

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Campaign</th>
              <th>Phone</th>
              <th>Name</th>
              <th>Call Status</th>
              <th>Cost</th>
              <th>Duration</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCallLogs.map((log) => {
              const statusDisplay = getStatusDisplay(log.callStatus);
              return (
                <tr key={log.id}>
                  <td>{log.timestamp}</td>
                  <td>{log.campaign}</td>
                  <td>{log.phone}</td>
                  <td>{log.name}</td>
                  <td>
                    <span className={`${styles.status} ${statusDisplay.className}`}>
                      {statusDisplay.label}
                    </span>
                  </td>
                  <td>$ {log.cost?.toFixed(4)}</td>
                  <td>{log.duration}</td>
                  <td>
                    <button
                      className={styles.actionButton}
                      onClick={() => handleViewDetails(log)}
                      aria-label="View details"
                    >
                      <ViewIcon />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
        
         {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.totalCount}>
          {totalCalls.toLocaleString()} Calls
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

      {/* Call Log Detail Drawer */}
      <CallLogDetailDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        callLog={selectedCallLog}
      />
    </div>
  );
}

export default CallLogsPage