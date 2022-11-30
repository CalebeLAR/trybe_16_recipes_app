import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { requestMeals, requestDrinks } from '../services/requestAPIs';
import AppRecipeContext from './AppRecipeContext';

export default function Provider({ children }) {
  // const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [arrMealAPI, setArrMealAPI] = useState([]);
  const [arrDrinkAPI, setArrDrinkAPI] = useState([]);
  const [mealsOrDrinks, setMealsOrDrinks] = useState('');
  // console.log(history);

  const getRecipes = async () => {
    const meals = await requestMeals();
    const drinks = await requestDrinks();
    setArrMealAPI(meals);
    setArrDrinkAPI(drinks);
  };

  useEffect(() => {
    getRecipes().then(() => setLoading(false));
  }, []);

  const value = useMemo(() => ({
    loading,
    arrMealAPI,
    arrDrinkAPI,
    mealsOrDrinks,
    setMealsOrDrinks,
  }), [
    loading,
    arrMealAPI,
    arrDrinkAPI,
    mealsOrDrinks,
  ]);

  return (
    <AppRecipeContext.Provider value={ value }>
      {children}
    </AppRecipeContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.shape().isRequired,
};
