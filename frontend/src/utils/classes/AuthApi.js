import { FetchApi } from './FetchApi';

export class AuthApi extends FetchApi {
  register(email, password) {
    return this._fetch('signup', 'POST', { email, password });
  }

  auth(email, password) {
    return this._fetch('signin', 'POST', { email, password });
  }

  checkToken(token) {
    const additionalHeaders = {
      Authorization: `Bearer ${token}`,
    };

    return this._fetch('users/me', 'GET', null, additionalHeaders);
  }
}
