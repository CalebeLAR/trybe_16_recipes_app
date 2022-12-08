import React from 'react';
import PropTypes from 'prop-types';
import FavoriteButtons from './FavoriteButtons';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

export default function FavoriteCard({ filteredRecipes }) {
  const onShareBtnClick = () => {
    global.alert('Link copied!');
  };
  const onFavoriteBtnClick = () => {
    console.log('favorite');
  };
  return (
    <section>
      {
        filteredRecipes.map((favRecipe, index) => {
          const { type, name, image, category, alcoholicOrNot, nationality } = favRecipe;
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
                {
                  (type === 'meal') ? (
                    <p
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      {`${nationality} - ${category}`}
                    </p>
                  ) : (
                    <p
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      {alcoholicOrNot}
                    </p>
                  )
                }
              </div>
              <div>
                <FavoriteButtons
                  dataTestid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt={ blackHeartIcon }
                  onClick={ onShareBtnClick }
                />
                <FavoriteButtons
                  dataTestid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt={ blackHeartIcon }
                  onClick={ onFavoriteBtnClick }
                />
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
