import React from 'react';
import styles from './StatCard.module.scss';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  chart?: React.ReactNode;
  highlightText?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'warning' | 'danger';
}

export function StatCard({ 
  title, 
  value, 
  icon, 
  chart,
  highlightText,
  trend,
  trendValue,
  variant = 'primary'
}: StatCardProps) {
  const getTrendIcon = () => {
    if (trend === 'up') return <IoMdArrowDropup className={styles.trendIconUp} />;
    if (trend === 'down') return <IoMdArrowDropdown className={styles.trendIconDown} />;
    return null;
  };

  return (
    <div className={`${styles.card} ${styles[variant]}`}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <span className={styles.title}>{title}</span>
          <div className={styles.iconWrapper}>
            {icon}
          </div>
        </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.mainInfo}>
          <span className={styles.value}>{value}</span>
          {trendValue && (
            <div className={`${styles.trend} ${trend ? styles[trend] : ''}`}>
              {getTrendIcon()}
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        
        {highlightText && (
          <div className={styles.highlightText}>{highlightText}</div>
        )}

        {chart && (
          <div className={styles.chartSection}>
            {chart}
          </div>
        )}
      </div>
    </div>
  );
}
