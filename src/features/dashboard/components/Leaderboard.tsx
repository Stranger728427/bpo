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
  items = [],
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
        {items.length === 0 ? (
          <div className={styles.empty}>No data available</div>
        ) : (
          items.map((item, index) => {
            const rate = Number(item?.conversion_rate) || 0;
            const safeRate = Math.min(Math.max(rate, 0), 100);

            return (
              <div
                key={`${item?.campaign_name}-${index}`}
                className={styles.item}
              >
                <div className={styles.rank}>{index + 1}</div>

                <div className={styles.mainContent}>
                  <div className={styles.campaignHeader}>
                    <span className={styles.name}>
                      {item?.campaign_name || 'Unnamed'}
                    </span>
                    <span className={styles.rate}>
                      {safeRate.toFixed(1)}%
                    </span>
                  </div>

                  <div className={styles.progressContainer}>
                    <div className={styles.progressTrack}>
                      <div
                        className={styles.progressBar}
                        style={{ width: `${safeRate}%` }}
                      />
                    </div>

                    <div className={styles.metrics}>
                      <span className={styles.subtext}>
                        <strong>{item?.converted_calls ?? 0}</strong> /{' '}
                        {item?.call_count ?? 0} conversions
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};