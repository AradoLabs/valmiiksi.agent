process.env.VALMIIKSI_TCP_PORT = 10999;
process.env.VALMIIKSI_TOKEN_SECRET = 'test-token-secret';
process.env.VALMIIKSI_API_KEY = 'test-api-key';
process.env.VALMIIKSI_MONGODB_CONNECTION = 'mongodb://localhost:27017/valmiiksi-test';

const config = require('../infrastructure/config');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const dropCollections = done => {
    MongoClient.connect(config.mongodbConnection, (err, db) => {
        if (err) {
            throw 'failed to connect to MongoDB: ' + err;
        }

        db.collection('companies').remove();
        db.close();
        done();
    });
};


const fake = require('./fake');

const storeCompany = company => {    
    const storage = require('../infrastructure/storage');

    return storage.connect().then(connection => {
        return connection.companies.insertOrUpdate(company);
    });
};

const createCustomerToken = customer => {
    const authorization = require('../infrastructure/authorization');

    return authorization.createToken(customer);
};

const login = (user = fake.profile()) => {    
    const api = require("../infrastructure/api.client");

    return api.token
        .get(config.apiKey, fake.profile())
        .then(result => result.body);
};

module.exports = {
    dropCollections: dropCollections,
    createCustomerToken: createCustomerToken,
    storeCompany: storeCompany,
    login: login
};
