import React from 'react';
import { useHistory } from 'react-router-dom';
import drink from '../images/drinkIcon.svg';
import food from '../images/mealIcon.svg';
import './Footer.css';

export default function Footer() {
  const history = useHistory();

  return (
    <div data-testid="footer" className="bar__footer">

      <input
        type="image"
        alt="drinks"
        src={ drink }
        onClick={ () => history.push('/drinks') }
        data-testid="drinks-bottom-btn"
      />

      <input
        type="image"
        alt="meals"
        src={ food }
        onClick={ () => history.push('/meals') }
        data-testid="meals-bottom-btn"
      />

    </div>
  );
}
