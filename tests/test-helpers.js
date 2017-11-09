process.env.VALMIIKSI_TCP_PORT = 10999;
process.env.VALMIIKSI_TOKEN_SECRET = 'test-token-secret';
process.env.VALMIIKSI_API_KEY = 'test-api-key';
process.env.VALMIIKSI_MONGODB_CONNECTION = 'mongodb://localhost:27017/valmiiksi-dev';

const config = require('../infrastructure/config');
const authorization = require('../infrastructure/authorization');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const dropCollections = done => {
    MongoClient.connect(config.mongodbConnection, (err, db) =>{
        if (err) {
            throw 'failed to connect to MongoDB: ' + err;
        }
        db.close();
        done();
    });
};

const createCustomerToken = customer => {
    return authorization.createToken(customer);
};

module.exports = {
    dropCollections: dropCollections,
    createCustomerToken: createCustomerToken
};
