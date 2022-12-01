import React, { useState } from 'react';

export default function SearchBar() {
  const [searchRadioChecked, setSearchRadioChecked] = useState('ingredient');
  const [search, setSearch] = useState('');

  const handleSearch = ({ target }) => {
    if (searchRadioChecked === 'firstLetter'
    && search.length > 0) {
      global.alert('Your search must have only 1 (one) character');
      setSearch('');
    } else {
      setSearch(target.value);
    }
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
      >
        SEARCH

      </button>
    </div>
  );
}
