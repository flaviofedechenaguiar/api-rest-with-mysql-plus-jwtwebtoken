const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');

const Game = require('./models/game.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/games', async (req, res) => {
    try {
        let games = await Game.findAll();
        res.json(games).status(200);
    } catch (err) {
        res.sendStatus(400);
    }
});

app.get('/game/:id', async (req, res) => {
    try {
        if (isNaN(req.params.id)) {
            res.sendStatus(400);
        } else {
            let game = await Game.findByPk(req.params.id);
            res.json(game).status(200);
        }
    } catch (err) {
        res.sendStatus(400);
    }
});

app.post('/game', async (req, res) => {
    let { title, year, price } = req.body;
    if (title == '' || isNaN(year) || isNaN(price)) {
        res.sendStatus(400);
    } else {
        try {
            await Game.create({ title, year, price });
            res.sendStatus(200);
        } catch (err) {
            res.sendStatus(404);
        }
    }
});

app.put('/game/:id', async (req, res) => {
    let id = req.params.id
    let { title, year, price } = req.body;
    try {
        Game.update({
            title,
            year,
            price
        }, { where: { id } });
        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(404);
    }
});


app.delete('/game/:id', async (req, res) => {
    let id = req.params.id;
    try {
        await Game.destroy({ where: { id } });
        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(404);
    }
});

authenticateDatabase = async () => {
    try {
        connection.authenticate();
        console.log('database authenticate');
    } catch (err) {
        console.log('database error: ', err);
    }
}
authenticateDatabase();


app.listen(3030, () => {
    console.log('listen api');
});