import React, { useContext } from 'react';
import AppRecipeContext from '../contexts/AppRecipeContext';

export default function RecipeCard() {
  const {
    arrMealAPI,
    arrDrinkAPI,
    mealOrDrink,
    loading,
  } = useContext(AppRecipeContext);

  if (loading) return <h2>Assando...</h2>;
  return (
    <div>
      {mealOrDrink === 'meal'
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
        : (
          arrDrinkAPI.map((recipe, index) => (
            <div data-testid={ `${index}-recipe-card` } key={ recipe.idDrink }>
              <p data-testid={ `${index}-card-name` }>{recipe.strDrink}</p>
              <img
                src={ recipe.strDrinkThumb }
                alt={ recipe.strDrink }
                data-testid={ `${index}-card-img` }
              />
            </div>
          )))}
    </div>
  );
}
