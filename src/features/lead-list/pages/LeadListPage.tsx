import { useState } from 'react';
import { LeadDetailDrawer } from '../components/LeadDetailDrawer';
import { CallRecord } from '@/types/call';
import { Dropdown } from '@components/ui/Dropdown/Dropdown';
import type { MenuProps } from 'antd';
import styles from './LeadListPage.module.scss';
import Banner from '@/components/layout/Banner/Banner';

// Mock data
const mockLeads: CallRecord[] = [
  {
    id: '1',
    timestamp: '12 Jan, 03:24 PM',
    campaign: 'Winter Sale Blast',
    phone: '+1 98765 12345',
    name: 'Sabrina Carpenter',
    duration: '02:43',
    callStatus: 'interested',
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
    duration: '02:43',
    callStatus: 'callback',
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
    duration: '02:43',
    callStatus: 'interested',
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
    duration: '02:43',
    callStatus: 'no_answer',
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
    duration: '02:43',
    callStatus: 'interested',
    transcript: [],
    callSummary: '',
    notes: '',
  },
  {
    id: '6',
    timestamp: '12 Jan, 03:10 PM',
    campaign: 'Winter Sale Blast',
    phone: '+1 98765 12345',
    name: 'Sabrina Carpenter',
    duration: '02:43',
    callStatus: 'not_interested',
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
    duration: '02:43',
    callStatus: 'interested',
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
    duration: '02:43',
    callStatus: 'callback',
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
    duration: '02:43',
    callStatus: 'interested',
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
    duration: '02:43',
    callStatus: 'no_answer',
    transcript: [],
    callSummary: '',
    notes: '',
  },
];

// Icons
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M14.5 11.5V13.5C14.5 14.0523 14.0523 14.5 13.5 14.5H13C7.20101 14.5 2.5 9.79899 2.5 4V3.5C2.5 2.94772 2.94772 2.5 3.5 2.5H5.5L7 6L5.5 7C6.5 9 8 10.5 10 11.5L11 10L14.5 11.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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

const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M1.5 9C1.5 9 4 4 9 4C14 4 16.5 9 16.5 9C16.5 9 14 14 9 14C4 14 1.5 9 1.5 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
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

// Filter options
const callStatusOptions = [
  { key: 'all', label: 'All Statuses' },
  { key: 'interested', label: 'Interested' },
  { key: 'callback', label: 'Callback scheduled' },
  { key: 'not_interested', label: 'Not Interested' },
  { key: 'no_answer', label: 'No Answer' },
];

const dateOptions = [
  { key: 'today', label: 'Today' },
  { key: 'yesterday', label: 'Yesterday' },
  { key: 'last_7_days', label: 'Last 7 Days' },
  { key: 'last_30_days', label: 'Last 30 Days' },
  { key: 'all_time', label: 'All Time' },
];

export function LeadListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState<CallRecord | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [callStatusFilter, setCallStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('today');
  const totalPages = 3;

  const getCallStatusLabel = () => callStatusOptions.find((o) => o.key === callStatusFilter)?.label || 'Call status';
  const getDateLabel = () => dateOptions.find((o) => o.key === dateFilter)?.label || 'Today';

  const callStatusMenuItems: MenuProps['items'] = callStatusOptions.map((option) => ({
    key: option.key,
    label: option.label,
    onClick: () => setCallStatusFilter(option.key),
  }));

  const dateMenuItems: MenuProps['items'] = dateOptions.map((option) => ({
    key: option.key,
    label: option.label,
    onClick: () => setDateFilter(option.key),
  }));

  const handleViewDetails = (lead: CallRecord) => {
    setSelectedLead(lead);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const filteredLeads = mockLeads.filter((lead) => {
    // Search filter
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.campaign.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery);

    // Call status filter
    const matchesStatus = callStatusFilter === 'all' || lead.callStatus === callStatusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className={styles.container}>
      {/* Header */}
      <Banner>
        <div className={styles.header}>
        <h1 className={styles.title}>Lead List</h1>

        <div className={styles.actions}>
          {/* Search Input */}
          <div className={styles.searchWrapper}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

          {/* Date Filter */}
          <Dropdown items={dateMenuItems} trigger={['click']}>
            <button className={styles.filterButton}>
              <CalendarIcon />
              <span>{getDateLabel()}</span>
              <ChevronDownIcon />
            </button>
          </Dropdown>

          {/* Download Button */}
          <button className={styles.iconButton}>
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
              <th>Duration</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr key={lead.id}>
                <td>{lead.timestamp}</td>
                <td>{lead.campaign}</td>
                <td>{lead.phone}</td>
                <td>{lead.name}</td>
                <td>{lead.duration}</td>
                <td>
                  <button
                    className={styles.viewButton}
                    onClick={() => handleViewDetails(lead)}
                    aria-label="View details"
                  >
                    <EyeIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.totalCount}>
          {filteredLeads.length} Leads
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

      {/* Lead Detail Drawer */}
      <LeadDetailDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        lead={selectedLead}
      />
    </div>
  );
}
