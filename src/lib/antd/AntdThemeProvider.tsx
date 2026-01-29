import { ReactNode, useEffect, useState } from 'react';
import { ConfigProvider, App as AntdApp } from 'antd';
import { lightTheme, darkTheme } from './theme';

interface AntdThemeProviderProps {
  children: ReactNode;
}

/**
 * Ant Design theme provider that syncs with the document's data-theme attribute.
 * Automatically switches between light and dark themes based on the HTML attribute.
 *
 * @example
 * ```tsx
 * // In AppProvider
 * <AntdThemeProvider>
 *   <App />
 * </AntdThemeProvider>
 *
 * // Toggle theme
 * document.documentElement.setAttribute('data-theme', 'dark');
 * ```
 */
export function AntdThemeProvider({ children }: AntdThemeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check initial theme
    const initialTheme = document.documentElement.getAttribute('data-theme');
    setIsDarkMode(initialTheme === 'dark');

    // Observe changes to data-theme attribute
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          const theme = document.documentElement.getAttribute('data-theme');
          setIsDarkMode(theme === 'dark');
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return (
    <ConfigProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <AntdApp>{children}</AntdApp>
    </ConfigProvider>
  );
}
