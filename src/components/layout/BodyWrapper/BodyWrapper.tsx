import { ReactNode } from 'react';
import styles from './BodyWrapper.module.scss';

interface BodyWrapperProps {
  children: ReactNode;
}

export function BodyWrapper({ children }: BodyWrapperProps) {
  return <div className={styles.bodyWrapper}>{children}</div>;
}
