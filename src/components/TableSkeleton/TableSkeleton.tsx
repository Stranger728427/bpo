import styles from './Skeleton.module.scss';

type TableSkeletonProps = {
  rows: number;
  columns: number;
};

type SkeletonProps = {
  height?: string;
  width?: string;
  radius?: string;
};

const Skeleton = ({
  height = '16px',
  width = '100%',
  radius = '4px',
}: SkeletonProps) => {
  return (
    <div
      className={styles.skeleton}
      style={{ height, width, borderRadius: radius }}
    />
  );
};

export const TableSkeleton = ({ rows, columns }: TableSkeletonProps) => {
  return (
    <div style={{ width: '100%' }}>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '12px',
          }}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton width="100%" height="40px" radius="6px" key={colIndex} />
          ))}
        </div>
      ))}
    </div>
  );
};
