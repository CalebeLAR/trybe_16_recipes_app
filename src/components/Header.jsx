import React from 'react';
import { useLocation } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

export default function Header() {
  const location = useLocation();
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
            <object
              data-testid="search-top-btn"
              type="image/svg+xml"
              data={ searchIcon }
            >
              SEARCH ICON
            </object>

            <object
              data-testid="profile-top-btn"
              type="image/svg+xml"
              data={ profileIcon }
            >
              PROFILE ICON
            </object>
          </div>
        </div>
      </div>
      <div>
        <p>
          <strong>
            {location.pathname.slice(1).toUpperCase()}
          </strong>
        </p>
      </div>
    </div>
  );
}
