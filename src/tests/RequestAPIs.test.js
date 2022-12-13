import {
  requestMeals,
  requestDrinks,
  requestMealCategories,
  requestDrinkCategories } from '../services/requestAPIs';

describe('Testando a página Recipes', () => {
  test('01 - Verifica os retornos das API', async () => {
    const arrMeals = await requestMeals();
    const arrDrinks = await requestDrinks();
    const arrMealCategories = await requestMealCategories();
    const arrDrinkCategories = await requestDrinkCategories();

    expect(arrMeals).toHaveLength(12);
    expect(arrDrinks).toHaveLength(12);
    expect(arrMealCategories).toHaveLength(5);
    expect(arrDrinkCategories).toHaveLength(5);
    expect(arrMeals[0].strMeal).toBe('Corba');
    expect(arrDrinks[0].strDrink).toBe('GG');
    expect(arrMealCategories[0]).toBe('Beef');
    expect(arrDrinkCategories[0]).toBe('Ordinary Drink');
  });
});
