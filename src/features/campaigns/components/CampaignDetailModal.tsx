import { Badge } from '@components/ui/Badge/Badge';
import styles from './CampaignDetailModal.module.scss';

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

interface CampaignDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: Campaign;
}

// Icons
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <path d="M15 9L9 15M9 9L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M20 16V19C20 19.5523 19.5523 20 19 20C10.1634 20 3 12.8366 3 4C3 3.44772 3.44772 3 4 3H7C7.27614 3 7.5 3.22386 7.5 3.5C7.5 5.32071 7.875 7.06284 8.565 8.66L6.17 11.055C7.865 14.355 10.645 17.135 13.945 18.83L16.34 16.435C17.9372 17.125 19.6793 17.5 21.5 17.5C21.7761 17.5 22 17.7239 22 18V16H20Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PercentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="17" cy="17" r="3" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DollarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 7V17M15 9.5C15 8.11929 13.6569 7 12 7C10.3431 7 9 8.11929 9 9.5C9 10.8807 10.3431 12 12 12C13.6569 12 15 13.1193 15 14.5C15 15.8807 13.6569 17 12 17C10.3431 17 9 15.8807 9 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M10 1H13V4M13 1L7 7M5 2H3C1.89543 2 1 2.89543 1 4V11C1 12.1046 1.89543 13 3 13H10C11.1046 13 12 12.1046 12 11V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Mock performance data
const performanceData = [
  { date: '4 Dec', calls: 50, conversion: 30 },
  { date: '5 Dec', calls: 80, conversion: 55 },
  { date: '6 Dec', calls: 180, conversion: 68 },
  { date: '7 Dec', calls: 150, conversion: 85 },
  { date: '8 Dec', calls: 200, conversion: 95 },
  { date: '9 Dec', calls: 230, conversion: 105 },
  { date: '10 Dec', calls: 210, conversion: 110 },
];

