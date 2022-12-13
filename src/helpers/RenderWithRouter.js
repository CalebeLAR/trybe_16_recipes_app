import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import AppRecipeProvider from '../contexts/AppRecipeProvider';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <AppRecipeProvider>
        <Router history={ history }>{component}</Router>
      </AppRecipeProvider>,
    ),
    history,
  });
};

export default renderWithRouter;
