import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC<any> = () => (
  <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link className="nav-link" to="/welcome">Welcome!</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/pokedex">Pokedex</Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
