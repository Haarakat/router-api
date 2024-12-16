const express = require('express');
const api = require('mikronode');
const config = require('./config');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    const connection = new api(config.host);

    connection.connect(config.username, config.password)
        .then(([login]) => {
            login.write('/interface/print', [])
                .then((result) => {
                    res.send(`<h1>Interfaces:</h1><ul>${result.data.map(i => `<li>${i.name}</li>`).join('')}</ul>`);
                    login.close();
                })
                .catch((error) => {
                    res.status(500).send(`Error executing command: ${error.message}`);
                });
        })
        .catch((error) => {
            res.status(500).send(`Connection Error: ${error.message}`);
        });
});

app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});
