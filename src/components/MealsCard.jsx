import PropTypes from 'prop-types';
import React from 'react';

export default function MealsCard({ mealDetails }) {
  const { strMealThumb, strMeal, strCategory, strInstructions, strYoutube } = mealDetails;

  // pega todas as chaves que tem ingredient no nome
  let allIngredientsValues = [];
  let allMeasuresValue = [];

  const allIngredients = Object.keys(mealDetails).filter(
    (key) => key.includes('strIngredient') === true,
  );
  const allMeasures = Object.keys(mealDetails).filter(
    (key) => key.includes('strMeasure') === true,
  );

  allIngredients.forEach((key) => {
    const value = mealDetails[key];
    if (value !== '') {
      allIngredientsValues = [...allIngredientsValues, [key, value]];
    }
  });

  allMeasures.forEach((key) => {
    const value = mealDetails[key];
    if (value !== ' ') {
      allMeasuresValue = [...allMeasuresValue, [key, value]];
    }
  });
  return (
    <main>
      <h1>MealsCard</h1>
      <div>
        <img
          data-testid="recipe-photo"
          src={ strMealThumb }
          alt={ strMeal }
          style={ { width: '100px' } }
        />
        <h3 data-testid="recipe-title">{strMeal}</h3>
        <p data-testid="recipe-category">{strCategory}</p>
      </div>
      <section>
        {
          allIngredientsValues.map((ingredient, index) => (
            <p
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${ingredient[0]}: ${ingredient[1]} -- `}
              {`${allMeasuresValue[index][0]}: ${allMeasuresValue[index][1]}`}
            </p>

          ))
        }
      </section>
      <div data-testid="instructions">
        <p>{strInstructions}</p>
      </div>
      <iframe
        title={ strMeal }
        data-testid="video"
        width="420"
        height="315"
        src={ strYoutube }
      />
    </main>

  );
}

MealsCard.propTypes = {
  mealDetails: PropTypes.shape({
    strCategory: PropTypes.string.isRequired,
    strInstructions: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
    strYoutube: PropTypes.string.isRequired,
  }).isRequired,
};
