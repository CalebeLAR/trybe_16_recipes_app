import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import './Header.css';

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
      <div className="bar">
        <p data-testid="page-title">
          app
          <strong>receitas</strong>
        </p>

        <div className="bar__icons">
          {/* Verifica a rota da página e retorna os icones adequados  */}
          {location.pathname === '/meals'
            || location.pathname === '/drinks'
            ? (
              <button
                data-testid="search-top-btn"
                type="button"
                className="bar__search-button"
                src={ searchIcon }
                alt="search icon"
                onClick={ () => setIsSearchOpen(!isSearchOpen) }
              />

            )
            : null}

          <Link to="/profile">
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="profile icon"
            />
          </Link>
        </div>
      </div>

      {isSearchOpen && (
        <div className="search">
          <input
            data-testid="search-input"
            type="search"
            name=""
            placeholder="Search"
          />

          <div>
            <label htmlFor="ingredient">
              <input type="radio" name="" id="ingredient" />
              Ingredient
            </label>

            <label htmlFor="name">
              <input type="radio" name="" id="name" />
              Name
            </label>

            <label htmlFor="firstLetter">
              <input type="radio" name="" id="firstLetter" />
              First Letter
            </label>
          </div>

          <button type="button">SEARCH</button>
        </div>
      )}

      <div>
        <p data-testid="page-title">
          <strong>
            {formatPathname(location.pathname)}
          </strong>
        </p>
      </div>
    </div>
  );
}
