import { AppApi } from './classes/AppApi';
import { AuthApi } from './classes/AuthApi';

export const api = new AppApi({
  baseUrl: 'https://api.enslit.nomoredomains.monster/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const auth = new AuthApi({
  baseUrl: 'https://api.enslit.nomoredomains.monster/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
