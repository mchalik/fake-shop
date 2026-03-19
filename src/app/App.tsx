import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Login } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

import { ThemeProvider } from './providers/ThemeProvider';

// --- ГЛАВНЫЙ КОМПОНЕНТ ДЛЯ ПЕРЕКЛЮЧЕНИЯ ---
// В реальном приложении у вас будет React Router
export default function App() {
  const isLoginPage = window.location.hash.replace('#', '') === 'login';
  const queryClient = new QueryClient();

  return (
    <>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          {isLoginPage ? <Login /> : <ProductsPage />}
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}
