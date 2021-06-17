import React from 'react';
import { Link } from 'react-router-dom';
import { string } from 'prop-types';

AuthLink.propTypes = {
  path: string.isRequired,
};

function AuthLink({ path }) {
  const isLoginPage = path === '/sign-in';

  return (
    <Link
      to={isLoginPage ? '/sign-up' : '/sign-in'}
      className="link header__link"
    >
      {isLoginPage ? 'Регистрация' : 'Войти'}
    </Link>
  );
}

export default AuthLink;
