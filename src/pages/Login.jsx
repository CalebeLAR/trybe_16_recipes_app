import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Eye, Heart, Horse } from 'phosphor-react';
import styles from './Login.module.css';

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
      <div className={ styles.container }>
        <p>
          app
          <strong>receitas</strong>
        </p>
        <label htmlFor="email">
          <input
            className={ styles.input }
            type="email"
            placeholder="Email"
            name="email"
            data-testid="email-input"
            onChange={ (e) => setEmail(e.target.value) }
          />
        </label>

        <label htmlFor="password">
          <input
            className={ styles.input }
            type="password"
            placeholder="Password"
            name="password"
            data-testid="password-input"
            onChange={ (e) => setPassword(e.target.value) }
          />
          <Eye color="white" weight="bold" className={ styles.pass__eye } />
        </label>

        <button
          className={ styles.button }
          type="button"
          data-testid="login-submit-btn"
          disabled={ buttonValid() }
          onClick={ submitLogin }
        >
          Sign In
        </button>
      </div>

    </div>
  );
}
