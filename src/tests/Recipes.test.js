import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/RenderWithRouter';
import Recipes from '../pages/Recipes';
import MockFetchs from '../helpers/MockFetchs';
// import App from '../App';

describe('Testando a página Recipes', () => {
  test('01 - Verifica se os componentes são renderizados e funcionalidade dos botões de filtro', async () => {
    MockFetchs();
    const { history } = renderWithRouter(<Recipes />);

    history.push('/meals');

    // await waitFor(() => {
    const cardName = await screen.findByTestId('0-card-name');
    expect(cardName).toBeDefined();
    expect(cardName).toHaveTextContent('Corba');
    expect(screen.queryByTestId('0-recipe-card')).toBeDefined();
    expect(screen.queryAllByTestId(/card-img/i)).toHaveLength(12);

    const beefBtn = screen.getByRole('button', { name: /beef/i });
    expect(beefBtn).toBeDefined();
    // screen.debug();
    userEvent.click(beefBtn);
    await waitFor(() => {
      // expect(screen.getByTestId('0-card-name')).toHaveTextContent(/beef and mustard pie/i);
      userEvent.click(beefBtn);
      expect(cardName).toHaveTextContent(/corba/i);
      userEvent.click(beefBtn);
      const allBtn = screen.getByRole('button', { name: /all/i });
      expect(allBtn).toBeDefined();
      userEvent.click(allBtn);
      expect(cardName).toHaveTextContent(/corba/i);
    });
  });
});
