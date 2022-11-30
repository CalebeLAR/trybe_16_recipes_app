import React from 'react';
import { Link } from 'react-router-dom';
import rockGlass from '../images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

export default function Login() {
  return (
    <div className="meals">
      <span className="logo">TRYBE LOGIN</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        LOGIN
      </object>
      <Link to="/meals/café"> ir para detalhes</Link>
    </div>
  );
}
