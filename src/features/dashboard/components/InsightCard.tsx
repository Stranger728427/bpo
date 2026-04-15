import React from 'react';
import styles from './InsightCard.module.scss';
import { IoMdTrendingUp, IoMdAlert } from 'react-icons/io';

interface InsightCardProps {
  type: 'best' | 'worst';
  campaignName: string;
  metricLabel: string;
  metricValue: string;
  description: string;
}

export const InsightCard: React.FC<InsightCardProps> = ({
  type,
  campaignName,
  metricLabel,
  metricValue,
  description,
}) => {
  const isBest = type === 'best';

  return (
    <div className={`${styles.card} ${isBest ? styles.best : styles.worst}`}>
      <div className={styles.header}>
        <div className={styles.badge}>
          {isBest ? <IoMdTrendingUp /> : <IoMdAlert />}
          <span>{isBest ? 'Top Performer' : 'Needs Attention'}</span>
        </div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.campaignName}>{campaignName}</h3>
        <p className={styles.description}>{description}</p>

        <div className={styles.footer}>
          <div className={styles.metric}>
            <span className={styles.label}>{metricLabel}</span>
            <span className={styles.value}>{metricValue}</span>
          </div>
          <button className={styles.actionButton}>
            {isBest ? 'See Details' : 'Take Action'}
          </button>
        </div>
      </div>
    </div>
  );
};
