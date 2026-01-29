import { AppProvider } from '@/app/providers/AppProvider';
import { AppRouter } from '@/app/routes/AppRouter';

export const App = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}


