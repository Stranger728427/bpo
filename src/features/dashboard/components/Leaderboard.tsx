import React from 'react';
import styles from './Leaderboard.module.scss';
import { BiCrown } from 'react-icons/bi';

interface LeaderboardItem {
  id: string;
  name: string;
  value: string | number;
  percentage: number;
}

interface LeaderboardProps {
  title: string;
  items: LeaderboardItem[];
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ title, items }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <BiCrown className={styles.icon} />
      </div>
      <div className={styles.list}>
        {items.map((item, index) => (
          <div key={item.id} className={styles.item}>
            <div className={styles.rank}>{index + 1}</div>
            <div className={styles.info}>
              <div className={styles.name}>{item.name}</div>
              <div className={styles.progress}>
                <div 
                  className={styles.progressBar} 
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
            <div className={styles.value}>{item.value}</div>
          </div>
        ))}
      </div>
      <button className={styles.viewAll}>View Full Ranking</button>
    </div>
  );
};
