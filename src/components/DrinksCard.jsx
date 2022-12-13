import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

export default function DrinksCard({ drinkDetails }) {
  const {
    strDrinkThumb, strDrink, strInstructions, strAlcoholic,
  } = drinkDetails;

  // let allIngredientsValues = [];
  // let allMeasuresValue = [];

  // const allIngredients = Object.keys(drinkDetails).filter(
  //   (key) => key.includes('strIngredient') === true,
  // );

  // const allMeasures = Object.keys(drinkDetails).filter(
  //   (key) => key.includes('strMeasure') === true,
  // );
  // allMeasures.forEach((key) => {
  //   const value = drinkDetails[key];
  //   if (value !== null) {
  //     allMeasuresValue = [...allMeasuresValue, [key, value]];
  //   }
  // });

  // allIngredients.forEach((key, index) => {
  //   const value = drinkDetails[key];
  //   if (value !== null && allMeasuresValue[index] !== undefined) {
  //     allIngredientsValues = [
  //       ...allIngredientsValues, [key, value, allMeasuresValue[index]],
  //     ];
  //   }
  // });

  const location = useLocation();
  const [checkDrinkIngredients, setCheckDrinkIngredients] = useState([]);

  const labelStyle = {
    textDecoration: 'line-through solid rgb(0, 0, 0)',
  };

  const ingredients = [...Object.entries(drinkDetails)]
    .filter((it) => it[0].includes('strIngredient') && it[1])
    .map((it) => it[1]);

  const measures = [...Object.entries(drinkDetails)]
    .filter((it) => it[0].includes('strMeasure') && it[1])
    .map((it) => it[1]);

  const verifyIngredientCheck = ({ target }) => {
    if (checkDrinkIngredients.includes(target.name)) {
      setCheckDrinkIngredients(checkDrinkIngredients
        .filter((it) => it !== target.name));
    } else {
      setCheckDrinkIngredients([...checkDrinkIngredients, target.name]);
    }
  };

  useEffect(() => {
  }, [checkDrinkIngredients]);

  return (
    <main>
      <h1>DrinksCard</h1>
      <img data-testid="recipe-photo" src={ strDrinkThumb } alt={ strDrink } />
      <div>
        <input
          data-testid="favorite-btn"
          type="button"
          value="Favorite"
        />
        <input
          data-testid="share-btn"
          type="button"
          value="Share"
        />
      </div>
      <div>
        <img
          data-testid="recipe-photo"
          src={ strDrinkThumb }
          alt={ strDrink }
          style={ { width: '100px' } }
        />
        <h3 data-testid="recipe-title">{strDrink}</h3>
        <p data-testid="recipe-category">{strAlcoholic}</p>
      </div>
      <section>
        <ul>
          {
            ingredients.map((ingredient, index) => (
              location.pathname.includes('progress')
                ? (
                  <>
                    <label
                      htmlFor={ ingredient }
                      key={ index }
                      data-testid={ `${index}-ingredient-step` }
                      style={ checkDrinkIngredients.includes(ingredient)
                        ? labelStyle
                        : null }
                    >
                      <input
                        type="checkbox"
                        name={ ingredient }
                        id={ ingredient }
                        checked={ checkDrinkIngredients.includes(ingredient) }
                        onChange={ verifyIngredientCheck }
                      />
                      {`
                        ${measures[index]?.toLowerCase()} 
                        ${ingredient?.toLowerCase()}
                      `}
                    </label>
                    <br />
                  </>
                )
                : (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {`
                      ${measures[index]?.toLowerCase()} 
                      ${ingredient?.toLowerCase()}
                    `}
                  </li>
                )

            ))
          }
        </ul>
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
