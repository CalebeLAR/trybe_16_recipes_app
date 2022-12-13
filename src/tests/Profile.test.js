import { screen } from '@testing-library/react';
import React from 'react';
import renderWithRouter from '../helpers/RenderWithRouter';
import Profile from '../pages/Profile';

describe('Teste componente profile', () => {
  // beforeEach(() => { jest.resetAllMocks(); });
  // afterEach(() => { jest.resetAllMocks(); });
  it('Verifica botões pag profile', () => {
    renderWithRouter(<Profile />);

    const buttonDoneRecipes = screen.getByTestId('profile-done-btn');
    expect(buttonDoneRecipes).toBeInTheDocument();

    const buttonLogout = screen.getByTestId('profile-logout-btn');
    expect(buttonLogout).toBeInTheDocument();

    const btnFavoriteRecipes = screen.getByTestId('profile-favorite-btn');
    expect(btnFavoriteRecipes).toBeInTheDocument();
  });
  it('Verifica o botão Favorite Recipes', async () => {
    const { history } = renderWithRouter(<Profile />);

    const buttonDoneRecipes = screen.getByTestId('profile-done-btn');

    await userEvent.click(buttonDoneRecipes);
    expect(history.location.pathname).toBe('/done-recipes');
  });
  it('Verifica o botão favorite recipes', async () => {
    const { history } = renderWithRouter(<Profile />);
    const btnFavoriteRecipes = screen.getByTestId('profile-favorite-btn');
    await userEvent.click(btnFavoriteRecipes);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  it('Verifica o botão logout', async () => {
    const { history } = renderWithRouter(<Profile />);

    const buttonLogout = screen.getByTestId('profile-logout-btn');
    await userEvent.click(buttonLogout);
    expect(history.location.pathname).toBe('/');
  });
});
