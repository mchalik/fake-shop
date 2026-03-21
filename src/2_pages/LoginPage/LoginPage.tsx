import { useState, useContext, type SubmitEvent, type ReactElement, type SyntheticEvent } from 'react';
import { z } from 'zod';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Alert,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography
} from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { useMutation } from '@tanstack/react-query';

import { postAuthLogin } from '@/features/login';
import { LoginFormData, UserContext } from '@/entities/user';

const names = new Set([
  'username',
  'password',
  'saveLogin'
]);

const Form = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  saveLogin: z.boolean()
});

const getInputEndAdornment = (endAdornment: ReactElement) => (
  {
    input: {
      endAdornment
    }
  }
);

export const LoginPage = () => {
  const { setUser } = useContext(UserContext);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisible = () => setPasswordVisible((value) => !value);
  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    username: 'emilys',
    password: 'emilyspass',
    saveLogin: true
  });

  const mutationPostAuthLogin = useMutation({
    mutationFn: postAuthLogin,
    onSuccess: (user, loginProps) => {
      setUser?.(user);

      if (loginProps.saveLogin) {
        localStorage.setItem('ACCESS_TOKEN', user.accessToken);
      } else {
        sessionStorage.setItem('ACCESS_TOKEN', user.accessToken);
      }
    }
  });

  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();

    const FormSafeParsed = Form.safeParse(loginFormData);

    if (FormSafeParsed.error) {
      return;
    }

    mutationPostAuthLogin.mutate(FormSafeParsed.data);
  };

  const onChangeSetFormData = ({ target }: SyntheticEvent, checked?: boolean) => {
    if (!(target instanceof HTMLInputElement)) {
      return;
    }

    setLoginFormData(data => ({
      ...data,
      [target.name]: checked ?? target.value
    }));
  };

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
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h5" component="h1" align="center" fontWeight="bold">
            Добро пожаловать!
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
            Пожалуйста, авторизуйтесь
          </Typography>

          <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <TextField
              required
              label="Почта"
              type="input"
              name="username"
              value={loginFormData.username}
              onChange={onChangeSetFormData}
              variant="outlined"
              fullWidth
            />

            <TextField
              required
              label="Пароль"
              name="password"
              type={passwordVisible ? 'input' : 'password' }
              value={loginFormData.password}
              variant="outlined"
              fullWidth
              onChange={onChangeSetFormData}
              slotProps={getInputEndAdornment(
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    onClick={togglePasswordVisible}
                  >
                    {passwordVisible
                      ? <Visibility />
                      : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )}
            />

            <FormControlLabel
              control={<Checkbox defaultChecked color="primary" />}
              label="Запомнить данные"
              name="saveLogin"
              checked={loginFormData.saveLogin}
              onChange={onChangeSetFormData}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              loading={mutationPostAuthLogin.isPending}
              loadingPosition="start"
              sx={{ mt: 1, textTransform: 'none', fontSize: '16px' }}
            >
                Войти
            </Button>
            <Snackbar
              open={mutationPostAuthLogin.isError}
              autoHideDuration={3000}
              onClose={() => { mutationPostAuthLogin.reset(); }}
            >
              <Alert
                severity="error"
                variant="filled"
                sx={{ width: '100%' }}
              >
                Неверный логин или пароль
              </Alert>
            </Snackbar>

          </form>

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