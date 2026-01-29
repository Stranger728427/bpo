import styles from './StatCard.module.scss';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  chart?: React.ReactNode;
  highlightText?: string;
}

export function StatCard({ 
  title, 
  value, 
  icon, 
  chart,
  highlightText,
}: StatCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        <div className={styles.iconWrapper}>
          {icon}
        </div>
      </div>
      
      <div className={styles.content}>
        <span className={styles.value}>{value}</span>
        
        {chart && (
          <div className={styles.chartSection}>
            {highlightText && (
              <div className={styles.highlightText}>{highlightText}</div>
            )}
            {chart}
          </div>
        )}
      </div>
    </div>
  );
}
