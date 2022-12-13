import React from 'react';
import { useLocation } from 'react-router-dom';
import MealsCard from '../components/MealsCard';
import DrinksCard from '../components/DrinksCard';
import useFetchByRecipeID from '../services/useFetchByRecipeID';
import './RecipesInProgress.css';

export default function RecipesInProgress() {
  const location = useLocation();
  const params = location.pathname.split('/');

  const data = useFetchByRecipeID(params[1], params[2]);

  return (
    <div>
      { data.currentRecipe.type === 'meals'
        ? (
          <MealsCard mealDetails={ data.currentRecipe.recipe } />
        )
        : (
          <DrinksCard drinkDetails={ data.currentRecipe.recipe } />
        )}
      <input
        data-testid="finish-recipe-btn"
        type="button"
        value="Finish Recipe"
      />
      {/* <pre>{JSON.stringify(data.currentRecipe.recipe, null, 2)}</pre> */}
    </div>
  );
}
