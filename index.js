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
        res.json(games);
        res.statusCode = 200;

    } catch (err) {
        res.sendStatus(400);
    }
});

app.get("/game/:id", async (req, res) => {
    try {
        if (isNaN(req.params.id)) {
            res.sendStatus(400);
        } else {
            let game = await Game.findByPk(req.params.id);
            res.json(game);
            res.statusCode(200);
        }
    } catch (err) {
        res.sendStatus(400);
    }
});

app.post('/game', async (req, res) => {
    let { title, year, price } = req.body;
    if (title == '') {
        res.sendStatus(400);
    }
    if (isNaN(year)) {
        res.sendStatus(400);
    }
    if (isNaN(price)) {
        res.sendStatus(400);
    }

   await Game.create({ title, year, price });
    res.sendStatus(200);

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