import { User } from '@/entities/user';

export const getAuthMe = async (accessToken: string) => {
  try {
    console.log('getAuthMe');
    const url = new URL('https://dummyjson.com/auth/me');
    const response = await fetch(url, {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });

    if (!response.ok) {

      throw new Error("Ошибка получения данных пользователя", {
        cause: { status: response.status }
      });
    }

    const data: User = await response.json();

    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Ошибка обработки данных пользователя', error);

    throw error;
  }
};
