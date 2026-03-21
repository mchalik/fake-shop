export type User = {
  'id': number,
  'username': string,
  'email': string,
  'firstName': string,
  'lastName': string,
  'gender': string,
  'image': string,

  // JWT accessToken (for backward compatibility) in response and cookies
  // Отправляется с каждым запросом, чтобы не получить 401 ошибку
  // По факту в тестовом приложении не используется
  // Живет 15 минут
  'accessToken': string,

  // refreshToken in response and cookies
  // Отправляется на auth/refresh чтобы получить новый accessToken (в тестовом приложении тоже)
  // Живет 30 дней
  'refreshToken': string
}

export type LoginFormData = {
  username: string,
  password: string,
  saveLogin: boolean
}