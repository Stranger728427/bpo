import { useState, useRef, useEffect, ReactNode } from 'react';
import styles from './ActionMenu.module.scss';

export interface ActionMenuItem {
  key: string;
  label: string;
  icon?: ReactNode;
  danger?: boolean;
  onClick: () => void;
}

export interface ActionMenuProps {
  items: ActionMenuItem[];
  className?: string;
}

const MoreIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="4" r="1.5" fill="currentColor" />
    <circle cx="10" cy="10" r="1.5" fill="currentColor" />
    <circle cx="10" cy="16" r="1.5" fill="currentColor" />
  </svg>
);

export function ActionMenu({ items, className }: ActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (item: ActionMenuItem) => {
    item.onClick();
    setIsOpen(false);
  };

  return (
    <div className={`${styles.container} ${className || ''}`} ref={menuRef}>
      <button
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Actions menu"
      >
        <MoreIcon />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {items.map((item) => (
            <button
              key={item.key}
              className={`${styles.item} ${item.danger ? styles.danger : ''}`}
              onClick={() => handleItemClick(item)}
            >
              {item.icon && <span className={styles.icon}>{item.icon}</span>}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
