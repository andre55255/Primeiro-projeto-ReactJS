import React from 'react';

import Main from '../templates/Main';

export default function Home(props) {
    return(
        <Main>
            <div className="jumbotron shadow">
                <h1 className="display-4">Bem vindo ao app Agenda</h1>
                <p className="lead">Um app simples, para salvar, editar, ver e excluir contatos.</p>
                <hr className="my-3"/>
                <p>Exemplificando um CRUD feito usando React, e Bootstrap no frontend 
                    e Express e Knex no Backend</p>
            </div>
        </Main>
    )
}