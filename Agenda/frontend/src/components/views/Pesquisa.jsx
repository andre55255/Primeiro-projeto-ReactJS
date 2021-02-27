import React,{useState, useEffect} from 'react';
import './Pesquisa.css';
import mask from './mask-tel';

import Main from '../templates/Main';

import $ from 'jquery';

export default function Pesquisa(props) {

    mask('.tel')
    const [contatos, setContatos] = useState([]);
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [telefoneAntigo, setTelefoneAntigo] = useState('');

    useEffect(async () => {
        const resp = await fetch('http://localhost:8080/contatos');
        const contatos = await resp.json();
        setContatos(contatos.contatos);
    }, ['', contatos]);

    function renderLinhas() {
        return contatos.map((c,i) => {
            return (
                <tr key={i}>
                    <td>{c.nome}</td>
                    <td>{c.telefone}</td>
                    <td>
                        <i className="fa fa-whatsapp ico-wpp" data-toggle="modal" 
                            data-target="#wppModal" onClick={e => modalWpp(e)}></i>
                        <i className="fa fa-pencil ico-alt ml-4" onClick={e => formContato(e)}></i>
                        <i className="fa fa-trash ico-del ml-4" onClick={e => deletaContato(e)}></i>
                    </td>
                </tr>
            )
        });
    }

    function modalWpp(e) {
        const linha = e.target.parentNode.parentNode;
        const telModal = document.querySelector('#tel-modal');
        telModal.value = '55'+linha.children[1].innerHTML.substring(1).split(')').join('')
                                .split('-').join('').split(' ').join('');

        const msgModal = document.querySelector('#msg-modal');
        msgModal.value = "Olá, amigo " + linha.children[0].innerHTML;
    }

    function msgWpp(e) {
        const form = e.target.parentNode;
        const dados = new FormData(form);
        if(!(dados.get('telefone'), dados.get('msg'))){
            $.notify({message: "Dados não informados!"},{type: "danger"});
            return;
        }
        
        window.open(`https://api.whatsapp.com/send?phone=${dados.get('telefone')}&text=${dados.get('msg')}`, "_blank");
    }

    function deletaContato(e) {
        const linha = e.target.parentNode.parentNode;
        const nom = linha.children[0].innerHTML;
        const tel = linha.children[1].innerHTML;

        if (nom && tel) {
            $.ajax({
                url: "http://localhost:8080/contatos",
                method: "delete",
                data: {
                    nome: nom,
                    telefone: tel
                },
                success: function(resp) {
                    if (resp.sucesso) {
                        $.notify({message: "Contato deletado!"},{type: "success"});
                    } else {
                        $.notify({message: "Contato não encontrado!" + resp.erro},{type: "danger"});
                    }
                },
                error: function(err) {
                    $.notify({message: `Erro no servidor: ${err}`},{type: "danger"});
                }
            });
        } else {
            $.notify({message: "Erro ao deletar"},{type: "danger"});
        }
    }

    function formContato(e) {
        const nome = document.querySelector('#nome');
        const telefone = document.querySelector('#telefone');
        const botao = document.querySelector('#botao');

        nome.removeAttribute('disabled');
        telefone.removeAttribute('disabled');
        botao.removeAttribute('disabled');

        const linha = e.target.parentNode.parentNode;
        nome.value = linha.children[0].innerHTML;
        telefone.value = linha.children[1].innerHTML;

        setNome(nome.value);
        setTelefone(telefone.value);
        setTelefoneAntigo(telefone.value);
    }

    function alteraContato(e) {
        const form = e.target.parentNode;
        const dados = new FormData(form);

        if (!(dados.get('nome') && dados.get('telefone'))) {
            $.notify({message: "Dados incompletos!"},{type: "danger"});
            return;
        }

        dados.set('telefoneAntigo', telefoneAntigo);

        $.ajax({
            url: "http://localhost:8080/contatos",
            method: "put",
            data: new URLSearchParams(dados),
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            cache: false,
            success: function(resp) {
                if (resp.sucesso) {
                    $.notify({message: "Contato alterado com sucesso!"},{type: "success"});
                    form.reset();
                } else {
                    $.notify({message: "Contato não encontrado!" + resp.erro},{type: "danger"});
                    form.reset();
                }
            },
            error: function(err) {
                $.notify({message: `Erro: ${err}`},{type: "danger"});
                form.reset();
            }
        });
    }

    return (
        <Main>
            <div className="pesquisa-contato">
                <h2 className="text-muted font-weight-light mb-3">Pesquisa Contato</h2>
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
                                onChange={e => setNome(e.target.value)} id="nome"/>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-preppend">
                                <span className="input-group-text" id="basic-addon2">
                                    <i className="fa fa-phone ico-form"></i>
                                </span>
                            </div>
                            <input type="text" name="telefone" placeholder="Telefone"
                                autoComplete="off" className="form-control tel"
                                onChange={e => setTelefone(e.target.value)} id="telefone"/>
                        </div>
                    </div>
                    <button className="btn btn-warning" type="button" 
                        id="botao" onClick={e => alteraContato(e)}>Alterar</button>
                </form>

                {/* Tabela de contatos */}
                <table className="table w-75 mt-4">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Telefone</th>
                            <th scope="col">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderLinhas()}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <div className="modal fade" id="wppModal" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Enviar mensagem no whatsapp</h5>
                            <button type="button" className="close" data-dismiss="modal">
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body p-4">
                            <form>
                                <div className="row my-3">
                                    <input type="text" name="telefone" placeholder="Telefone"
                                        className="form-control" autoComplete="off"
                                        id="tel-modal"/>
                                </div>
                                <div className="row my-3">
                                    <input type="text" name="msg" placeholder="Mensagem"
                                        className="form-control" id="msg-modal"/>
                                </div>
                                <button className="btn btn-success" type="button"
                                    onClick={e => msgWpp(e)}>Enviar</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-danger" type="button" 
                                data-dismiss="modal">Fechar</button>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    )
}