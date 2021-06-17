import { AppApi } from './classes/AppApi';
import { AuthApi } from './classes/AuthApi';

export const api = new AppApi({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
  headers: {
    authorization: '52186c90-0ae5-45bb-99b5-e4acaa2b939f',
    'Content-Type': 'application/json',
  },
});

export const auth = new AuthApi({
  baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json',
  },
});
