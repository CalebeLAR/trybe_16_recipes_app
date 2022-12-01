import PropTypes from 'prop-types';
import React from 'react';
// import './MealsCard.css';

export default function MealsCard({ mealDetails }) {
  const { strMealThumb, strMeal, strCategory, strInstructions, strYoutube } = mealDetails;

  //
  const formatedInsturctions = strInstructions.split('STEP').slice(1);
  // pega todas as chaves que tem ingredient no nome
  const allIngredients = Object.keys(mealDetails).filter(
    (key) => key.includes('strIngredient') === true,
  );

  // pega todas as chaves de ingrediente que tem um valor
  let allIngredientsValues = [];
  allIngredients.forEach((key) => {
    const value = mealDetails[key];
    if (value !== '') {
      allIngredientsValues = [...allIngredientsValues, [key, value]];
    }
  });

  return (
    <main>
      <h1>MealsCard</h1>
      <div>
        <img data-testid="recipe-photo" src={ strMealThumb } alt={ strMeal } />
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
              {`${ingredient[0]}: ${ingredient[1]}`}
            </p>

          ))
        }
      </section>
      <div>
        {
          formatedInsturctions.map(
            (instruction, index) => (
              <p key={ index } data-testid="instructions">{`STEP ${instruction}`}</p>
            ),
          )
        }
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
