import { useContext, useState, type ReactElement, type SyntheticEvent, type SubmitEvent } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { TextField, InputAdornment, IconButton, FormControlLabel, Checkbox, Button, Snackbar, Alert } from '@mui/material';

import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { UserContext, type LoginFormData } from '@/entities/user';

import { postAuthLogin } from '../../api/post-auth-login';

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

export const LoginForm = () => {
  const { setUser } = useContext(UserContext);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisible = () => setPasswordVisible((value) => !value);
  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    username: 'emilys',
    password: 'emilyspass',
    saveLogin: true
  });

  const authLoginMutation = useMutation({
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

    authLoginMutation.mutate(FormSafeParsed.data);
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
        loading={authLoginMutation.isPending}
        loadingPosition="start"
        sx={{ mt: 1, textTransform: 'none', fontSize: '16px' }}
      >
                Войти
      </Button>
      <Snackbar
        open={authLoginMutation.isError}
        autoHideDuration={3000}
        onClose={() => { authLoginMutation.reset(); }}
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
  );
};