import {
  Box,
  Card,
  CardContent,
  Link,
  Typography
} from '@mui/material';

import { LoginForm } from '@/features/login';

export const LoginPage = () => {

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5'
      }}
    >
      <Card
        sx={{
          minWidth: 350,
          padding: 4,
          borderRadius: 2,
          boxShadow: 3
        }}
      >
        <CardContent sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}>
          <Typography variant="h5" component="h1" align="center" fontWeight="bold">
            Добро пожаловать!
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
            Пожалуйста, авторизуйтесь
          </Typography>

          <LoginForm />

          <Box sx={{
            textAlign: 'center',
            mt: 2
          }}>
            <Link href="#" variant="body2" underline="hover">
              Нет аккаунта? Создать
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};