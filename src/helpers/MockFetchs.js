import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
import mealCategories from '../../cypress/mocks/mealCategories';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import beefMeals from '../../cypress/mocks/beefMeals';
import corbaMeal from './CorbaMeal';
import ggDrink from '../../cypress/mocks/oneDrinkId15997';

export default function MockFetchs() {
  global.fetch = jest.fn((url) => Promise.resolve({
    json: () => {
      if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
        return Promise.resolve(meals);
      }
      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
        return Promise.resolve(drinks);
      }
      if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
        return Promise.resolve(mealCategories);
      }
      if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef') {
        return Promise.resolve(beefMeals);
      }
      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') {
        return Promise.resolve(drinkCategories);
      }
      if (url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977') {
        return Promise.resolve(corbaMeal);
      }
      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997') {
        return Promise.resolve(ggDrink);
      }
    },
  }));
}
