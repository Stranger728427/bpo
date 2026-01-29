import { Button } from '@components/ui/Button/Button';
import styles from './ErrorFallback.module.scss';

interface ErrorFallbackProps {
  error: Error | null;
  resetError?: () => void;
}

export function ErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div className={styles.container} role="alert">
      <div className={styles.content}>
        <div className={styles.icon}>
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h1 className={styles.title}>Something went wrong</h1>
        <p className={styles.message}>
          {error?.message || 'An unexpected error occurred'}
        </p>
        {resetError && (
          <Button onClick={resetError} type="primary">
            Try again
          </Button>
        )}
      </div>
    </div>
  );
}
