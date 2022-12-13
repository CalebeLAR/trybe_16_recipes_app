const twelve = 12;
const five = 5;

export const requestMeals = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    const newData = data.meals.filter((meal, i) => i < twelve && meal);
    return newData;
  } catch (error) {
    Error(error.massage);
  }
};

export const requestDrinks = async () => {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    const newData = data.drinks.filter((drink, i) => i < twelve && drink);
    return newData;
  } catch (error) {
    Error(error.massage);
  }
};

export const requestMealCategories = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    const newData = data.meals
      .map((c) => c.strCategory)
      .filter((cat, i) => i < five && cat);
    return newData;
  } catch (error) {
    Error(error.massage);
  }
};

export const requestDrinkCategories = async () => {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    const newData = data.drinks
      .map((c) => c.strCategory)
      .filter((cat, i) => i < five && cat);
    return newData;
  } catch (error) {
    Error(error.massage);
  }
};

// export const fetchMealsRecommendations = () => {
//   // recomenda bebidas;
//   const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
//   return fetch(URL)
//     .then((response) => response.json())
//     .then((data) => data.drinks.slice(0, MAX))
//     .catch((error) => error);
// };

// export const fetchDrinksRecommendations = () => {
//   // recomenda comidas;
//   const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
//   return fetch(URL)
//     .then((response) => response.json())
//     .then((data) => data.meals.slice(0, MAX))
//     .catch((error) => error);
// };

export const fetchMealDetails = (idMeal) => {
  // idMeal = '53065';
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  return fetch(URL)
    .then((response) => response.json())
    .then((data) => data.meals[0])
    .catch((error) => error);
};
export const fetchDrinkDetails = (idDrink) => {
  // idDrink = '15997';
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`;
  return fetch(URL)
    .then((response) => response.json())
    .then((data) => data.drinks[0])
    .catch((error) => error);
};
