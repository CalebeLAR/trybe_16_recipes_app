import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AppRecipeContext from '../contexts/AppRecipeContext';
import Loading from './Loading';

export default function RecipeCard() {
  const {
    loading,
    setLoading,
    arrMealAPI,
    arrDrinkAPI,
    arrMealCategAPI,
    arrDrinkCategAPI,
  } = useContext(AppRecipeContext);

  const history = useHistory();
  const { location: { pathname } } = history;
  const page = pathname.split('/')[1];

  const [objFilter, setObjFilter] = useState({
    arrRecipes: page === 'meals' ? arrMealAPI : arrDrinkAPI,
    filter: '',
  });

  useEffect(() => {
    setObjFilter({
      arrRecipes: page === 'meals' ? arrMealAPI : arrDrinkAPI,
      filter: '',
    });
  }, [loading]);

  const handleClickFilter = async ({ target }) => {
    // setLoading(true);
    const twelve = 12;
    const search = target.innerText.split(' ').join('_');
    const url = (page === 'meals')
      ? (`www.themealdb.com/api/json/v1/1/filter.php?c=${search}`)
      : (`www.thecocktaildb.com/api/json/v1/1/filter.php?c=${search}`);
      // try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);                             // fazer requisição junto com categorias e manter no estado 
    const newData = await data[page].filter((recipe, i) => i < twelve && recipe);
    setObjFilter({ arrRecipes: newData, filter: search });
    // } catch (error) {
    //   Error(error.massage);
    // }
  };

  useEffect(() => {
    console.log(objFilter.arrRecipes);
    if (objFilter.filter === 'All') {
      setObjFilter({ ...objFilter,
        arrRecipes: (page === 'meals' ? arrMealAPI : arrDrinkAPI),
      });
    }
    // setLoading(false);
    // else {
    //   // setObjFilter({ ...objFilter,
    //   //   arrRecipes: (page === 'meals' ? arrMealAPI : arrDrinkAPI)
    //   //     .filter((recipe) => recipe.strCategory === objFilter.filter) });
    // }
  }, [objFilter.filter]);

  if (loading) return <Loading />;
  return (
    <div>
      {(page === 'meals'
        ? arrMealCategAPI
        : arrDrinkCategAPI)
        .map((categ) => (
          <div key={ categ }>
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
        : objFilter.arrRecipes.map((recipe, index) => (
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
