import { FetchApi } from './FetchApi';

export class AppApi extends FetchApi {
  getUserInfo() {
    return this._fetch('users/me');
  }

  getCardList() {
    return this._fetch('cards');
  }

  updateProfile(data) {
    return this._fetch('users/me', 'PATCH', data);
  }

  postCard(card) {
    return this._fetch('cards', 'POST', card);
  }

  delete(id) {
    return this._fetch(`cards/${id}`, 'DELETE');
  }

  like(id, like = true) {
    return this._fetch(`cards/${id}/likes`, like ? 'PUT' : 'DELETE');
  }

  updateAvatar(data) {
    return this._fetch(`users/me/avatar`, 'PATCH', data);
  }
}
