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
          <div key={ recipe.idMeal }>
            <h4>{recipe.strMeal}</h4>
            <img
              src="recipe.strMealThumb"
              alt="recipe.strMeal"
              data-testid={ `${index}-card-img` }
            />
          </div>
        ))
        : (
          arrDrinkAPI.map((recipe, index) => (
            <div key={ recipe.idDrink }>
              <h4>{recipe.strDrink}</h4>
              <img
                src="recipe.strDrinkThumb"
                alt="recipe.strDrink"
                data-testid={ `${index}-card-img` }
              />
            </div>
          )))}
    </div>
  );
}
