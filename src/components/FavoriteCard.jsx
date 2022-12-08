import PropTypes from 'prop-types';
import React from 'react';

export default function FavoriteCard({ filteredRecipes }) {
  return (
    <section>
      {
        filteredRecipes.map((favRecipe, index) => {
          const { type, name, image, category, alcoholicOrNo, nationality } = favRecipe;
          return (type === 'meal') ? (
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
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  type="button"
                >
                  Favorite
                </button>
              </div>
            </div>
          ) : (
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
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  type="button"
                >
                  Favorite
                </button>
              </div>
            </div>
          );
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
