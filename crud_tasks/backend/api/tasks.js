const db = require('../database/db');

function newTask() {
    return function(req, res) {
        const { id_user } = req.user;
        const { description } = req.body;
        if (id_user && description) {
            db.insert({
                id_user,
                description
            }).into('tasks')
            .then(_ => res.status(201).send({ success: true }))
            .catch(err => res.status(500).send({ success: false, error: 'Server internal error' }));
        } else {
            res.status(400).send({ success: false, error: 'Data, not found' });
        }
    }
}

function getTasks() {
    return function(req, res) {
        const { id_user } = req.user;
        if (req.user) {
            db.select(['id as key', 'description as task'])
                .table('tasks')
                .where({ id_user })
                .then(data => res.status(200).send({ success: true, data }))
                .catch(err => res.status(500).send({ success: false, error: 'Server Internal Error' }));
        } else {
            res.status(400).send({ success: false, error: 'Data, not found' });
        }
    }
}

function deleteTask() {
    return function(req, res) {
        const { id_user } = req.user;
        const { id, description } = req.body;
        if (id_user && id && description) {
            db.select('*')
                .table('tasks')
                .where({
                    id_user,
                    id,
                    description
                })
                .delete()
                .then(_ => res.status(200).send({ success: true }))
                .catch(err => res.status(500).send({ success: false, error: 'Error internal Server'+err }));
        } else {
            res.status(400).send({ success: false, error: 'Data, not found' });
        }
    }
}

function updateTask() {
    return function(req, res) {
        const { id_user } = req.user;
        const task = req.body;
        if (id_user && task.id && task.description && task.oldDescription) {
            db.update({
                id_user,
                id: task.id,
                description: task.description
            })
            .table('tasks')
            .where({ id: task.id })
            .then(_ => res.status(200).send({ success: true }))
            .catch(err => res.status(500).send({ success: false, error: 'Error Internal Server'+err }));
        } else { 
            res.status(400).send({ success: false, error: 'Data, not found' });
        }
    }
}

module.exports = {
    newTask,
    getTasks,
    deleteTask,
    updateTask
}