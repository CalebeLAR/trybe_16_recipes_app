import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DrinksCard from '../components/DrinksCard';
import MealsCard from '../components/MealsCard';

const MAX = 6;
export default function RecipeDetails(props) {
  const { history: { location: { pathname } } } = props;
  const [dataDetails, setDataDetails] = useState(false);
  const [dataRecommendations, setDataRecommendations] = useState(false);

  const fetchMealDetails = (idMeal) => {
    // idMeal = '53065';
    const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    fetch(URL)
      .then((response) => response.json())
      .then((data) => setDataDetails(data.meals[0]))
      .catch((error) => setDataRecommendations(error));
  };
  const fetchDrinkDetails = (idDrink) => {
    // idDrink = '15997';
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`;
    fetch(URL)
      .then((response) => response.json())
      .then((data) => setDataDetails(data.drinks[0]))
      .catch((error) => console.log(error));
  };

  const fetchMealsRecommendations = () => {
    // recomenda bebidas;
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    fetch(URL)
      .then((response) => response.json())
      .then((data) => setDataRecommendations(data.drinks.slice(0, MAX)))
      .catch((error) => console.log(error));
  };

  const fetchDrinksRecommendations = () => {
    // recomenda comidas;
    const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    fetch(URL)
      .then((response) => response.json())
      .then((data) => console.log(data.meals.slice(0, MAX)))
      .catch((error) => console.log(error));
  };
  const fetchDetails = () => {
    // Pega o id e o path da pagina parar renderizar apenas comidas ou bebidas da página;
    const { match: { params: { idDaReceita } } } = props;
    if (pathname.includes('meals')) {
      fetchMealDetails(idDaReceita);
      fetchMealsRecommendations();
    }
    if (pathname.includes('drinks')) {
      fetchDrinkDetails(idDaReceita);
      fetchDrinksRecommendations();
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);
  return (
    <main>
      <h1>RecipeDetails</h1>
      {
        (Object.keys(dataDetails).length > 0 && pathname.includes('meals'))
          && <MealsCard mealDetails={ dataDetails } />
      }
      {
        (Object.keys(dataDetails).length > 0 && pathname.includes('drinks'))
          && <DrinksCard drinkDetails={ dataDetails } />
      }
      {
        (Object.keys(dataRecommendations).length > 0)
        && <h1>Recomendação</h1>
      }
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
