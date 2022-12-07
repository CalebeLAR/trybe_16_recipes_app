import React from 'react';
import Header from '../components/Header';

// * Todos os data-testids estão presentes:
// * O botão de filtro `All` deve ter o atributo `data-testid="filter-by-all-btn"`;
// * O botão de filtro `Meals` deve ter o atributo `data-testid="filter-by-meal-btn"`;
// * O botão de `Drinks` deve ter o atributo `data-testid="filter-by-drink-btn"`;
// * A imagem do card de receita deve ter o atributo `data-testid="${index}-horizontal-image"`;
// * O texto da categoria da receita deve ter o atributo `data-testid="${index}-horizontal-top-text"`;
// * O texto do nome da receita deve ter o atributo `data-testid="${index}-horizontal-name"`;
// * O elemento de compartilhar a receita deve ter o atributo `data-testid="${index}-horizontal-share-btn"`;
// * O elemento de favoritar a receita deve ter o atributo `data-testid="${index}-horizontal-favorite-btn"`;/

// testes
const testRecipe = [{
  id: 'id-da-receita',
  type: 'meal-ou-drink',
  nationality: 'nacionalidade-da-receita-ou-texto-vazio',
  category: 'categoria-da-receita-ou-texto-vazio',
  alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
  name: 'nome-da-receita',
  image: 'imagem-da-receita',
}];

localStorage.setItem('favoriteRecipes', JSON.stringify(testRecipe));

const storageFavorites = localStorage.getItem('favoriteRecipes');
const favoreteRecipes = JSON.parse(storageFavorites);
console.log(favoreteRecipes);
export default function FavoriteRecipes() {
  return (
    <main>
      <Header />
      <h1>FavoriteRecipes</h1>

    </main>
  );
}
