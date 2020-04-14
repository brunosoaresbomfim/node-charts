const express    = require('express');
const app        = express.Router();
const knex       = require('../db');

app.get('/', (req, res, next) => {
    res.render('index');
});

app.get('/all', (req, res, next) => {
    knex('charts').then(dados => {
        res.send(dados);
    }).catch(err => {
        res.send(err);
    });
});

app.post('/save', (req, res, next) => {
    knex('charts')
        .insert(req.body)
        .then(dados => {
            res.send(dados);
        }).catch(err => {
        res.send(err);
        });
});

module.exports = app;