import { useEffect } from 'react';
import PropTypes from 'prop-types';

export default function RecipeDetails(props) {
  const { match: { params: { idDaReceita } } } = props;
  const fetchMealDetails = (idMeal) => {
    idMeal = '53065';
    const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    fetch(URL)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    console.log('fetchMealDetails');
  };
  const fetchDrinkDetails = (idDrink) => {
    idDrink = '15997';
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`;
    fetch(URL)
      .then((response) => response.json())
      .then((data) => console.log(data));
    console.log('fetchDrinkDetails');
  };
  useEffect(() => {
    fetchMealDetails();
    fetchDrinkDetails();
  });
  return (
    <main>
      <h1>RecipeDetails</h1>
      <p>{idDaReceita}</p>
    </main>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      idDaReceita: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
