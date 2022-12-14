import React, { useContext, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import AppRecipeContext from '../contexts/AppRecipeContext';
import styles from './SearchBar.module.css';

const twelve = 12;

export default function SearchBar(props) {
  const [searchRadioChecked, setSearchRadioChecked] = useState('ingredient');
  const [search, setSearch] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const context = useContext(AppRecipeContext);
  const location = useLocation();
  const history = useHistory();

  const { isShow } = props;

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
      // endpoint default: ingredients
      if (url === 'meals') {
        return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`;
      }
      return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`;
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

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={ isVisible ? `${styles.search} ${styles.show}` : styles.search }>
      <input
        data-testid="search-input"
        className={ styles.search__input }
        type="search"
        placeholder="Search"
        value={ search }
        onChange={ handleSearch }
      />

      <div className={ styles.radio_buttons }>

        <label htmlFor="ingredient" className={ styles.radio_buttons__item }>
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

        <label htmlFor="name" className={ styles.radio_buttons__item }>
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

        <label htmlFor="firstLetter" className={ styles.radio_buttons__item }>
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
        className={ styles.search__button }
        data-testid="exec-search-btn"
        type="button"
        onClick={ getResults }
      >
        Search Recipe

      </button>
    </div>
  );
}
