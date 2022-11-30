import React from 'react';
import { useLocation } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

export default function Header() {
  const location = useLocation();

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
      <div>

        <div>
          <p data-testid="page-title">
            app
            <strong>receitas</strong>
          </p>
        </div>
        <div>
          <div>
            {/* Verifica a rota da página e retorna os icones adequados  */}
            {location.pathname === '/meals'
            || location.pathname === '/drinks'
              ? (
                <img
                  data-testid="search-top-btn"
                  src={ searchIcon }
                  alt="search icon"
                />

              )
              : null}

            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="profile icon"
            />
          </div>
        </div>
      </div>
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
