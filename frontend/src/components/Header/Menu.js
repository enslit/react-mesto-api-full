import React from 'react';
import closeIcon from '../../images/close_icon.svg';
import menuIcon from '../../images/menu.svg';
import { bool, func, object } from 'prop-types';

Menu.propTypes = {
  user: object.isRequired,
  logout: func.isRequired,
  setIsOpenMenu: func.isRequired,
  isMenuOpen: bool,
};

function Menu({ user, logout, setIsOpenMenu, isMenuOpen = false }) {
  const handleClickLogout = () => {
    setIsOpenMenu(false);
    logout();
  };

  const handleClickMenu = () => {
    setIsOpenMenu(!isMenuOpen);
  };

  const buttonIcon = isMenuOpen ? closeIcon : menuIcon;

  return (
    <>
      <div
        className={`header__menu ${isMenuOpen ? 'header__menu_visible' : ''}`}
      >
        <span className="header__email">{user.email}</span>
        <button onClick={handleClickLogout} className="link header__link">
          Выйти
        </button>
      </div>
      <button
        onClick={handleClickMenu}
        type="button"
        aria-label="Меню"
        className="btn btn_type_menu"
        style={{ backgroundImage: `url(${buttonIcon})` }}
      />
    </>
  );
}

export default Menu;
