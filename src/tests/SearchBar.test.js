import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

import meals from '../../cypress/mocks/meals';
import mealCategories from '../../cypress/mocks/mealCategories';
import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';
import emptyMeals from '../../cypress/mocks/emptyMeals';
import oneMeal from '../../cypress/mocks/oneMeal';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import drinks from '../../cypress/mocks/drinks';
import drinksByIngredient from '../../cypress/mocks/drinksByIngredient';
import emptyDrinks from '../../cypress/mocks/emptyDrinks';
import oneDrink from '../../cypress/mocks/oneDrink';
import renderWithContextAndProvider from '../helpers/renderWithContextAndRouter';

const SEARCH_ICON = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const INGREDIENT_RADIO = 'ingredient-search-radio';
const NAME_RADIO = 'name-search-radio';
const LETTER_RADIO = 'first-letter-search-radio';
const SEARCH_BUTTON = 'exec-search-btn';

global.alert = jest.fn();

describe('Testa o componente SeachBar', () => {
  test('1) Meals', async () => {
    global.fetch = jest.fn((url) => Promise.resolve({
      status: 200,
      ok: true,
      json: () => {
        if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
          return Promise.resolve(mealCategories);
        }

        if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
          return Promise.resolve(meals);
        }

        if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken') {
          return Promise.resolve(mealsByIngredient);
        }

        if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=xablau') {
          return Promise.resolve(emptyMeals);
        }

        if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata') {
          return Promise.resolve(oneMeal);
        }
      },
    }));

    renderWithContextAndProvider(<App />, '/meals');

    // await waitForElementToBeRemoved(screen.getByText(/assando/i));
    expect(await screen.findByText(/corba/i)).toBeInTheDocument();

    expect(screen.queryByTestId(SEARCH_INPUT)).toBeNull();
    expect(screen.queryByTestId(INGREDIENT_RADIO)).toBeNull();
    expect(screen.queryByTestId(NAME_RADIO)).toBeNull();
    expect(screen.queryByTestId(LETTER_RADIO)).toBeNull();
    expect(screen.queryByTestId(SEARCH_BUTTON)).toBeNull();

    const searchIcon = screen.getByTestId(SEARCH_ICON);
    userEvent.click(searchIcon);

    expect(screen.queryByTestId(SEARCH_INPUT)).toBeDefined();
    expect(screen.queryByTestId(INGREDIENT_RADIO)).toBeDefined();
    expect(screen.queryByTestId(NAME_RADIO)).toBeDefined();
    expect(screen.queryByTestId(LETTER_RADIO)).toBeDefined();
    expect(screen.queryByTestId(SEARCH_BUTTON)).toBeDefined();

    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'corba');
    userEvent.click(screen.getByTestId(NAME_RADIO));
    userEvent.click(screen.getByTestId(SEARCH_BUTTON));

    expect(await screen.findByText(/corba/i)).toBeInTheDocument();

    userEvent.clear(screen.getByTestId(SEARCH_INPUT));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'Chicken');
    userEvent.click(screen.getByTestId(INGREDIENT_RADIO));
    userEvent.click(screen.getByTestId(SEARCH_BUTTON));

    expect(await screen.findByText('Chicken Alfredo Primavera')).toBeInTheDocument();

    userEvent.clear(screen.getByTestId(SEARCH_INPUT));

    userEvent.type(await screen.findByTestId(SEARCH_INPUT), 'xablau');
    userEvent.click(screen.getByTestId(INGREDIENT_RADIO));
    userEvent.click(screen.getByTestId(SEARCH_BUTTON));

    expect(global.alert).toHaveBeenCalled();

    userEvent.keyboard('{Escape}');
    userEvent.clear(screen.getByTestId(SEARCH_INPUT));

    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'q');
    userEvent.click(screen.getByTestId(LETTER_RADIO));
    userEvent.click(screen.getByTestId(SEARCH_BUTTON));

    userEvent.clear(screen.getByTestId(SEARCH_INPUT));

    userEvent.click(screen.getByTestId(LETTER_RADIO));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'qq');

    expect(global.alert).toHaveBeenCalled();

    userEvent.keyboard('{Escape}');
    userEvent.clear(screen.getByTestId(SEARCH_INPUT));

    userEvent.click(screen.getByTestId(NAME_RADIO));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'Arrabiata');
    userEvent.click(screen.getByTestId(SEARCH_BUTTON));
    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata');

    expect(await screen.findByRole('heading', { name: /Recipe/i, level: 1 })).toBeInTheDocument();
  });

  test('2) Drinks', async () => {
    global.fetch = jest.fn((url) => Promise.resolve({
      json: () => {
        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') {
          return Promise.resolve(drinkCategories);
        }

        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
          return Promise.resolve(drinks);
        }

        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Light rum') {
          return Promise.resolve(drinksByIngredient);
        }

        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=xablau') {
          return Promise.resolve(emptyDrinks);
        }

        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine') {
          return Promise.resolve(oneDrink);
        }
      },
    }));

    renderWithContextAndProvider(<App />, '/drinks');

    // await waitForElementToBeRemoved(screen.getByText(/assando/i));
    expect(await screen.findByText(/GG/i)).toBeInTheDocument();

    expect(screen.queryByTestId(SEARCH_INPUT)).toBeNull();
    expect(screen.queryByTestId(INGREDIENT_RADIO)).toBeNull();
    expect(screen.queryByTestId(NAME_RADIO)).toBeNull();
    expect(screen.queryByTestId(LETTER_RADIO)).toBeNull();
    expect(screen.queryByTestId(SEARCH_BUTTON)).toBeNull();

    const searchIcon = screen.getByTestId(SEARCH_ICON);
    userEvent.click(searchIcon);

    expect(screen.queryByTestId(SEARCH_INPUT)).toBeDefined();
    expect(screen.queryByTestId(INGREDIENT_RADIO)).toBeDefined();
    expect(screen.queryByTestId(NAME_RADIO)).toBeDefined();
    expect(screen.queryByTestId(LETTER_RADIO)).toBeDefined();
    expect(screen.queryByTestId(SEARCH_BUTTON)).toBeDefined();

    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'Light rum');

    // expect(screen.getByTestId(SEARCH_INPUT)).toHaveTextContent('Light rum');

    userEvent.click(screen.getByTestId(INGREDIENT_RADIO));
    expect(screen.getByTestId(INGREDIENT_RADIO)).toBeChecked();

    userEvent.click(screen.getByTestId(SEARCH_BUTTON));
    await waitForElementToBeRemoved(screen.getByText(/assando/i));
    expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Light rum');
    expect(await screen.findByText(/Boston Sidecar/i)).toBeInTheDocument();

    userEvent.click(screen.getByTestId(NAME_RADIO));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), /Aquamarine/i);
    userEvent.click(screen.getByTestId(SEARCH_BUTTON));

    await waitForElementToBeRemoved(screen.getByText(/assando/i));

    userEvent.type(screen.getByTestId(SEARCH_INPUT), /xablau/i);
    userEvent.click(screen.getByTestId(INGREDIENT_RADIO));
    userEvent.click(screen.getByTestId(SEARCH_BUTTON));

    expect(global.alert).toHaveBeenCalled();

    userEvent.type(screen.getByTestId(SEARCH_INPUT), /a/i);
    userEvent.click(screen.getByTestId(LETTER_RADIO));
    userEvent.click(screen.getByTestId(SEARCH_BUTTON));

    userEvent.click(screen.getByTestId(LETTER_RADIO));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), /aa/i);

    expect(global.alert).toHaveBeenCalled();

    userEvent.keyboard('{Escape}');
    userEvent.clear(screen.getByTestId(SEARCH_INPUT));

    userEvent.click(screen.getByTestId(NAME_RADIO));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'Aquamarine');
    userEvent.click(screen.getByTestId(SEARCH_BUTTON));
    expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine');

    expect(await screen.findByRole('heading', { name: /Recipe/i, level: 1 })).toBeInTheDocument();
  });
});
