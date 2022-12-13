import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const emailData = Object.values(JSON.parse(localStorage.getItem('user') || '[]'));
  const history = useHistory();

  const logoutAction = () => {
    history.push('/');
    localStorage.clear();
  };
  return (
    <div>
      <Header />
      <p data-testid="profile-email">{emailData}</p>
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ logoutAction }
      >
        Logout
      </button>

      <Footer />
    </div>
  );
}
