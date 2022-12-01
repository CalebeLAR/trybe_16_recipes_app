import React from 'react';
import PropTypes from 'prop-types';

export default function DrinksCard({ drinkDetails }) {
  const {
    strDrinkThumb, strDrink, strCategory, strInstructions, strAlcoholic,
  } = drinkDetails;

  //
  const formatedInsturctions = strInstructions.split('STEP').slice(1);
  // pega todas as chaves que tem ingredient no nome
  const allIngredients = Object.keys(drinkDetails).filter(
    (key) => key.includes('strIngredient') === true,
  );

  // pega todas as chaves de ingrediente que tem um valor
  let allIngredientsValues = [];
  allIngredients.forEach((key) => {
    const value = drinkDetails[key];
    if (value !== null) {
      allIngredientsValues = [...allIngredientsValues, [key, value]];
    }
  });

  return (
    <main>
      <h1>DrinksCard</h1>
      <div>
        <img data-testid="recipe-photo" src={ strDrinkThumb } alt={ strDrink } />
        <h3 data-testid="recipe-title">{strDrink}</h3>
        <p data-testid="recipe-category">{strCategory}</p>
        <p>{strAlcoholic}</p>
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
    </main>

  );
}

DrinksCard.propTypes = {
  drinkDetails: PropTypes.shape({
    strCategory: PropTypes.string.isRequired,
    strInstructions: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
    strAlcoholic: PropTypes.string.isRequired,
  }).isRequired,
};
