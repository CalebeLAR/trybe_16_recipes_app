import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ForkKnife, Martini } from 'phosphor-react';
import AppRecipeContext from '../contexts/AppRecipeContext';
// import drink from '../images/drinkIcon.svg';
import food from '../images/mealIcon.svg';
import styles from './Footer.module.css';

export default function Footer() {
  const history = useHistory();
  const { setRoute } = useContext(AppRecipeContext);

  const redirect = (route) => {
    setRoute(route);
    history.push(route);
  };

  return (
    <div data-testid="footer" className={ styles.bar__footer }>

      {/* <input
        type="image"
        alt="drinks"
        src={ drink }
        onClick={ () => redirect('/drinks') }
        data-testid="drinks-bottom-btn"
      /> */}
      <ForkKnife
        size={ 26 }
        color="#ffddd2"
        weight="bold"
        onClick={ () => redirect('/meals') }
      />

      {/* <input
        type="image"
        alt="meals"
        src={ food }
        onClick={ () => redirect('/meals') }
        data-testid="meals-bottom-btn"
      /> */}
      <Martini
        size={ 26 }
        color="#ffddd2"
        weight="bold"
        onClick={ () => redirect('/drinks') }
      />

    </div>
  );
}
