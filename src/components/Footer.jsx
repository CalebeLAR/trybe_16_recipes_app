import React from 'react';
import { useHistory } from 'react-router-dom';
import drink from '../images/drinkIcon.svg';
import food from '../images/mealIcon.svg';

export default function Footer() {
  const history = useHistory();

  return (
    <>
      <div>
        <img src={ drink } alt="drink" />
        <button
          type="button"
          onClick={ () => history.push('/drinks') }
          data-testid="drinks-bottom-btn"
        >
          página de bebidas
        </button>
      </div>
      <div>
        <img src={ food } alt="drink" />
        <button
          type="button"
          onClick={ () => history.push('/meals') }
          data-testid="meals-bottom-btn"
        >
          página de comidas
        </button>
      </div>

    </>

  );
}
