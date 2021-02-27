import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-notify-master/bootstrap-notify.min.js';
import 'jQuery-Mask-Plugin-master/dist/jquery.mask.min.js';

import {BrowserRouter} from 'react-router-dom';

import Header from './components/templates/Header';
import Nav from './components/templates/Nav';
import Routes from './Router';
import Footer from './components/templates/Footer';

export default function App(props) {
    return (
        <BrowserRouter>
            <div className="app">
                <Header />
                <Routes />
                <Nav />
                <Footer />
            </div>
        </BrowserRouter>
    )
}