// Call outcomes data
const outcomesData = [
  { label: 'Connected', value: 42, color: '#8b5cf6' },
  { label: 'No Answer', value: 35, color: '#c4b5fd' },
  { label: 'Busy / Failed', value: 23, color: '#6b7280' },
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

export function CampaignDetailModal({ isOpen, onClose, campaign }: CampaignDetailModalProps) {
  if (!isOpen) return null;

  const chartHeight = 200;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <span className={styles.breadcrumb}>Campaign / {campaign.name}</span>
            <h2 className={styles.title}>Campaign Details</h2>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Campaign Info Card */}
          <div className={styles.infoCard}>
            <div className={styles.infoMain}>
              <h3 className={styles.campaignName}>{campaign.name}</h3>
              <div className={styles.infoMeta}>
                <span>Type: <strong>Lead generation</strong></span>
                <span>Contacts: <strong>2,842 contacts</strong></span>
                <span>
                  AI prompt: <strong>AI Voice Script v3</strong>
                  <ExternalLinkIcon />
                </span>
              </div>
              <div className={styles.infoDates}>
                Created Jan 5, 2025 • Last updated Jan 12, 2025
              </div>
            </div>
            <Badge variant={getStatusVariant(campaign.status)} className={styles.statusBadge}>
              {getStatusLabel(campaign.status)}
            </Badge>
          </div>

          {/* Stats Cards */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <span className={styles.statLabel}>Calls made</span>
                <div className={styles.statIcon}>
                  <PhoneIcon />
                </div>
              </div>
              <div className={styles.statValue}>4,320</div>
              <div className={styles.statChange}>
                <span className={styles.positive}>↑ +12.4% vs last 7 days</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <span className={styles.statLabel}>Conversion rate</span>
                <div className={styles.statIcon}>
                  <PercentIcon />
                </div>
              </div>
              <div className={styles.statValue}>18.5%</div>
              <div className={styles.statChange}>
                <span className={styles.positive}>↑ +12.4% vs last 7 days</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <span className={styles.statLabel}>Avg call duration</span>
                <div className={styles.statIcon}>
                  <ClockIcon />
                </div>
              </div>
              <div className={styles.statValue}>01:42</div>
              <div className={styles.statChange}>
                <span className={styles.positive}>↑ +12.4% vs last 7 days</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <span className={styles.statLabel}>Average cost</span>
                <div className={styles.statIcon}>
                  <DollarIcon />
                </div>
              </div>
              <div className={styles.statValue}>$ 92.00</div>
              <div className={styles.statChange}>
                <span className={styles.positive}>↑ +12.4% vs last 7 days</span>
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className={styles.chartsGrid}>
            {/* Performance Chart */}
            <div className={styles.chartCard}>
              <div className={styles.chartHeader}>
                <h4 className={styles.chartTitle}>Performance over time</h4>
                <div className={styles.chartLegend}>
                  <span className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ backgroundColor: '#8b5cf6' }} />
                    Calls
                  </span>
                  <span className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ backgroundColor: '#6b7280' }} />
                    Conversion
                  </span>
                </div>
              </div>
              <div className={styles.performanceChart}>
                <div className={styles.yAxis}>
                  <span>500</span>
                  <span>400</span>
                  <span>300</span>
                  <span>200</span>
                  <span>100</span>
                  <span>0</span>
                </div>
                <div className={styles.chartArea}>
                  <svg viewBox={`0 0 ${performanceData.length * 80} ${chartHeight}`} className={styles.lineSvg}>
                    {/* Calls line */}
                    <polyline
                      fill="none"
                      stroke="#8b5cf6"
                      strokeWidth="2"
                      points={performanceData.map((d, i) => `${i * 80 + 40},${chartHeight - (d.calls / 500) * chartHeight}`).join(' ')}
                    />
                    {/* Conversion line */}
                    <polyline
                      fill="none"
                      stroke="#6b7280"
                      strokeWidth="2"
                      points={performanceData.map((d, i) => `${i * 80 + 40},${chartHeight - (d.conversion / 500) * chartHeight}`).join(' ')}
                    />
                    {/* Data points */}
                    {performanceData.map((d, i) => (
                      <g key={i}>
                        <circle cx={i * 80 + 40} cy={chartHeight - (d.calls / 500) * chartHeight} r="4" fill="#8b5cf6" />
                        <circle cx={i * 80 + 40} cy={chartHeight - (d.conversion / 500) * chartHeight} r="4" fill="#6b7280" />
                      </g>
                    ))}
                  </svg>
                  <div className={styles.xAxis}>
                    {performanceData.map((d, i) => (
                      <span key={i}>{d.date}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Outcomes Chart */}
            <div className={styles.chartCard}>
              <div className={styles.chartHeader}>
                <h4 className={styles.chartTitle}>Call outcomes</h4>
                <div className={styles.chartLegend}>
                  {outcomesData.map((item) => (
                    <span key={item.label} className={styles.legendItem}>
                      <span className={styles.legendDot} style={{ backgroundColor: item.color }} />
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.donutChart}>
                <svg viewBox="0 0 200 200" className={styles.donutSvg}>
                  {/* Background circle */}
                  <circle cx="100" cy="100" r="70" fill="none" stroke="#f3f4f6" strokeWidth="30" />
                  {/* Connected segment (42%) */}
                  <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="30"
                    strokeDasharray={`${42 * 4.4} ${100 * 4.4}`}
                    strokeDashoffset="110"
                    transform="rotate(-90 100 100)"
                  />
                  {/* No Answer segment (35%) */}
                  <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="none"
                    stroke="#c4b5fd"
                    strokeWidth="30"
                    strokeDasharray={`${35 * 4.4} ${100 * 4.4}`}
                    strokeDashoffset={110 - 42 * 4.4}
                    transform="rotate(-90 100 100)"
                  />
                  {/* Busy/Failed segment (23%) */}
                  <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="none"
                    stroke="#6b7280"
                    strokeWidth="30"
                    strokeDasharray={`${23 * 4.4} ${100 * 4.4}`}
                    strokeDashoffset={110 - 77 * 4.4}
                    transform="rotate(-90 100 100)"
                  />
                </svg>
                <div className={styles.donutLabel}>
                  <span className={styles.donutLabelText}>Connected • 42%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
