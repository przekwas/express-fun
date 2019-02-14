const fs = require('fs');
const path = require('path');
const express = require('express');

const tournamentPath = path.join(__dirname, '../tournament/registered_players.json');

let app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    console.log(`Request at: ${req.url}`);
    next();
});

app.get('/players', (req, res, next) => {
    fs.readFile(tournamentPath, (err, data) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }

        let response = JSON.parse(data);
        // res.json({ response });
        res.send(response);
    })
});

app.post('/register', (req, res, next) => {
    let newPlayer = {
        name: req.body.name,
        handle: req.body.handle
    };

    fs.readFile(tournamentPath, (err, data) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }

        let currentPlayers = JSON.parse(data);
        currentPlayers.push(newPlayer);

        fs.writeFile(tournamentPath, JSON.stringify(currentPlayers), (err) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            }
            res.send(`Thank you for registering, ${newPlayer.name}.`);
        });
    });
});

app.use('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, './404.html'));
});

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}!`));