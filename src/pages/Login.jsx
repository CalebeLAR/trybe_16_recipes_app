import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const NUMBER_SIX = 6;
  const history = useHistory();

  const buttonValid = () => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return !(emailRegex.test(email) && password.length > NUMBER_SIX);
  };

  const submitLogin = () => {
    localStorage.setItem('user', JSON.stringify({ email: `${email}` }));
    history.push('/meals');
  };

  return (
    <div>
      <label htmlFor="email">
        <input
          type="email"
          placeholder="Email"
          name="email"
          data-testid="email-input"
          onChange={ (e) => setEmail(e.target.value) }
        />
      </label>
      <label htmlFor="password">
        <input
          type="password"
          placeholder="Password"
          name="password"
          data-testid="password-input"
          onChange={ (e) => setPassword(e.target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ buttonValid() }
        onClick={ submitLogin }
      >
        Login
      </button>
    </div>
  );
}
