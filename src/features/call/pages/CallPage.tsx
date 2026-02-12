import Banner from '@/components/layout/Banner/Banner';
import styles from './Call.module.scss';
import { BiPhoneIncoming } from 'react-icons/bi';
import { PiEye } from 'react-icons/pi';
import { useCall } from '../components/useCall';
import { useState } from 'react';
import {
  Call,
  getStatusVariant,
  getStatusLabel,
} from '../components/call.types';
import ViewCall from './ViewCall';
import { Button, Pagination } from 'antd';
import { MdOutlineUpload } from 'react-icons/md';
import UploadPage from '@/features/upload/pages/UploadPage';
import TriggerCallDetails from '../components/triggerCallsView/TriggerCallDetails';
import { TableSkeleton } from '@/components/TableSkeleton/TableSkeleton';
import { Badge } from '@/components/ui/Badge/Badge';

export const CallPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isTriggerModalOpen, setIsTriggerModalOpen] = useState<boolean>(false);
  const [selectedCallId, setSelectedCallId] = useState<string | null>(null);

  const { getCallLogs, getTriggerCall } = useCall(
    selectedCallId as string,
    currentPage,
    10,
    isTriggerModalOpen
  );

  const callLogs = getCallLogs?.data?.data;

  const totalItems = getCallLogs?.data?.total || 0;

  const pagination = {
    current: currentPage,
    total: totalItems,
    pageSize: 10,
    showSizeChanger: false,
    onChange: (page: number) => setCurrentPage(page),
  };

  const handleViewDetails = (id: string) => {
    setSelectedCallId(id);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <Banner>
        <div className={styles.header}>
          <h1 className={styles.title}>Call</h1>

          <div className={styles.filters}>
            <Button onClick={handleModalOpen}>
              <MdOutlineUpload />
              <span>Upload Contacts</span>
            </Button>
            {isModalOpen && (
              <UploadPage
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />
            )}

            {isTriggerModalOpen && (
              <TriggerCallDetails
                open={isTriggerModalOpen}
                onClose={() => setIsTriggerModalOpen(false)}
                callsTrigger={getTriggerCall}
              />
            )}
            {/* Search */}
            {/* <div className={styles.searchWrapper}>
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              <span className={styles.searchIcon}>
                <IoSearchOutline />
              </span>
            </div> */}

            <Button onClick={() => setIsTriggerModalOpen(true)}>
              <BiPhoneIncoming />
              <span>Trigger Call</span>
            </Button>

            {/* Call Status Filter */}
            {/* <Dropdown items={callStatusMenuItems as any} trigger={['click']}>
              <button className={styles.filterButton}>
                <BiPhoneIncoming />
                <span>{getCallStatusLabel()}</span>
                <IoChevronDownCircleOutline />
              </button>
            </Dropdown> */}

            {/* Campaign Filter */}
            {/* <Dropdown items={campaignMenuItems as any} trigger={['click']}>
              <button className={styles.filterButton}>
                <IoFilterCircleOutline />
                <span>{getCampaignLabel()}</span>
                <IoChevronDownCircleOutline />
              </button>
            </Dropdown> */}

            {/* Date Filter */}
            {/* <Dropdown items={dateMenuItems as any} trigger={['click']}>
              <button className={styles.filterButton}>
                <SlCalender />
                <span>{getDateLabel()}</span>
                <IoChevronDownCircleOutline />
              </button>
            </Dropdown> */}

            {/* Download Button */}
            {/* <button className={styles.downloadButton}>
              <LiaDownloadSolid />
            </button> */}
          </div>
        </div>
      </Banner>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {/* <th>Timestamp</th>
              <th>Campaign</th> */}
              <th>Patient Name</th>
              <th>Phone</th>
              <th>Call Status</th>
              <th>Intent</th>
              <th>Duration</th>
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
                    {/* <td>{log?.creation_date}</td>
                  <td>{log?.campaign_name}</td> */}
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
            </tbody>
          )}
        </table>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.totalCount}>{callLogs?.length} Calls</div>

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
