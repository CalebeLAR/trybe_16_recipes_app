import React, { useState } from 'react';
import FavoriteCard from '../components/FavoriteCard';
import Header from '../components/Header';

// * Todos os data-testids estão presentes:
//  O botão de filtro `All` deve ter o atributo `data-testid="filter-by-all-btn"`;
//  O botão de filtro `Meals` deve ter o atributo `data-testid="filter-by-meal-btn"`;
//  O botão de `Drinks` deve ter o atributo `data-testid="filter-by-drink-btn"`;
//  A imagem do card de receita deve ter o atributo `data-testid="${index}-horizontal-image"`;
// * O texto da categoria da receita deve ter o atributo `data-testid="${index}-horizontal-top-text"`;
// * O texto do nome da receita deve ter o atributo `data-testid="${index}-horizontal-name"`;
// * O elemento de compartilhar a receita deve ter o atributo `data-testid="${index}-horizontal-share-btn"`;
// * O elemento de favoritar a receita deve ter o atributo `data-testid="${index}-horizontal-favorite-btn"`;/

// testes
const testRecipe = [{
  id: '13501',
  type: 'drink',
  nationality: 'nacionalidade-da-receita-ou-texto-vazio',
  category: 'categoria-da-receita-ou-texto-vazio',
  alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
  name: 'ABC',
  image: 'https://www.thecocktaildb.com/images/media/drink/tqpvqp1472668328.jpg',
},
{
  id: '52977',
  type: 'meal',
  nationality: 'nacionalidade-da-receita-ou-texto-vazio',
  category: 'categoria-da-receita-ou-texto-vazio',
  alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
  name: 'Corba',
  image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
}];

localStorage.setItem('favoriteRecipes', JSON.stringify(testRecipe));

const storageFavorites = localStorage.getItem('favoriteRecipes');
const favoriteRecipes = JSON.parse(storageFavorites);
export default function FavoriteRecipes() {
  const [filteredRecipes, setFilteredRecipes] = useState(favoriteRecipes);

  return (
    <main>
      <Header />
      <h1>FavoriteRecipes</h1>
      <section>
        <button data-testid="filter-by-all-btn" type="button">All</button>
        <button data-testid="filter-by-meal-btn" type="button">Meals</button>
        <button data-testid="filter-by-drink-btn" type="button">Drinks</button>
      </section>
      <FavoriteCard filteredRecipes={ filteredRecipes } />
    </main>
  );
}
