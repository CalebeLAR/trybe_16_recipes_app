import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Footer from '../components/Footer';
import renderWithRouter from '../helpers/RenderWithRouter';

test('Testa icone drink Footer', () => {
  // Este arquivo pode ser modificado ou deletado sem problemas
  const { history } = renderWithRouter(<Footer />);
  const drinkIcon = screen.getByTestId(/drinks-bottom-btn/i);
  expect(drinkIcon).toBeInTheDocument();
  userEvent.click(drinkIcon);
  const { location: { pathname } } = history;
  expect(pathname).toBe('/drinks');
});

test('Testa icone meals Footer', () => {
  // Este arquivo pode ser modificado ou deletado sem problemas
  const { history } = renderWithRouter(<Footer />);
  const mealIcon = screen.getByTestId(/meals-bottom-btn/i);
  expect(mealIcon).toBeInTheDocument();
  userEvent.click(mealIcon);
  const { location: { pathname } } = history;
  expect(pathname).toBe('/meals');
});
