import React from "react";
import "./Nav.css";

import { Link } from "react-router-dom";

export default function Nav(props) {
  return (
    <ul className="menu nav d-flex justify-content-center">
      <li className="nav-item">
        <Link to="/" className="nav-link">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/novo" className="nav-link">
          Novo contato
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/pesquisa" className="nav-link">
          Pesquisar contatos
        </Link>
      </li>
    </ul>
  );
}
