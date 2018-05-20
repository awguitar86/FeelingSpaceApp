const express = require('express');
const getDb = require('./bootstrap.database');

const usersRouter = express.Router();

usersRouter.get('/get', (req, res) => {
    const db = getDb();
    const {name} = req.body;
    db.get_user( [name] )
        .then( user => res.status(200).send(user))
        .catch( err => res.status(500).send(err))
});

usersRouter.post('/post', (req, res) => {
    const db = getDb();
    const { name, latitude, longitude, feeling } = req.body;
    db.create_user([name, latitude, longitude, feeling])
        .then( () => res.status(200).send())
        .catch( err => res.send(err))
});

usersRouter.put('/update/:id', (req, res) => {
    const db = getDb();
    const id = req.params.id;
    const { name, latitude, longitude, feeling } = req.body;
    db.update_user([id, name, latitude, longitude, feeling])
        .then( promise => res.status(200).send(promise))
        .catch( err => res.send(err) )
});

usersRouter.put('/feeling/:id', (req, res) => {
    const db = getDb();
    const id = req.params.id;
    const { feeling } = req.body;
    db.update_feeling([id, feeling])
        .then( promise => res.status(200).send(promise))
        .catch( err => res.send(err) )
});

usersRouter.delete('/delete/:id', (req, res) => {
    const db = getDb();
    db.delete_user(req.params.id)
        .then( () => res.status(200).send() )
        .catch( err => res.send(err) )
});


module.exports = usersRouter;