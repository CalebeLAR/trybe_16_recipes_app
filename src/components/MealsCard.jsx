import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Heart, ShareNetwork } from 'phosphor-react';
import styles from './MealsCard.module.css';

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
      {/* <h1>MealsCard</h1> */}
      <div className={ styles.recipe__container }>
        <img
          data-testid="recipe-photo"
          src={ strMealThumb }
          alt={ strMeal }
          className={ styles.recipe__image }
        />

        <p data-testid="recipe-category">{strCategory}</p>
        {/* <img
          data-testid="recipe-photo"
          src={ strMealThumb }
          alt={ strMeal }
          style={ { width: '100px' } }
        /> */}
        <div className={ styles.recipe__infobox }>
          <h3
            className={ styles.infobox__name }
            data-testid="recipe-title"
          >
            {strMeal}

          </h3>
          <div className={ styles.infobox__icons }>
            <ShareNetwork size={ 22 } color="#992900" weight="fill" />
            <Heart size={ 24 } color="#992900" weight="fill" />
          </div>
        </div>

      </div>
      <section>
        <p className={ styles.recipe__auxs }>Ingredients:</p>
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
        <p className={ styles.recipe__auxs }>Instructions:</p>
        <p className={ styles.recipe__instructions }>{strInstructions}</p>
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
        className={ styles.recipe__video }
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
