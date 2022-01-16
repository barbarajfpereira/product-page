import React from 'react';
import './Header.scss';
import logo from '../../assets/logo.png';

const Header = () => {
  return (
    <header className='header'>
      <img src={logo} alt='logo' width='60px' height='60px' />
      <h1 className='header__title'>Shopping</h1>
    </header>
  );
};

export default Header;
