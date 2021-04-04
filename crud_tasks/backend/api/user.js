const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database/db');

function registerUser() {
    return function(req, res) {
        const user = req.body;
        if (user.name && user.email && user.password) {
            db.select('*')
                .table('users')
                .where({ email: user.email })
                .then(data => {
                    if (data.length) {
                        return res.status(409).send({success: false, error: 'User already exists'});
                    } else {
                        bcrypt.hash(user.password, 10, (err, hash) => {
                            if (err) {
                                return res.status(400).send({success: false, error: 'Server error'});
                            } else {
                                db.insert({
                                    name: user.name,
                                    email: user.email,
                                    password: hash
                                }).into('users')
                                .then(_ => res.status(201).send({success: true}))
                                .catch(err => res.status(400).send({success: false, error: 'Server error'}));
                            }
                        });
                    }
                }).catch(err => {
                    return res.status(400).send({success: false, error: 'Server error'});
                });
        } else {
            return res.status(400).send({success: false, error: 'Data, not found'});
        }
    }
}

function loginUser() {
    return function(req, res) {
        const { email, password } = req.body;
        if (email && password) {
            db.select('*')
                .table('users')
                .where({ email })
                .then(data => {
                    if (data.length < 1) {
                        return res.status(400).send({success: false, error: 'User, not found'});
                    } else {
                        bcrypt.compare(password, data[0].password, (err, result) => {
                            if (err) {
                                return res.status(400).send({success: false, error: 'Server error'});
                            } else if (result) {
                                const token = jwt.sign({
                                    id_user: data[0].id,
                                    emal_user: data[0].email
                                }, process.env.JWT_KEY, {
                                    expiresIn: '0.5h'
                                });
                                return res.status(200).send({
                                    success: true,
                                    token,
                                    name: data[0].name
                                });
                            } else {
                                return res.status(400).send({success: false, error: 'Server error'});
                            }
                        });
                    }
                })
                .catch(err => {
                    return res.status(400).send({success: false, error: 'Server error'});
                });
        } else {
            return res.status(400).send({success: false, error: 'Data, not found'});
        }
    }
}

function isLoggedUser() {
    return function(req, res) {
        if (req.user) {
            res.status(200).send({ success: true });
        } else {
            res.status(401).send({ success: false, error: 'Authenticated failed' });
        }
    }
}

module.exports = {
    registerUser,
    loginUser,
    isLoggedUser
}