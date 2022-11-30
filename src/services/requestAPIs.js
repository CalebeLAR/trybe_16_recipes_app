const arrLength = 12;

export const requestMeal = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    const newData = data.map((meal, i) => {
      if (i < arrLength) return meal;
      return meal;
    });
    return newData;
  } catch (error) {
    throw new Error(error.massage);
  }
};

export const requestDrink = async () => {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    const newData = data.map((drink, i) => {
      if (i < arrLength) return drink;
      return drink;
    });
    return newData;
  } catch (error) {
    throw new Error(error.massage);
  }
};
