import React, { useState } from 'react';
import FavoriteCard from '../components/FavoriteCard';
import Header from '../components/Header';

const storageFavorites = (localStorage.getItem('favoriteRecipes'));
const favoriteRecipes = JSON.parse(storageFavorites) || [];
const allRecipes = [...favoriteRecipes];

export default function FavoriteRecipes() {
  const [filteredRecipes, setFilteredRecipes] = useState(allRecipes);
  const [filter, setFilter] = useState('all');

  const btnClickAll = () => {
    setFilter('all');
  };
  const btnClickMeals = () => {
    setFilter('meal');
  };
  const btnClickDrinks = () => {
    setFilter('drink');
  };

  return (
    <main>
      <Header />
      <h1>FavoriteRecipes</h1>
      <section>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ btnClickAll }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          type="button"
          onClick={ btnClickMeals }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ btnClickDrinks }
        >
          Drinks
        </button>
      </section>
      <FavoriteCard
        filteredRecipes={ filteredRecipes }
        setFilteredRecipes={ setFilteredRecipes }
        filter={ filter }
      />
    </main>
  );
}
