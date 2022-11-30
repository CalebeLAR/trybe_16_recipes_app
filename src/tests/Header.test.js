import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Header from '../components/Header';
import renderWithRouter from '../helpers/RenderWithRouter';
// import Recipes from '../pages/Recipes';

describe('Testa o componente Header', () => {
  test('1', async () => {
    const { history } = renderWithRouter(<Header />);

    history.push('/meals');

    const logo = screen.getAllByTestId('page-title');
    expect(logo[0]).toBeInTheDocument();

    const searchIcon = await screen.findByTestId('search-top-btn');
    expect(searchIcon).toBeInTheDocument();

    const profileIcon = screen.getByTestId('profile-top-btn');
    expect(profileIcon).toBeInTheDocument();

    const searchInput = screen.queryByTestId('search-input');
    expect(searchInput).toBeNull();

    waitFor(() => {
      userEvent.click(searchIcon);
      expect(searchInput).toBeInTheDocument();
    });
  });
});

// const { location: { pathname } } = history;
