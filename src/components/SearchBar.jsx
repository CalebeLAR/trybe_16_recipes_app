import React from 'react';

export default function SearchBar() {
  return (
    <div className="search">
      <input
        data-testid="search-input"
        type="search"
        name=""
        placeholder="Search"
      />

      <div>
        <label htmlFor="ingredient">
          <input type="radio" name="" id="ingredient" />
          Ingredient
        </label>

        <label htmlFor="name">
          <input type="radio" name="" id="name" />
          Name
        </label>

        <label htmlFor="firstLetter">
          <input type="radio" name="" id="firstLetter" />
          First Letter
        </label>
      </div>

      <button type="button">SEARCH</button>
    </div>
  );
}
