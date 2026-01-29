import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface LayoutContextValue {
  isSidebarExpanded: boolean;
  toggleSidebar: () => void;
  expandSidebar: () => void;
  collapseSidebar: () => void;
}

const LayoutContext = createContext<LayoutContextValue | null>(null);

interface LayoutProviderProps {
  children: ReactNode;
  defaultExpanded?: boolean;
}

export function LayoutProvider({ children, defaultExpanded = false }: LayoutProviderProps) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(defaultExpanded);

  const toggleSidebar = useCallback(() => {
    setIsSidebarExpanded((prev) => !prev);
  }, []);

  const expandSidebar = useCallback(() => {
    setIsSidebarExpanded(true);
  }, []);

  const collapseSidebar = useCallback(() => {
    setIsSidebarExpanded(false);
  }, []);

  return (
    <LayoutContext.Provider
      value={{
        isSidebarExpanded,
        toggleSidebar,
        expandSidebar,
        collapseSidebar,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
}
