import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AppRecipeContext from '../contexts/AppRecipeContext';
import Loading from './Loading';

export default function RecipeCard() {
  const {
    loading,
    // setLoading,
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
    const search = target.innerHTML;
    if (search === objFilter.filter || search === 'All') {
      setObjFilter(objFilterInitial);
    } else {
      const newData = await fetchByFilter(search);
      setObjFilter({ arrRecipes: newData, filter: search });
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
          <Link to={ `/meals/${recipe.idMeal}` } key={ index }>
            <div data-testid={ `${index}-recipe-card` }>
              <p data-testid={ `${index}-card-name` }>{recipe.strMeal}</p>
              <img
                style={ { width: '100px' } }
                src={ recipe.strMealThumb }
                alt={ recipe.strMeal }
                data-testid={ `${index}-card-img` }
              />
            </div>
          </Link>
        ))
        : objFilter.arrRecipes.map((recipe, index) => (
          <Link to={ `/drinks/${recipe.idDrink}` } key={ index }>
            <div data-testid={ `${index}-recipe-card` }>
              <p data-testid={ `${index}-card-name` }>{recipe.strDrink}</p>
              <img
                style={ { width: '100px' } }
                src={ recipe.strDrinkThumb }
                alt={ recipe.strDrink }
                data-testid={ `${index}-card-img` }
              />
            </div>
          </Link>
        ))}
    </div>
  );
}
