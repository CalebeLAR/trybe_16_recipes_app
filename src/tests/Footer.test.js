import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouter from '../helpers/RenderWithRouter';
import Recipes from '../pages/Recipes';

test('Testa icone drink Footer', async () => {
  // Este arquivo pode ser modificado ou deletado sem problemas
  const { history } = renderWithRouter(<Recipes />);
  const drinkIcon = screen.getByTestId(/drinks-bottom-btn/i);
  expect(drinkIcon).toBeInTheDocument();
  userEvent.click(drinkIcon);
  const { location: { pathname } } = history;
  expect(pathname).toBe('/drinks');
  expect(await screen.findByText(/drinks/i)).toBeDefined();
});

test('Testa icone meals Footer', async () => {
  // Este arquivo pode ser modificado ou deletado sem problemas
  const { history } = renderWithRouter(<Recipes />);
  const mealIcon = screen.getByTestId(/meals-bottom-btn/i);
  expect(mealIcon).toBeInTheDocument();
  userEvent.click(mealIcon);
  const { location: { pathname } } = history;
  expect(pathname).toBe('/meals');
  expect(await screen.findByText(/meals/i)).toBeDefined();
});
