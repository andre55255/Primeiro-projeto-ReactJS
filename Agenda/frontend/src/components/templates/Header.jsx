import React from 'react';
import './Header.css';

import {Link} from 'react-router-dom';

export default function Header(props) {
    return (
        <header className="cabecalho">
            <Link to="/">
                <i className="fa fa-phone logo"></i>
                <span className="display-4">Agenda</span>
            </Link>
        </header>
    )
}