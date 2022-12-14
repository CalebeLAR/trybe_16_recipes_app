import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MagnifyingGlass, User } from 'phosphor-react';
import SearchBar from './SearchBar';
// import searchIcon from '../images/searchIcon.svg';
// import profileIcon from '../images/profileIcon.svg';
import styles from './Header.module.css';

export default function Header() {
  const location = useLocation();

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Usei como referencia:
  // https://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case
  const formatPathname = (str) => (
    str
      .slice(1)
      .split('-')
      .map((word) => word.replace(/[a-z]/g, (letter, idx) => (
        idx === 0 ? letter.toUpperCase() : letter
      )))
      .join(' ')
  );

  return (
    <div>
      <div className={ styles.bar }>
        <p className={ styles.bar__logo }>
          app
          <span className={ styles.bar__logo__accent }>receitas</span>
        </p>

        <div className={ styles.bar__icons }>
          {/* Verifica a rota da página e retorna os icones adequados  */}
          {location.pathname === '/meals'
            || location.pathname === '/drinks'
            ? (
              <>
                <MagnifyingGlass
                  size={ 21 }
                  weight="bold"
                  onClick={ () => setIsSearchOpen(!isSearchOpen) }
                  alt="search icon"
                />
                {/* <input
                  className={ styles.bar__search_button }
                  data-testid="search-top-btn"
                  type="image"
                  src={ searchIcon }
                  alt="search icon"
                  onClick={ () => setIsSearchOpen(!isSearchOpen) }
                /> */}
              </>
            )
            : null}

          <Link to="/profile">
            <User
              size={ 22 }
              weight="bold"
            />
            {/* <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="profile icon"
            /> */}
          </Link>
        </div>
      </div>

      {isSearchOpen && <SearchBar />}

      <div>
        <p data-testid="page-title" className={ styles.page_title }>
          <strong>
            {formatPathname(location.pathname)}
          </strong>
        </p>
      </div>
    </div>
  );
}
