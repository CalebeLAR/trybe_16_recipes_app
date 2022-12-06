import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import AppRecipeContext from '../contexts/AppRecipeContext';

const twelve = 12;

export default function SearchBar() {
  const [searchRadioChecked, setSearchRadioChecked] = useState('ingredient');
  const [search, setSearch] = useState('');
  const context = useContext(AppRecipeContext);
  const location = useLocation();
  const history = useHistory();

  const showAlert = (error) => {
    const print = {
      notfound: 'Sorry, we haven\'t found any recipes for these filters.',
      chars: 'Only 1 (one) character is allowed',
    };

    global.alert(print[error]);
  };

  const getPathname = () => location.pathname
    .slice(1)
    .split('/')[0];

  const switchEndpoint = () => {
    const url = getPathname();
    switch (searchRadioChecked) {
    case 'ingredient':
      if (url === 'meals') {
        return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`;
      }
      return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`;

    case 'name':
      if (url === 'meals') {
        return `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
      }
      return `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;

    case 'firstLetter':
      if (url === 'meals') {
        return `https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`;
      }
      return `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`;

    default:
      console.log('Ops! Something went wrong. Try again later');
    }
  };

  const verifyResults = (obj, category) => {
    if (obj[category] && obj[category].length === 1) {
      if (category === 'meals') {
        history.push(`/meals/${obj.meals[0].idMeal}`);
      } else {
        history.push(`/drinks/${obj.drinks[0].idDrink}`);
      }
    }
  };

  const filterFetch = async () => {
    const endpoint = switchEndpoint();

    const url = getPathname();
    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      verifyResults(data, url);

      if (url === 'meals') {
        const newData = data?.meals.filter((drink, i) => i < twelve && drink);
        context.setArrMealAPI(newData);
      } else {
        const newData = data?.drinks.filter((drink, i) => i < twelve && drink);
        context.setArrDrinkAPI(newData);
      }
    } catch (error) {
      showAlert('notfound');
    }
  };

  const handleSearch = ({ target }) => {
    if (searchRadioChecked === 'firstLetter'
    && search.length > 0) {
      global.alert('Your search must have only 1 (one) character');
      setSearch('');
    } else {
      setSearch(target.value);
    }
  };

  const getResults = async () => {
    context.setLoading(true);
    await filterFetch();
    context.setLoading(false);
  };

  return (
    <div className="search">
      <input
        data-testid="search-input"
        type="search"
        placeholder="Search"
        value={ search }
        onChange={ handleSearch }
      />

      <div>
        <label htmlFor="ingredient">
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            name="search-radios"
            id="ingredient"
            value="ingredient"
            onChange={ ({ target }) => { setSearchRadioChecked(target.value); } }
            checked={ searchRadioChecked === 'ingredient' }
          />
          Ingredient
        </label>

        <label htmlFor="name">
          <input
            data-testid="name-search-radio"
            type="radio"
            name="search-radios"
            id="name"
            value="name"
            onChange={ ({ target }) => { setSearchRadioChecked(target.value); } }
            checked={ searchRadioChecked === 'name' }
          />
          Name
        </label>

        <label htmlFor="firstLetter">
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            name="search-radios"
            id="firstLetter"
            value="firstLetter"
            onChange={ ({ target }) => { setSearchRadioChecked(target.value); } }
            checked={ searchRadioChecked === 'firstLetter' }
          />
          First Letter
        </label>
      </div>

      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ getResults }
      >
        SEARCH

      </button>
    </div>
  );
}
