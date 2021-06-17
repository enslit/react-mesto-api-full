import { createContext } from 'react';
import spinner from '../images/spinner.svg';

export const INITIAL_USER_STATE = {
  _id: null,
  email: '',
  name: 'Загрузка...',
  about: '',
  avatar: spinner,
};

const CurrentUserContext = createContext(INITIAL_USER_STATE);

export default CurrentUserContext;
