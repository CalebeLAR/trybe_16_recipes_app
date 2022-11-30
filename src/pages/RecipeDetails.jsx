import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function RecipeDetails(props) {
  const [dataDetails, setDataDetails] = useState({});

  const fetchMealDetails = (idMeal) => {
    // idMeal = '53065';
    const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    fetch(URL)
      .then((response) => response.json())
      .then((data) => setDataDetails(data.meals[0]))
      .catch((error) => console.log(error));
  };

  const fetchDrinkDetails = (idDrink) => {
    // idDrink = '15997';
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`;
    fetch(URL)
      .then((response) => response.json())
      .then((data) => setDataDetails(data.drinks[0]))
      .catch((error) => console.log(error));
  };

  const whereDidTheIdComeFrom = () => {
    const { match: { params: { idDaReceita } } } = props;
    const { history: { location: { pathname } } } = props;
    if (pathname.includes('meals')) {
      fetchMealDetails(idDaReceita);
    }
    if (pathname.includes('drinks')) {
      fetchDrinkDetails(idDaReceita);
    }
    console.log('whereDidTheIdComeFrom');
  };

  useEffect(() => {
    whereDidTheIdComeFrom();
  }, []);

  console.log(dataDetails);
  return (
    <main>
      <h1>RecipeDetails</h1>
    </main>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      idDaReceita: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
