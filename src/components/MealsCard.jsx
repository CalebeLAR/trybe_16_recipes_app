import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function MealsCard({ mealDetails }) {
  const { strMealThumb, strMeal, strCategory, strInstructions, strYoutube } = mealDetails;
  // pega todas as chaves que tem ingredient no nome
  // let allIngredientsValues = [];
  // let allMeasuresValue = [];

  // console.log(mealDetails.strMeal);
  // const allIngredients = Object.keys(mealDetails).filter(
  //   (key) => key.includes('strIngredient') === true,
  // );
  // const allMeasures = Object.keys(mealDetails).filter(
  //   (key) => key.includes('strMeasure') === true,
  // );

  // allIngredients.forEach((key) => {
  //   const value = mealDetails[key];
  //   if (value !== '') {
  //     allIngredientsValues = [...allIngredientsValues, [key, value]];
  //   }
  // });

  // allMeasures.forEach((key) => {
  //   const value = mealDetails[key];
  //   if (value !== ' ') {
  //     allMeasuresValue = [...allMeasuresValue, [key, value]];
  //   }
  // });

  // const cleanedArr = allIngredientsValues.filter((it) => it[1]);

  const [checkMealIngredients, setCheckMealIngredients] = useState([]);
  const location = useLocation();

  const labelStyle = {
    textDecoration: 'line-through solid rgb(0, 0, 0)',
  };

  const ingredients = [...Object.entries(mealDetails)]
    .filter((it) => it[0].includes('strIngredient') && it[1])
    .map((it) => it[1]);

  const measures = [...Object.entries(mealDetails)]
    .filter((it) => it[0].includes('strMeasure') && it[1])
    .map((it) => it[1]);

  const verifyIngredientCheck = ({ target }) => {
    if (checkMealIngredients.includes(target.name)) {
      setCheckMealIngredients(checkMealIngredients
        .filter((it) => it !== target.name));
    } else {
      setCheckMealIngredients([...checkMealIngredients, target.name]);
    }
  };

  useEffect(() => {
  }, [checkMealIngredients]);

  return (
    <main>
      <h1>MealsCard</h1>
      <img data-testid="recipe-photo" src={ strMealThumb } alt={ strMeal } />
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
        <h3 data-testid="recipe-title">{strMeal}</h3>
        <p data-testid="recipe-category">{strCategory}</p>
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
                      style={ checkMealIngredients.includes(ingredient)
                        ? labelStyle
                        : null }
                    >
                      <input
                        type="checkbox"
                        name={ ingredient }
                        id={ ingredient }
                        checked={ checkMealIngredients.includes(ingredient) }
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
      <iframe
        width="560"
        height="315"
        src={ `https://www.youtube-nocookie.com/embed/${strYoutube.split('v=')[1]}` }
        title={ strMeal }
        frameBorder="0"
        allow="accelerometer;
        autoplay;
        clipboard-write;
        encrypted-media;
        gyroscope;
        picture-in-picture"
        allowFullScreen
      />
      {/* <iframe
        title={ strMeal }
        data-testid="video"
        width="420"
        height="315"
        src={ strYoutube }
      /> */}
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
