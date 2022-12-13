import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import MockFetchs from '../helpers/MockFetchs';
import renderWithRouter from '../helpers/RenderWithRouter';

describe('Testando a página Recipe Details', () => {
  const firstCard = '0-recipe-card';
  test('01 - Verifica se os componentes são renderizados', async () => {
    MockFetchs();
    const { history } = renderWithRouter(<App />);

    history.push('/meals');
    const cardMeal = await screen.findByTestId(firstCard);
    expect(cardMeal).toBeDefined();
    userEvent.click(cardMeal);
    expect(history.location.pathname).toBe('/meals/52977');

    expect(await screen.findByRole('heading', { name: /mealscard/i })).toBeDefined();
    expect(screen.getByRole('heading', { name: /corba/i })).toBeDefined();
    expect(screen.findByTestId('0-ingredient-name-and-measure')).toBeDefined();
    expect(screen.findByTestId('instructions')).toBeDefined();
    expect(screen.findByTestId('video')).toBeDefined();

    history.push('/drinks');
    const cardDrink = await screen.findByTestId(firstCard);
    expect(cardDrink).toBeDefined();
    userEvent.click(cardDrink);
    expect(history.location.pathname).toBe('/drinks/15997');

    expect(await screen.findByRole('heading', { name: /drinkscard/i })).toBeDefined();
    expect(screen.getByRole('heading', { name: /gg/i })).toBeDefined();
    expect(screen.findByTestId('0-ingredient-name-and-measure')).toBeDefined();
  });
  test('02 - Verifica o compoente Carrosel de recomendações', async () => {
    MockFetchs();
    const { history } = renderWithRouter(<App />);

    history.push('/meals');
    const cardMeal = await screen.findByTestId(firstCard);
    expect(cardMeal).toBeDefined();
    userEvent.click(cardMeal);

    const recommendationDrinkCards = await screen.findAllByTestId(/recommendation-card/i);
    expect(recommendationDrinkCards).toBeDefined();
    expect(recommendationDrinkCards).toHaveLength(6);

    history.push('/drinks');
    const cardDrink = await screen.findByTestId(firstCard);
    expect(cardDrink).toBeDefined();
    userEvent.click(cardDrink);

    const recommendationMealCards = await screen.findAllByTestId(/recommendation-card/i);
    expect(recommendationMealCards).toBeDefined();
    expect(recommendationMealCards).toHaveLength(6);
  });
});
