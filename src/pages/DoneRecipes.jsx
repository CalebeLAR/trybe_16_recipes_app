import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import mockDoneRecipes from '../helpers/MockDoneRecipes';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function DoneRecipes() {
  const history = useHistory();
  const [messageCopy, setMessageCopy] = useState(false);
  const [arrDoneRecipes, setArrDoneRecipes] = useState([]);
  const doneRecipesLocalStorage = JSON.parse(localStorage.getItem('doneRecipes') || '[]');

  useEffect(() => {
    // localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipes));
    setArrDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes') || '[]'));
  }, []);

  const handleClickFilter = ({ target: { name } }) => {
    if (name === 'all') {
      setArrDoneRecipes(doneRecipesLocalStorage);
    } else {
      setArrDoneRecipes(doneRecipesLocalStorage.filter((recipe) => recipe.type === name));
    }
  };

  const clickIconShare = async () => {
    setMessageCopy(true);
    const url = `http://localhost:3000${pathname}`;
    const messageSaved = await copy(url);
    return messageSaved;
  };

  return (
    <div>
      <Header />
      <button
        type="button"
        name="all"
        data-testid="filter-by-all-btn"
        onClick={ handleClickFilter }
      >
        All
      </button>
      <button
        type="button"
        name="meal"
        data-testid="filter-by-meal-btn"
        onClick={ handleClickFilter }
      >
        Meal
      </button>
      <button
        type="button"
        name="drink"
        data-testid="filter-by-drink-btn"
        onClick={ handleClickFilter }
      >
        Drink
      </button>
      {arrDoneRecipes.length === 0
        ? (
          <div>
            <p>Nenhuma receita pronta!</p>
            <button
              type="button"
              name="toMeals"
              onClick={ () => history.push('/meals') }
            >
              Retornar para comidas
            </button>
            <button
              type="button"
              name="toDrinks"
              onClick={ () => history.push('/drinks') }
            >
              Retornar para bebidas
            </button>
          </div>
        ) : arrDoneRecipes.map((recipe, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ index }>
            <Link
              to={ recipe.type === 'meal'
                ? `/meals/${recipe.id}`
                : `/drinks/${recipe.id}` }
            >
              <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
              <img
                style={ { width: '100px' } }
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {recipe.type === 'meal'
                ? `${recipe.nationality} - ${recipe.category}`
                : `Alcoholic: ${recipe.alcoholicOrNot}` }
            </p>
            <p data-testid={ `${index}-card-name` }>{recipe.name}</p>
            <p data-testid={ `${index}-horizontal-done-date` }>
              {`Finalizada em ${recipe.doneDate}`}
            </p>
            <p data-testid={ `${index}-${recipe.tags}-horizontal-tag` }>
              {recipe.tags}
            </p>
            <input
              type="image"
              alt="share"
              src={ shareIcon }
              onClick={ clickIconShare }
              data-testid={ `${index}-horizontal-share-btn` }
            />
            {messageCopy === true && <p>Link copied!</p>}
          </div>
        ))}
    </div>
  );
}
