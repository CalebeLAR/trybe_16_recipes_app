import React from 'react';
import PropTypes from 'prop-types';

export default function DrinksCard({ drinkDetails }) {
  const {
    strDrinkThumb, strDrink, strInstructions, strAlcoholic,
  } = drinkDetails;
  let allIngredientsValues = [];
  let allMeasuresValue = [];

  const allIngredients = Object.keys(drinkDetails).filter(
    (key) => key.includes('strIngredient') === true,
  );

  const allMeasures = Object.keys(drinkDetails).filter(
    (key) => key.includes('strMeasure') === true,
  );
  allMeasures.forEach((key) => {
    const value = drinkDetails[key];
    if (value !== null) {
      allMeasuresValue = [...allMeasuresValue, [key, value]];
    }
  });
  allIngredients.forEach((key, index) => {
    const value = drinkDetails[key];
    if (value !== null && allMeasuresValue[index] !== undefined) {
      allIngredientsValues = [
        ...allIngredientsValues, [key, value, allMeasuresValue[index]],
      ];
    }
  });

  // console.log(allIngredientsValues);
  return (
    <main>
      <h1>DrinksCard</h1>
      <div>
        <img data-testid="recipe-photo" src={ strDrinkThumb } alt={ strDrink } />
        <h3 data-testid="recipe-title">{strDrink}</h3>
        <p data-testid="recipe-category">{strAlcoholic}</p>
      </div>
      <section>
        {
          allIngredientsValues.map((ingredient, index) => (
            <p
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${ingredient[0]}: ${ingredient[1]} 
              -- ${ingredient[2][0]}: ${ingredient[2][1]}`}
            </p>

          ))
        }
      </section>
      <div data-testid="instructions">
        <p>{strInstructions}</p>
      </div>
    </main>

  );
}

DrinksCard.propTypes = {
  drinkDetails: PropTypes.shape({
    strInstructions: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
    strAlcoholic: PropTypes.string.isRequired,
  }).isRequired,
};
