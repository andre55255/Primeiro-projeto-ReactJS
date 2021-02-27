const db = require('./db');

function setContato() {
    return function(req, res) {
        const dados = {...req.body}
        if (dados.nome && dados.telefone) {
            db.insert({nome: dados.nome, telefone: dados.telefone})
                .into('contatos')
                .then(_ => res.send({
                    sucesso: true
                }))
                .catch(err => {
                    console.log(err);
                    res.send({
                        sucesso: false,
                        erro: err.detail
                    });
                });
        }
    }
}

function getContatos() {
    return function(req, res) {
        db.select(['nome', 'telefone'])
            .table('contatos')
            .orderBy('nome', 'asc')
            .then(contatos => res.send({
                sucesso: true,
                contatos: contatos
            }))
            .catch(err => {
                console.log(err);
                res.send({
                    sucesso: false,
                    erro: err.detail
                });
            });
    }
}

function updateContato() {
    return function(req, res) {
        const dados = {...req.body}
        if (dados.nome && dados.telefone) {
            db.update({nome: dados.nome, telefone: dados.telefone})
                .table('contatos')
                .where({telefone: dados.telefoneAntigo})
                .then(_ => res.send({sucesso: true}))
                .catch(err => {
                    console.log(err);
                    res.send({
                        sucesso: false,
                        erro: err.detail
                    });
                });
        } else {
            res.send('Dados não informados!');
        }
    }
}

function deleteContato() {
    return function(req, res) {
        const dados = {...req.body}
        if (dados.nome && dados.telefone) {
            db.where(dados)
                .table('contatos')
                .delete()
                .then(_ => res.send({sucesso: true}))
                .catch(err => {
                    console.log(err);
                    res.send({
                        sucesso: false,
                        erro: err.detail
                    });
                });
        } else {
            res.send({sucesso: false});
        }
    }
}

module.exports = {setContato, getContatos, updateContato, deleteContato}