import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography
} from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// --- 1. КОМПОНЕНТ СТРАНИЦЫ ЛОГИНА ---
export const Login = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5', // Легкий серый фон, как на скриншоте
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
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h5" component="h1" align="center" fontWeight="bold">
            Добро пожаловать!
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
            Пожалуйста, авторизуйтесь
          </Typography>

          <TextField
            label="Почта"
            type="email"
            defaultValue="test@mail.com"
            variant="outlined"
            fullWidth
          />

          <TextField
            label="Пароль"
            type="password"
            defaultValue="password123" // Скрыто звездочками
            variant="outlined"
            fullWidth
            // Иконка глаза для скрытия/показа пароля (опционально, для красоты)
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" edge="end">
                    <VisibilityOff />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <FormControlLabel
            control={<Checkbox defaultChecked color="primary" />}
            label="Запомнить данные"
          />

          <Button 
            variant="contained" 
            size="large" 
            fullWidth
            sx={{ mt: 1, textTransform: 'none', fontSize: '16px' }}
          >
            Войти
          </Button>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Link href="#" variant="body2" underline="hover">
              Нет аккаунта? Создать
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};