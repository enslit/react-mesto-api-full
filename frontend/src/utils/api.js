import { AppApi } from './classes/AppApi';
import { AuthApi } from './classes/AuthApi';

export const api = new AppApi({
  baseUrl: 'https://mesto.enslit.ru/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const auth = new AuthApi({
  baseUrl: 'https://mesto.enslit.ru/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
