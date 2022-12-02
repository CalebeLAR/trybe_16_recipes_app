import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppRecipeContext from '../contexts/AppRecipeContext';
import drink from '../images/drinkIcon.svg';
import food from '../images/mealIcon.svg';
import './Footer.css';

export default function Footer() {
  const history = useHistory();
  const { setRoute } = useContext(AppRecipeContext);

  const redirect = (route) => {
    setRoute(route);
    history.push(route);
  };

  return (
    <div data-testid="footer" className="bar__footer">

      <input
        type="image"
        alt="drinks"
        src={ drink }
        onClick={ () => redirect('/drinks') }
        data-testid="drinks-bottom-btn"
      />

      <input
        type="image"
        alt="meals"
        src={ food }
        onClick={ () => redirect('/meals') }
        data-testid="meals-bottom-btn"
      />

    </div>
  );
}
