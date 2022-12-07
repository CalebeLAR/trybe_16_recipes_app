import PropTypes from 'prop-types';
import React from 'react';
// * Todos os data-testids estão presentes:
//  O botão de filtro `All` deve ter o atributo `data-testid="filter-by-all-btn"`;
//  O botão de filtro `Meals` deve ter o atributo `data-testid="filter-by-meal-btn"`;
//  O botão de `Drinks` deve ter o atributo `data-testid="filter-by-drink-btn"`;
//  A imagem do card de receita deve ter o atributo `data-testid="${index}-horizontal-image"`;
//  O texto da categoria da receita deve ter o atributo `data-testid="${index}-horizontal-top-text"`;
//  O texto do nome da receita deve ter o atributo `data-testid="${index}-horizontal-name"`;
//  O elemento de compartilhar a receita deve ter o atributo `data-testid="${index}-horizontal-share-btn"`;
//  O elemento de favoritar a receita deve ter o atributo `data-testid="${index}-horizontal-favorite-btn"`;/

export default function FavoriteCard({ filteredRecipes }) {
  return (
    <section>
      {
        filteredRecipes.map((favRecipe, index) => {
          const { type, name, image, category, alcoholicOrNo, nationality } = favRecipe;
          if (type === 'meal') {
            return (
              <div key={ name }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ image }
                  alt={ name }
                  width={ 200 }
                />
                <div>
                  <p
                    data-testid={ `${index}-horizontal-name` }
                  >
                    {name}
                  </p>
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {`categoria: ${category}`}
                  </p>
                  <p>{`origem: ${nationality}`}</p>
                </div>
                <div>
                  <button
                    data-testid={ `${index}-horizontal-share-btn` }
                    type="button"
                  >
                    compartilhar receita
                  </button>
                  <button
                    data-testid={ `data-testid="${index}-horizontal-favorite-btn` }
                    type="button"
                  >
                    Favorite
                  </button>
                </div>
              </div>
            );
          }
          if (type === 'drink') {
            return (
              <div key={ name }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ image }
                  alt={ name }
                  width={ 200 }
                />
                <div>
                  <p
                    data-testid={ `${index}-horizontal-name` }
                  >
                    {name}
                  </p>
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {`categoria: ${category}`}
                  </p>
                  <p>{`origem: ${nationality}`}</p>
                  <p>{`alcolica: ${alcoholicOrNo}`}</p>
                </div>
                <div>
                  <button
                    data-testid={ `${index}-horizontal-share-btn` }
                    type="button"
                  >
                    compartilhar receita
                  </button>
                  <button
                    data-testid={ `data-testid="${index}-horizontal-favorite-btn` }
                    type="button"
                  >
                    Favorite
                  </button>
                </div>
              </div>
            );
          }
          return null;
        })
      }
    </section>
  );
}

FavoriteCard.propTypes = {
  filteredRecipes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    nationality: PropTypes.string,
    category: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
  })).isRequired,
};
