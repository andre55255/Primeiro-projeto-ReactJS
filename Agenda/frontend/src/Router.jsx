import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import Home from './components/views/Home';
import Novo from './components/views/Novo';
import Pesquisa from './components/views/Pesquisa';

export default function Routes(props) {
    return(
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/novo" component={Novo} />
            <Route path="/pesquisa" component={Pesquisa} />
            <Redirect from="*" to="/" />
        </Switch>
    )
}