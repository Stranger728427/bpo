import styles from './MYaiLogo.module.scss';

interface MYaiLogoProps {
  className?: string;
}

/**
 * Geometric wireframe flower logo for MYai branding.
 * Creates an elegant, mathematical floral pattern using overlapping ellipses.
 */
export function MYaiLogo({ className = '' }: MYaiLogoProps) {
  const classNames = [styles.logo, className].filter(Boolean).join(' ');

  // Generate petals - overlapping rotated ellipses
  const petalCount = 5;
  const ringCount = 12;
  const petals = [];

  for (let p = 0; p < petalCount; p++) {
    const rotation = (p * 360) / petalCount;
    for (let r = 0; r < ringCount; r++) {
      const scale = 0.4 + (r * 0.05);
      const opacity = 0.15 + (r * 0.07);
      petals.push(
        <ellipse
          key={`${p}-${r}`}
          cx="100"
          cy="100"
          rx={45 * scale}
          ry={75 * scale}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          opacity={opacity}
          transform={`rotate(${rotation} 100 100) translate(0 -30)`}
        />
      );
    }
  }

  return (
    <svg
      className={classNames}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      {petals}
    </svg>
  );
}
