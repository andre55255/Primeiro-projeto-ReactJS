import React, {useState} from 'react';
import './Novo.css';
import mask from './mask-tel';

import Main from '../templates/Main';

import $ from 'jquery';

export default function Novo(props) {

    mask('.tel');
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');

    function criarContato(e) {
        const form = e.target.parentNode;
        const dados = new FormData(form);

        if (!(dados.get('nome'), dados.get('telefone'))){
            $.notify({message: "Dados não inseridos!"},{type: "danger"});
            return;
        }

        $.ajax({
            url: "http://localhost:8080/contatos",
            method: "post",
            data: new URLSearchParams(dados),
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            cache: false,
            success: function(resp) {
                if (resp.sucesso) {
                    $.notify({message: "Contato cadastrado com sucesso!"},{type: "success"});
                } else {
                    $.notify({message: `Erro: ${resp.erro}`},{type: "danger"});
                }
                form.reset();
            },
            error: function(err) {
                console.log(err);
                $.notify({message: "Erro no servidor!"},{type: "danger"});
                form.reset();
            }
        });
    }

    return(
        <Main>
            <div className="novo-contato">
                <h2 className="text-muted font-weight-light mb-3">Novo Contato</h2>
                <form className="w-75">
                    <div className="row">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">
                                    <i className="fa fa-user ico-form"></i>
                                </span>
                            </div>
                            <input type="text" name="nome" class="form-control" 
                                placeholder="Usuário" autoComplete="off"
                                onChange={e => setNome(e.target.value)}/>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-preppend">
                                <span className="input-group-text" id="basic-addon2">
                                    <i className="fa fa-phone ico-form"></i>
                                </span>
                            </div>
                            <input type="text" name="telefone" placeholder="Telefone"
                                autoComplete="off" className="form-control tel"
                                onChange={e => setTelefone(e.target.value)}/>
                        </div>
                    </div>
                    <button className="btn btn-primary" type="button"
                        onClick={e => criarContato(e)}>Criar contato</button>
                </form>
            </div>
        </Main>
    )
}