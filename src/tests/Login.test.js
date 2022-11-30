import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../helpers/RenderWithRouter';

test('Testa pagina de login', async () => {
  // Este arquivo pode ser modificado ou deletado sem problemas
  const { history } = renderWithRouter(<App />);
  const emailInput = screen.getByTestId(/email-input/i);
  expect(emailInput).toBeInTheDocument();
  const passwordInput = screen.getByTestId(/password-input/i);
  expect(passwordInput).toBeInTheDocument();
  const buttonLogin = screen.getByTestId(/login-submit-btn/i);
  expect(buttonLogin).toBeInTheDocument();
  expect(buttonLogin).toBeDisabled();
  userEvent.type(emailInput, 'teste@email.com');
  userEvent.type(passwordInput, '1234567');
  expect(buttonLogin).not.toBeDisabled();
  userEvent.click(buttonLogin);
  // const { location: { pathname } } = history;
  // expect(pathname).toBe('/');
  // expect(localStorage.getItem('user')).to.deep.eq({ email: 'teste@email.com' });
});
