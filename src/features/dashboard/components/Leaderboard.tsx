import React from 'react';
import styles from './Leaderboard.module.scss';
import { CampaignPerformance } from '@/service/Types/Analytics';

interface LeaderboardProps {
  title: string;
  items: CampaignPerformance[];
  icon: React.ElementType;
  variant?: 'best' | 'worst';
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
  title,
  items,
  icon: Icon,
  variant = 'best',
}) => {
  return (
    <div className={`${styles.container} ${styles[variant]}`}>
      <div className={styles.header}>
        <div className={styles.titleWithIcon}>
          <Icon className={styles.icon} />
          <h3 className={styles.title}>{title}</h3>
        </div>
      </div>

      <div className={styles.list}>
        {items.map((item, index) => (
          <div key={item.campaign_name} className={styles.item}>
            <div className={styles.rank}>{index + 1}</div>

            <div className={styles.mainContent}>
              <div className={styles.campaignHeader}>
                <span className={styles.name}>{item.campaign_name}</span>
                <span className={styles.rate}>{item.conversion_rate}%</span>
              </div>

              <div className={styles.progressContainer}>
                <div className={styles.progressTrack}>
                  <div
                    className={styles.progressBar}
                    style={{ width: `${item.conversion_rate}%` }}
                  />
                </div>
                <div className={styles.metrics}>
                  <span className={styles.subtext}>
                    <strong>{item.converted_calls}</strong> / {item.call_count}{' '}
                    conversions
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className={styles.viewAll}>View Details</button>
    </div>
  );
};
