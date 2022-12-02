import PropTypes from 'prop-types';
// import { useLocation } from 'react-router-dom';
import React, { useEffect, useMemo, useState } from 'react';
import {
  requestMeals,
  requestDrinks,
  requestMealCategories,
  requestDrinkCategories } from '../services/requestAPIs';
import AppRecipeContext from './AppRecipeContext';

export default function Provider({ children }) {
  const [loading, setLoading] = useState(true);
  const [arrMealAPI, setArrMealAPI] = useState([]);
  const [arrDrinkAPI, setArrDrinkAPI] = useState([]);
  const [arrMealCategAPI, setArrMealCategAPI] = useState([]);
  const [arrDrinkCategAPI, setArrDrinkCategAPI] = useState([]);
  // const history = useHistory();
  // const { location: { pathname } } = history;
  // const location = useLocation();
  const [route, setRoute] = useState('');

  const getRecipes = async () => {
    const meals = await requestMeals();
    const drinks = await requestDrinks();
    const mealsCateg = await requestMealCategories();
    const drinksCateg = await requestDrinkCategories();
    setArrMealAPI(meals);
    setArrDrinkAPI(drinks);
    setArrMealCategAPI(mealsCateg);
    setArrDrinkCategAPI(drinksCateg);
  };

  useEffect(() => {
    getRecipes().then(() => setLoading(false));
  }, []);

  const value = useMemo(() => ({
    loading,
    setLoading,
    arrMealAPI,
    arrDrinkAPI,
    arrMealCategAPI,
    arrDrinkCategAPI,
    route,
    setRoute,
  }), [
    loading,
    arrMealAPI,
    arrDrinkAPI,
    arrMealCategAPI,
    arrDrinkCategAPI,
    route,
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
