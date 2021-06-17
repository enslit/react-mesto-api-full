import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Menu from './Menu';
import AuthLink from './AuthLink';
import { func } from 'prop-types';
import logo from '../../images/logo.svg';

Header.propTypes = {
  onSignOut: func,
};

function Header({ onSignOut }) {
  const [isMenuOpen, setIsOpenMenu] = useState(false);
  const { authorized, currentUser } = useContext(CurrentUserContext);
  const { pathname } = useLocation();

  return (
    <header
      className={`header container ${isMenuOpen ? 'header_menu-opened' : ''}`}
    >
      <Link to="/" className="logo" target="_self">
        <img src={logo} alt="Mesto Russia" className="logo__img" />
      </Link>
      {authorized ? (
        <Menu
          user={currentUser}
          logout={onSignOut}
          setIsOpenMenu={setIsOpenMenu}
          isMenuOpen={isMenuOpen}
        />
      ) : (
        <AuthLink path={pathname} />
      )}
    </header>
  );
}

export default Header;
