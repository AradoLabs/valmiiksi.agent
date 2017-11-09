const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const api = require('./api');
const appName = "valmiiksi.fi";
const storage = require('../infrastructure/storage');

var server;

const start = () => new Promise((resolve, reject) => {

    app.use(bodyParser.json());
    api.setup(app);

    storage.connect().then(() => {
        server = app.listen(config.tcpPort, resolve);
    });

    console.log("%s listening on port %i", appName, config.tcpPort);

    return resolve(server);
});

const stop = done => {
    if (server) {
        storage.connect().then(connection => {
            connection.close();
            server.close(done);
        });
    } else {
        done();
    }
};

const isLibrary = Boolean(module.parent);
const serverShouldBeStarted = !isLibrary;

if (serverShouldBeStarted) {
    return start();
}

if (isLibrary) {
    module.exports = {
        start: start,
        stop: stop
    };
}
