import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { UserProvider } from '@/entities/user';

import { Login } from '../pages/LoginPage';
import { ProductsPage } from '../pages/CatalogPage';

import { ThemeProvider } from './providers/ThemeProvider';

// --- ГЛАВНЫЙ КОМПОНЕНТ ДЛЯ ПЕРЕКЛЮЧЕНИЯ ---
// В реальном приложении у вас будет React Router
export default function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <UserProvider loginForm={Login}>
            <ProductsPage />
          </UserProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}
