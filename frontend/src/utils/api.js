import { AppApi } from './classes/AppApi';
import { AuthApi } from './classes/AuthApi';

export const api = new AppApi({
  baseUrl: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const auth = new AuthApi({
  baseUrl: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
