import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const { history } = useHistory();
  const [arrDoneRecipes, setArrDoneRecipes] = useState([]);

  useEffect(() => {
    setArrDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes') || '[]'));
  }, []);

  const handleClickFilter = ({ target: { id } }) => {
    switch (id) {
    case 'meal':
      setArrDoneRecipes(arrDoneRecipes.filter((recipe) => recipe.idMeal));
      break;
    case 'drink':
      setArrDoneRecipes(arrDoneRecipes.filter((recipe) => recipe.idDrink));
      break;
    default:
      setArrDoneRecipes(arrDoneRecipes);
      break;
    }
  };

  return (
    <div>
      <Header />
      <button
        type="button"
        id="all"
        data-testid="filter-by-all-btn"
        onClick={ handleClickFilter }
      >
        All
      </button>
      <button
        type="button"
        id="meal"
        data-testid="filter-by-meal-btn"
        onClick={ handleClickFilter }
      >
        Meal
      </button>
      <button
        type="button"
        id="drink"
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
              onClick={ () => history.push('/meals/recipes') }
            >
              Retornar para comidas
            </button>
            <button
              type="button"
              name="toDrinks"
              onClick={ () => history.push('/drinks/recipes') }
            >
              Retornar para bebidas
            </button>
          </div>
        ) : arrDoneRecipes.map((recipe, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ index }>
            <Link
              to={ recipe.strMeal
                ? `/meals/${recipe.idMeal}`
                : `/drinks/${recipe.idDrink}` }
            >
              <img
                style={ { width: '100px' } }
                src={ recipe.strMeal ? recipe.strMealThumb : recipe.strDrinkThumb }
                alt={ recipe.strMeal ? recipe.strMeal : recipe.strDrink }
                data-testid={ `${index}-horizontal-image` }
              />
              <p data-testid={ `${index}-horizontal-name` }>
                {recipe.strMeal ? recipe.strMeal : recipe.strDrink}
              </p>
            </Link>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {recipe.strMeal
                ? `${recipe.strArea} - ${recipe.strCategory}`
                : `Alcoholic: ${recipe.strAlcoholic}`}
            </p>
            <p data-testid={ `${index}-card-name` }>
              {recipe.strMeal ? recipe.strMeal : recipe.strDrink}
            </p>
            <p data-testid={ `${index}-horizontal-done-date` }>data</p>
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="share"
            />
            <p data-testid={ `${index}-${recipe.strTags}-horizontal-tag` }>
              {recipe.strTags}
            </p>
          </div>
        ))}
    </div>
  );
}
