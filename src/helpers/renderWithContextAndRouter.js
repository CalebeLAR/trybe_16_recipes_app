import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import AppRecipeProvider from '../contexts/AppRecipeProvider';

const renderWithContextAndProvider = (component, route = '/') => {
  const history = createMemoryHistory({ initialEntries: [route] });

  return {
    ...render(
      <AppRecipeProvider>
        <Router history={ history }>
          {component}
        </Router>
      </AppRecipeProvider>,
    ),
    history,
  };
};

export default renderWithContextAndProvider;
