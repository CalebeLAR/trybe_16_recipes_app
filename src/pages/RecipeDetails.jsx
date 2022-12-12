import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CarouselRecommendations from '../components/CarouselRecommendations';
import DrinksCard from '../components/DrinksCard';
import MealsCard from '../components/MealsCard';
import shareIcon from '../images/shareIcon.svg';
import {
  fetchDrinkDetails,
  fetchMealDetails,
  requestDrinks,
  requestMeals } from '../services/requestAPIs';

const MAX = 6;
const copy = require('clipboard-copy');

export default function RecipeDetails(props) {
  const { history: { location: { pathname } } } = props;
  const page = pathname.split('/')[1];
  const history = useHistory();
  const [dataDetails, setDataDetails] = useState({});
  const [dataRecommendations, setDataRecommendations] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [isDone, setIsDone] = useState(false);
  // const [objDoneRecipe, setObjDoneRecipe] = useState({});
  const [messageCopy, setMessageCopy] = useState(false);
  const [arrIngredients, setArrIngredients] = useState([]);
  // Pega o id e o path da pagina para renderizar apenas comidas ou bebidas da página;
  const { match: { params: { idDaReceita } } } = props;

  // const createObjDoneRecipe = async () => {
  //   setObjDoneRecipe(
  //     {
  //       id: idDaReceita,
  //       type: page,
  //       nationality: dataDetails.strArea ? dataDetails.strArea : '',
  //       category: dataDetails.strCategory ? dataDetails.strCategory : '',
  //       alcoholicOrNot: dataDetails.strAlcoholic ? dataDetails.strAlcoholic : '',
  //       name: dataDetails.strMeal ? dataDetails.strMeal : dataDetails.strDrink,
  //       image: dataDetails.strMealThumb
  //         ? dataDetails.strMealThumb
  //         : dataDetails.strDrinkThumb,
  //       doneDate: '',
  //       tags: dataDetails.strTags ? dataDetails.strTags.split(',').map((t) => t) : [],
  //     },
  //   );
  // };

  const createArrIngredients = () => {
    const ingredients = Object.entries(dataDetails)
      .filter((arr) => arr[0].includes('strIngredient')
        && arr[1] !== ''
        && arr[1] !== null);
    setArrIngredients(ingredients.map((i) => i[1]));
  };

  useEffect(() => {
    // createObjDoneRecipe();
    createArrIngredients();
  }, [dataDetails]);

  const checkDoneAndProgress = () => {
  // botão "Start Recipe" -----------
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    setIsDone(doneRecipes.some((recipe) => recipe.id === idDaReceita));

    const inProgressRecipes = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || ({ drinks: {}, meals: {} });
    const inProgressIds = Object.keys(inProgressRecipes[page]);
    setInProgress(inProgressIds.some((id) => id === idDaReceita));

    // const progressRecipes = (JSON.parse(inProgressRecipes))
    // || ({ drinks: [], meals: [] });
    // const checkInProgress = (valueRecipes) => {
    //   const { recipe } = valueRecipes;
    //   const recipeId = Object.keys(recipe);
    //   if (pathname.includes('meals')) {
    //     const { meals } = valueRecipes;
    //     const mealsIds = Object.keys(meals);
    //     return mealsIds.some((mealId) => pathname.includes(mealId));
    //   }
    //   if (pathname.includes('drinks')) {
    //     const { drinks } = valueRecipes;
    //     const drinksIds = Object.keys(drinks);
    //     return drinksIds.some((drinkId) => pathname.includes(drinkId));
    //   }
    // };
    // const checkProgress = checkInProgress(progressRecipes);
    // setInProgress(checkProgress);
  // ----------- botão "Start Recipe"
  };

  useEffect(() => {
    checkDoneAndProgress();
  });

  const requestDetails = async () => {
    if (pathname.includes('meals')) {
      setDataDetails(await fetchMealDetails(idDaReceita));
      const recomends = await requestDrinks();
      setDataRecommendations(recomends.slice(0, MAX));
    }
    if (pathname.includes('drinks')) {
      setDataDetails(await fetchDrinkDetails(idDaReceita));
      const recomends = await requestMeals();
      setDataRecommendations(recomends.slice(0, MAX));
    }
  };

  useEffect(() => {
    requestDetails();
  }, [pathname, props]);

  const handleStartRecipe = () => {
    const inProgressSaved = JSON.parse(localStorage.getItem('inProgressRecipes') || '{}');
    const newObjInProgress = ({
      ...inProgressSaved,
      [page]: ({
        ...inProgressSaved[page],
        [idDaReceita]: arrIngredients,
      }),
    });
    localStorage.setItem('inProgressRecipes', JSON.stringify(newObjInProgress));
    setInProgress(true); // necessario aqui?
    history.push(`${pathname}/in-progress`);
  };

  const clickButtonShare = async () => {
    setMessageCopy(true);
    const url = `http://localhost:3000${pathname}`;
    const messageSaved = await copy(url);
    return messageSaved;
  };

  const clickButtonFavorite = () => {
    const oldFav = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const newFav = {
      id: idDaReceita,
      type: page,
      nationality: dataDetails.strArea ? dataDetails.strArea : '',
      category: dataDetails.strCategory ? dataDetails.strCategory : '',
      alcoholicOrNot: dataDetails.strAlcoholic ? dataDetails.strAlcoholic : '',
      name: dataDetails.strMeal ? dataDetails.strMeal : dataDetails.strDrink,
      image: dataDetails.strMealThumb
        ? dataDetails.strMealThumb
        : dataDetails.strDrinkThumb,
    };
    // if (pathname.includes('meals')) {
    //   newFav = { id: dataDetails.idMeal,
    //     type: 'meal',
    //     nationality: dataDetails.strArea,
    //     category: dataDetails.strCategory,
    //     alcoholicOrNot: '',
    //     name: dataDetails.strMeal,
    //     image: dataDetails.strMealThumb,
    //   };
    // } else {
    //   newFav = { id: dataDetails.idDrink,
    //     type: 'drink',
    //     nationality: '',
    //     category: dataDetails.strCategory,
    //     alcoholicOrNot: dataDetails.strAlcoholic,
    //     name: dataDetails.strDrink,
    //     image: dataDetails.strDrinkThumb,
    //   };
    // }
    localStorage.setItem('favoriteRecipes', JSON.stringify([...oldFav, newFav]));
  };

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
      <button
        data-testid="share-btn"
        type="button"
        onClick={ clickButtonShare }
      >
        <img src={ shareIcon } alt="icone-compartilhar" />
      </button>
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
        data-testid="favorite-btn"
        type="button"
        onClick={ clickButtonFavorite }
      >
        <img src={ shareIcon } alt="icone-favoritar" />
      </button>
      {messageCopy === true && <p>Link copied!</p>}
      {
        (dataRecommendations.length > 0)
        && <CarouselRecommendations
          dataRecommendations={ dataRecommendations }
          pathname={ pathname }
        />
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
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
