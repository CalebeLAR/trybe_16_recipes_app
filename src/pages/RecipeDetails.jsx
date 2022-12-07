import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import CarouselRecommendations from '../components/CarouselRecommendations';
import DrinksCard from '../components/DrinksCard';
import MealsCard from '../components/MealsCard';

const MAX = 6;
export default function RecipeDetails(props) {
  const { history } = props;
  const { location: { pathname } } = history;
  const [dataDetails, setDataDetails] = useState(false);
  const [dataRecommendations, setDataRecommendations] = useState(false);

  // botão "Start Recipe" -----------
  const doneRecipes = localStorage.getItem('doneRecipes');
  const inProgressRecipes = localStorage.getItem('inProgressRecipes');

  const completedRecipes = (JSON.parse(doneRecipes)) || ([]);
  const progressRecipes = (JSON.parse(inProgressRecipes)) || ({ drinks: [], meals: [] });
  const checkWasDone = completedRecipes.some((recipe) => pathname.includes(recipe.id));
  const checkItProgress = (valueRecipes) => {
    if (pathname.includes('meals')) {
      const { meals } = valueRecipes;
      const mealsIds = Object.keys(meals);
      return mealsIds.some((mealId) => pathname.includes(mealId));
    }
    if (pathname.includes('drinks')) {
      const { drinks } = valueRecipes;
      const drinksIds = Object.keys(drinks);
      return drinksIds.some((drinkId) => pathname.includes(drinkId));
    }
  };

  const checkProgress = checkItProgress(progressRecipes);
  const textButton = (checkProgress) ? 'Continue Recipe' : 'Start Recipe';
  // ----------- botão "Start Recipe"

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
      .then((data) => setDataRecommendations(data.meals.slice(0, MAX)))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
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
    fetchDetails();
  }, [pathname, props]);

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
        (dataRecommendations.length > 0)
        && <CarouselRecommendations
          dataRecommendations={ dataRecommendations }
          pathname={ pathname }
        />
      }
      <button
        data-testid="start-recipe-btn"
        type="button"
        style={ { position: 'fixed', bottom: '0' } }
        disabled={ checkWasDone }
        onClick={ () => history.push(`${pathname}/inProgress`) }
      >
        {textButton}
      </button>
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
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
