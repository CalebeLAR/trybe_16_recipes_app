import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CarouselRecommendations from '../components/CarouselRecommendations';
import DrinksCard from '../components/DrinksCard';
import MealsCard from '../components/MealsCard';
import {
  fetchDrinkDetails,
  fetchDrinksRecommendations,
  fetchMealDetails,
  fetchMealsRecommendations } from '../services/requestAPIs';

// const MAX = 6;
export default function RecipeDetails(props) {
  const { history: { location: { pathname } } } = props;
  const history = useHistory();
  const [dataDetails, setDataDetails] = useState(false);
  const [dataRecommendations, setDataRecommendations] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [objRecipe, setObjRecipe] = useState({});

  const createObjRecipe = async () => {
    const { match: { params: { idDaReceita } } } = props;
    const recipeDetails = pathname.includes('meals')
      ? await fetchMealDetails(idDaReceita)
      : await fetchDrinkDetails(idDaReceita);

    setObjRecipe(
      {
        id: idDaReceita,
        type: pathname.split('/')[1],
        nationality: recipeDetails.strArea ? recipeDetails.strArea : '',
        category: recipeDetails.strCategory ? recipeDetails.strCategory : '',
        alcoholicOrNot: recipeDetails.strAlcoholic ? recipeDetails.strAlcoholic : '',
        name: recipeDetails.strMeal ? recipeDetails.strMeal : recipeDetails.strDrink,
        image: recipeDetails.strMealThumb
          ? recipeDetails.strMealThumb
          : recipeDetails.strDrinkThumb,
        doneDate: '',
        tags: recipeDetails.strTags ? recipeDetails.strTags : [],
      },
    );
  };

  // const fetchMealDetails = (idMeal) => {
  //   // idMeal = '53065';
  //   const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  //   fetch(URL)
  //     .then((response) => response.json())
  //     .then((data) => setDataDetails(data.meals[0]))
  //     .catch((error) => setDataRecommendations(error));
  // };
  // const fetchDrinkDetails = (idDrink) => {
  //   // idDrink = '15997';
  //   const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`;
  //   fetch(URL)
  //     .then((response) => response.json())
  //     .then((data) => setDataDetails(data.drinks[0]))
  //     .catch((error) => console.log(error));
  // };

  // const fetchMealsRecommendations = () => {
  //   // recomenda bebidas;
  //   const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  //   fetch(URL)
  //     .then((response) => response.json())
  //     .then((data) => setDataRecommendations(data.drinks.slice(0, MAX)))
  //     .catch((error) => console.log(error));
  // };

  // const fetchDrinksRecommendations = () => {
  //   // recomenda comidas;
  //   const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  //   fetch(URL)
  //     .then((response) => response.json())
  //     .then((data) => setDataRecommendations(data.meals.slice(0, MAX)))
  //     .catch((error) => console.log(error));
  // };

  useEffect(() => {
    const requestDetails = async () => {
    // Pega o id e o path da pagina parar renderizar apenas comidas ou bebidas da página;
      const { match: { params: { idDaReceita } } } = props;
      if (pathname.includes('meals')) {
        setDataDetails(await fetchMealDetails(idDaReceita));
        setDataRecommendations(await fetchMealsRecommendations());
      }
      if (pathname.includes('drinks')) {
        setDataDetails(await fetchDrinkDetails(idDaReceita));
        setDataRecommendations(await fetchDrinksRecommendations());
      }
    };
    requestDetails();
  }, [pathname, props]);

  const checkDone = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('DoneRecipes') || '[]');
    setIsDone(doneRecipes.some((recipe) => recipe.id === pathname.split('/')[2]));
  };

  const checkInProgress = () => {
    const inProgressSaved = JSON.parse(localStorage.getItem('inProgressRecipes') || '{}');
    const mealsIdsInProgress = inProgressSaved.meals
      ? Object.keys(inProgressSaved.meals) : [];
    const drinksIdsInProgress = inProgressSaved.drinks
      ? Object.keys(inProgressSaved.drinks) : [];

    if (pathname.includes('meals')) {
      setInProgress(mealsIdsInProgress.includes(objRecipe.id));
    } else {
      setInProgress(drinksIdsInProgress.includes(objRecipe.id));
    }
  };

  const handleStartRecipe = () => {
    const inProgressSaved = JSON.parse(localStorage.getItem('inProgressRecipes') || '{}');
    const newObjInProgress = ({
      ...inProgressSaved,
      [objRecipe.type]: ({
        ...inProgressSaved[pathname.split('/')[1]],
        [objRecipe.id]: objRecipe,
      }),
    });
    localStorage.setItem('inProgressRecipes', JSON.stringify(newObjInProgress));
    history.push(`${pathname}/in-progress`);
  };

  useEffect(() => {
    createObjRecipe();
    checkInProgress();
    checkDone();
  }, [dataDetails]);

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
      {isDone
        ? null
        : (
          <button
            data-testid="start-recipe-btn"
            type="button"
            style={ { position: 'fixed', bottom: '0' } }
            onClick={ handleStartRecipe }
          >
            {inProgress ? 'Continue Recipe' : 'Start Recipe'}
          </button>
        )}
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
