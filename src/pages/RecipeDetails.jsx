import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CarouselRecommendations from '../components/CarouselRecommendations';
import DrinksCard from '../components/DrinksCard';
import MealsCard from '../components/MealsCard';
import shareIcon from '../images/shareIcon.svg';
import {
  fetchDrinkDetails,
  fetchDrinksRecommendations,
  fetchMealDetails,
  fetchMealsRecommendations } from '../services/requestAPIs';

const copy = require('clipboard-copy');

export default function RecipeDetails(props) {
  const { history: { location: { pathname } } } = props;
  const history = useHistory();
  const [dataDetails, setDataDetails] = useState(false);
  const [dataRecommendations, setDataRecommendations] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [objRecipe, setObjRecipe] = useState({});
  const [messageCopy, setMessageCopy] = useState(false);

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

  const clickButtonShare = async () => {
    setMessageCopy(true);
    const url = `http://localhost:3000${pathname}`;
    const messageSaved = await copy(url);
    return messageSaved;
  };

  const clickButtonFavorite = () => {
    const oldFav = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    let newFav = [];
    if (pathname.includes('meals')) {
      newFav = { id: dataDetails.idMeal,
        type: 'meal',
        nationality: dataDetails.strArea,
        category: dataDetails.strCategory,
        alcoholicOrNot: '',
        name: dataDetails.strMeal,
        image: dataDetails.strMealThumb,
      };
    } else {
      newFav = { id: dataDetails.idDrink,
        type: 'drink',
        nationality: '',
        category: dataDetails.strCategory,
        alcoholicOrNot: dataDetails.strAlcoholic,
        name: dataDetails.strDrink,
        image: dataDetails.strDrinkThumb,
      };
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify([...oldFav, newFav]));
  };

  const checkDoneAndProgress = () => {
  // botão "Start Recipe" -----------
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    // const completedRecipes = (JSON.parse(doneRecipes)) || ([]);
    setIsDone(doneRecipes.some((recipe) => pathname.includes(recipe.id)));

    const inProgressRecipes = localStorage.getItem('inProgressRecipes');
    const progressRecipes = (JSON.parse(inProgressRecipes))
      || ({ drinks: [], meals: [] });
    const checkInProgress = (valueRecipes) => {
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
    const checkProgress = checkInProgress(progressRecipes);
    setInProgress(checkProgress);
  // ----------- botão "Start Recipe"
  };

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
    setInProgress(true);
    history.push(`${pathname}/in-progress`);
  };

  useEffect(() => {
    checkDoneAndProgress();
  });

  useEffect(() => {
    createObjRecipe();
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
      <button
        data-testid="share-btn"
        type="button"
        onClick={ clickButtonShare }
      >
        <img src={ shareIcon } alt="icone" />
      </button>
      <button
        data-testid="favorite-btn"
        type="button"
        onClick={ clickButtonFavorite }
      >
        favoritar
      </button>
      {messageCopy === true && <p>Link copied!</p>}
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
