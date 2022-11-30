const twelve = 12;

export const requestMeals = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    const newData = data.meals.filter((meal, i) => i < twelve && meal);
    console.log(newData);
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
