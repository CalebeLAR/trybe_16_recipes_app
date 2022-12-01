import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppRecipeContext from '../contexts/AppRecipeContext';
import Loading from './Loading';

export default function RecipeCard() {
  const {
    loading,
    arrMealAPI,
    arrDrinkAPI,
    arrMealCategAPI,
    arrDrinkCategAPI,
  } = useContext(AppRecipeContext);
  const history = useHistory();

  if (loading) return <Loading />;
  return (
    <div>
      {(history.location.pathname === '/meals'
        ? arrMealCategAPI
        : arrDrinkCategAPI)
        .map((categ) => (
          <div key={ categ }>
            <button
              type="button"
              data-testid={ `${categ}-category-filter` }
              onClick={ categ }
            >
              { categ }
            </button>
          </div>
        ))}
      {history.location.pathname === '/meals'
        ? arrMealAPI.map((recipe, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ recipe.idMeal }>
            <p data-testid={ `${index}-card-name` }>{recipe.strMeal}</p>
            <img
              style={ { width: '100px' } }
              src={ recipe.strMealThumb }
              alt={ recipe.strMeal }
              data-testid={ `${index}-card-img` }
            />
          </div>
        ))
        : arrDrinkAPI.map((recipe, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ recipe.idDrink }>
            <p data-testid={ `${index}-card-name` }>{recipe.strDrink}</p>
            <img
              style={ { width: '100px' } }
              src={ recipe.strDrinkThumb }
              alt={ recipe.strDrink }
              data-testid={ `${index}-card-img` }
            />
          </div>
        ))}
    </div>
  );
}
