import React from 'react';
import './Header.scss';
import logo from '../../assets/logo.png';

const Header = ({ isWishlist, toggleIsWishlist }) => {
  return (
    <header className='header'>
      <img src={logo} alt='logo' />
      <h1 className='header__title'>Shopping</h1>
      <h2
        className={`header__wishlist ${isWishlist ? 'active' : ''}`}
        onClick={toggleIsWishlist}
      >
        Wishlist
      </h2>
    </header>
  );
};

export default Header;
