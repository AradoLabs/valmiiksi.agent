const api = require("../infrastructure/api.client");
const config = require('../infrastructure/config');
const fake = require('./fake');

const login = (user = fake.profile()) =>
    api.token
    .get(config.apiKey, fake.profile())
    .then(result => result.body);

module.exports = {
    login: login
};
