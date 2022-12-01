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
