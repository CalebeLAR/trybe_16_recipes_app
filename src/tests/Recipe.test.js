import { screen } from '@testing-library/react';
import { wait } from '@testing-library/user-event/dist/utils';
import renderWithRouter from '../helpers/RenderWithRouter';
import Recipes from '../pages/Recipes';
import AppRecipeProvider from '../contexts/AppRecipeProvider';

describe('Testando a página Recipe', () => {
  test('01 - Verifica se os componentes são renderizados', async () => {
    const { history } = renderWithRouter(
      <AppRecipeProvider>
        <Recipes />
      </AppRecipeProvider>,
    );
    history.push('/meals');

    await wait(() => {
      expect(screen.findByTestId('0-card-name')).toBeDefined();
      expect(screen.findByTestId('0-recipe-card')).toBeDefined();
      expect(screen.findAllByRole('img')).toHaveLength(12);
    });

    history.push('/drinks');

    await wait(() => {
      expect(screen.findByTestId('0-card-name')).toBeDefined();
      expect(screen.findAllByRole('img')).toHaveLength(12);
    });
  });
});
