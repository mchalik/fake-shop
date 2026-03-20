import { SubmitEvent, useContext } from 'react';
import { z } from "zod";
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
import { useMutation, } from '@tanstack/react-query';

import { postAuthLogin } from '@/features/login';
import { UserContext } from '@/entities/user';

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

const getFormData = (formElements: HTMLFormControlsCollection) => {
  const formData = {};

  for (const element of formElements) {
    if (!(element instanceof HTMLInputElement)) {
      continue;
    }

    if (!names.has(element.name)) {
      continue;
    }

    formData[element.name] =
     element.type === 'checkbox'
       ? element.checked
       : element.value;
  }

  return formData;
};

// --- 1. КОМПОНЕНТ СТРАНИЦЫ ЛОГИНА ---
export const Login = () => {
  const { setUser } = useContext(UserContext);
  const mutationPostAuthLogin = useMutation({
    mutationFn: postAuthLogin,
    onSuccess: (user, loginProps) => {
      setUser(user);

      if (loginProps.saveLogin) {
        localStorage.setItem('ACCESS_TOKEN', user.accessToken);
      } else {
        sessionStorage.setItem('ACCESS_TOKEN', user.accessToken);
      }
    }
  });

  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();

    const formData = getFormData(event.target.elements);
    const FormSafeParsed = Form.safeParse(formData);

    if (FormSafeParsed.error) {
      return;
    }

    mutationPostAuthLogin.mutate(FormSafeParsed.data);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
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

          <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              required
              label="Почта"
              type="input"
              name="username"
              defaultValue="emilys"
              variant="outlined"
              fullWidth
            />

            <TextField
              required
              label="Пароль"
              name="password"
              type="password"
              defaultValue="emilyspass"
              variant="outlined"
              fullWidth
              // Иконка глаза для скрытия/показа пароля (опционально, для красоты)
              // TODO: Нужно фиксануть
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
              name="saveLogin"
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