import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { requestDrink, requestMeal } from '../services/requestAPIs';
import AppRecipeContext from './AppRecipeContext';

export default function Provider({ children }) {
  const [arrMealAPI, setArrMealAPI] = ([]);
  const [arrDrinkAPI, setArrDrinkAPI] = ([]);
  const [mealOrDrink, setMealOrDrink] = ('meal');

  useEffect(() => {
    setArrMealAPI(requestMeal());
    setArrDrinkAPI(requestDrink());
  }, []);

  const value = (() => ({
    arrMealAPI,
    arrDrinkAPI,
    mealOrDrink,
    setMealOrDrink,
  }), [arrDrinkAPI, arrDrinkAPI]);

  return (
    <AppRecipeContext.Provider value={ value }>
      {children}
    </AppRecipeContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.shape().isRequired,
};
