import { useEffect, useState } from 'react';

const useFetchByRecipeID = (type, id) => {
  const [currentRecipe, setCurrentRecipe] = useState({ type: '', recipe: '' });
  const [isFetching, setIsFetching] = useState(true);

  let URL = '';
  if (type === 'meals') {
    URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  } else {
    URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  }

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => setCurrentRecipe({ type, recipe: data[type][0] }))
      .catch((error) => console.log(error));
    setIsFetching(false);
  }, [type, id, URL, isFetching]);

  return { currentRecipe, isFetching };
};

export default useFetchByRecipeID;
