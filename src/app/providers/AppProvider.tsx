import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { QueryProvider } from './QueryProvider';
import { ErrorBoundary } from '@components/errors/ErrorBoundary';
import { AntdThemeProvider } from '@lib/antd/AntdThemeProvider';
import { store } from '../store/store';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <QueryProvider>
          <AntdThemeProvider>
            <BrowserRouter>{children}</BrowserRouter>
          </AntdThemeProvider>
        </QueryProvider>
      </Provider>
    </ErrorBoundary>
  );
}
