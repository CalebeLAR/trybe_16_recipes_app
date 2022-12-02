import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AppRecipeContext from '../contexts/AppRecipeContext';
import Loading from './Loading';

export default function RecipeCard() {
  const {
    loading,
    arrMealAPI,
    arrDrinkAPI,
    arrMealCategAPI,
    arrDrinkCategAPI,
    route,
  } = useContext(AppRecipeContext);

  const history = useHistory();
  const { location: { pathname } } = history;
  const page = pathname.split('/')[1];

  useEffect(() => {
  }, [route]);

  const objFilterInitial = {
    arrRecipes: page === 'meals' ? arrMealAPI : arrDrinkAPI,
    filter: 'All',
  };

  const [objFilter, setObjFilter] = useState(objFilterInitial);

  const fetchByFilter = async (search) => {
    const twelve = 12;
    const url = (page === 'meals')
      ? (`https://www.themealdb.com/api/json/v1/1/filter.php?c=${search}`)
      : (`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${search}`);
    try {
      const response = await fetch(url);
      const data = await response.json();
      const newData = await data[page].filter((_recipe, i) => i < twelve);
      return newData;
    } catch (error) {
      Error(error.massage);
    }
  };

  const handleClickFilter = async ({ target }) => {
    const search = target.innerText;
    if (search === objFilter.filter) {
      setObjFilter(objFilterInitial);
    } else if (search !== 'All') {
      const newData = await fetchByFilter(search);
      setObjFilter({ arrRecipes: newData, filter: search });
    } else {
      setObjFilter(objFilterInitial);
    }
  };

  useEffect(() => {
    if (objFilter.filter === 'All') {
      setObjFilter(objFilterInitial);
    }
  }, [loading, route]);

  if (loading) return <Loading />;
  return (
    <div>
      {(page === 'meals'
        ? arrMealCategAPI
        : arrDrinkCategAPI)
        .map((categ, i) => (
          <div key={ i }>
            <button
              type="button"
              data-testid={ `${categ}-category-filter` }
              onClick={ handleClickFilter }
            >
              { categ }
            </button>
          </div>
        ))}
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ handleClickFilter }
      >
        All
      </button>
      {page === 'meals'
        ? objFilter.arrRecipes.map((recipe, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ index }>
            <p data-testid={ `${index}-card-name` }>{recipe.strMeal}</p>
            <Link to={ `/meals/${recipe.idMeal}` }>
              <img
                style={ { width: '100px' } }
                src={ recipe.strMealThumb }
                alt={ recipe.strMeal }
                data-testid={ `${index}-card-img` }
              />
            </Link>
          </div>
        ))
        : objFilter.arrRecipes.map((recipe, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ index }>
            <p data-testid={ `${index}-card-name` }>{recipe.strDrink}</p>
            <Link to={ `/drinks/${recipe.idDrink}` }>
              <img
                style={ { width: '100px' } }
                src={ recipe.strDrinkThumb }
                alt={ recipe.strDrink }
                data-testid={ `${index}-card-img` }
              />
            </Link>
          </div>
        ))}
    </div>
  );
}
