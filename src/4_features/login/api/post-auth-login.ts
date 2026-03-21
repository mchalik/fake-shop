import { LoginFormData, User } from '@/entities/user';

export const postAuthLogin = async ({
  username,
  password,
  saveLogin
}: LoginFormData) => {
  try {
    const url = new URL('https://dummyjson.com/auth/login');

    const body = JSON.stringify({
      username,
      password,
      expiresInMins: saveLogin ? 60 : 15
    });
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    });

    if (!response.ok) {
      throw Error(`Ошибка отправки данных авторизации: ${ response.status }`);
    }

    const data: User = await response.json();

    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Ошибка при авторизации', error);

    throw error;
  }
};
