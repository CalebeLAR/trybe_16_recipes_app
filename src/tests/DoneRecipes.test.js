import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import MockDoneRecipes from '../helpers/MockDoneRecipes';
import renderWithRouter from '../helpers/RenderWithRouter';

describe('Testando a página Done Recipes', () => {
  const pageDoneRecipes = '/done-recipes';
  test('01 - Verifica se os componentes são renderizados', async () => {
    const { history } = renderWithRouter(<App />);

    history.push(pageDoneRecipes);
    expect(history.location.pathname).toBe(pageDoneRecipes);
    expect(await screen.findByText(/done recipes/i)).toBeDefined();
    expect(screen.getAllByTestId(/filter-by/i)).toHaveLength(3);
    expect(screen.getByText(/nenhuma receita pronta!/i)).toBeDefined();
    expect(screen.getAllByText(/retornar para/i)).toHaveLength(2);

    localStorage.setItem('doneRecipes', JSON.stringify(MockDoneRecipes));
    expect(await screen.findAllByTestId(/-recipe-card/i)).toHaveLength(3);
    expect(screen.getByTestId('0-recipe-card')).toBeDefined();
    expect(screen.getByTestId('0-horizontal-image')).toBeDefined();
  });
  test('02 - Verifica funcionalidade dos botões', async () => {
    const { history } = renderWithRouter(<App />);

    history.push(pageDoneRecipes);
    expect(history.location.pathname).toBe(pageDoneRecipes);
    expect(await screen.findByText(/nenhuma receita pronta!/i)).toBeDefined();
    const toMealsBtn = screen.getByText(/retornar para comidas/i);
    userEvent.click(toMealsBtn);
    expect(history.location.pathname).toBe('/meals');

    history.push(pageDoneRecipes);
    expect(history.location.pathname).toBe(pageDoneRecipes);
    expect(await screen.findByText(/nenhuma receita pronta!/i)).toBeDefined();
    const toDrinksBtn = screen.getByText(/retornar para bebidas/i);
    userEvent.click(toDrinksBtn);
    expect(history.location.pathname).toBe('/drinks');

    history.push(pageDoneRecipes);
    expect(history.location.pathname).toBe(pageDoneRecipes);
    // screen.debug()
    localStorage.setItem('doneRecipes', JSON.stringify(MockDoneRecipes));
    expect(await screen.findAllByTestId(/-recipe-card/i)).toHaveLength(3);
    const filterMealsBtn = screen.getByTestId('filter-by-meal-btn');
    userEvent.click(filterMealsBtn);
    expect(screen.getAllByTestId(/-recipe-card/i)).toHaveLength(2);

    const filterDrinksBtn = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(filterDrinksBtn);
    expect(screen.getAllByTestId(/-recipe-card/i)).toHaveLength(1);

    const filterAllBtn = screen.getByTestId('filter-by-all-btn');
    userEvent.click(filterAllBtn);
    expect(await screen.findAllByTestId(/-recipe-card/i)).toHaveLength(3);
  });
});
