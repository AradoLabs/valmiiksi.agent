const mongodb = require('mongodb');
const config = require('./config');
const MongoClient = mongodb.MongoClient;

const operationFailed = (db, error) => {
    return {
        db: db,
        error: error
    };
};

const operationSucceeded = (db, data) => {
    return {
        db: db,
        data: data
    };
};

const connectToMongo = () => {
    const mongoConnection = config.mongodbConnection;

    return new Promise((resolve, reject) => {
        MongoClient.connect(mongoConnection, (err, db) => {
            if (err) {
                return reject(operationFailed(null, err));
            }

            return resolve(operationSucceeded(db));
        });
    });
};

const connection = connectToMongo()
    .then((result) => {
        return ensureUniqueIndex(result.db, 'companies', 'businessID');
    })
    .then((result) => {
        return ensureNonUniqueIndex(result.db, 'companies', 'municipalities');
    })
    .then((result) => {
        return ensureNonUniqueIndex(result.db, 'companies', 'addresses');
    })
    .then((result) => {
        return ensureNonUniqueIndex(result.db, 'companies', 'businessLineCodes');
    })
    .then((result) => {
        return ensureNonUniqueIndex(result.db, 'companies', 'registrationDate');
    })
    .then((result) => {
        return ensureNonUniqueIndex(result.db, 'companies', 'updated');
    })
    .then((result) => {
        return storage(result.db);
    });

const ensureUniqueIndex = (db, collectionName, field) => {
    return new Promise((resolve, reject) => {
        db.collection(collectionName).createIndex(field, {
            unique: true
        }, (err) => {
            if (err) {
                return reject(operationFailed(db, err));
            }

            return resolve(operationSucceeded(db));
        });
    });
};

const ensureNonUniqueIndex = (db, collectionName, field) => {
    return new Promise((resolve, reject) => {
        db.collection(collectionName).createIndex(field, {
            unique: false
        }, (err) => {
            if (err) {
                return reject(operationFailed(db, err));
            }

            return resolve(operationSucceeded(db));
        });
    });
};

const insertOrUpdate = (db, collectionName, query, updated) => {

    const paramers = {
        w: 1,
        upsert: true
    };

    return new Promise((resolve, reject) => {
        db.collection(collectionName).update(query, updated, paramers, (err) => {
            if (err) {
                return reject(operationFailed(db, err));
            }

            return resolve(operationSucceeded(db, updated));
        });
    });
};

const insert = (db, collectionName, inserted) => {

    const paramers = {
        w: 1
    };

    return new Promise((resolve, reject) => {
        db.collection(collectionName).insertOne(inserted, paramers, (err) => {
            if (err) {
                return reject(operationFailed(db, err));
            }

            return resolve(operationSucceeded(db, inserted));
        });
    });
};

const findOne = (db, collectionName, query) => {
    return new Promise((resolve, reject) => {
        db.collection(collectionName).findOne(query, (err, found) => {
            if (err) {
                return reject(operationFailed(db, err));
            }

            return resolve(operationSucceeded(db, found));
        });
    });
};

const find = (db, collectionName, query) => {
    const options = {
        // 'limit': 30,
        'sort': [['registrationDate', 'asc']]
    };
    return new Promise((resolve, reject) => {
        db.collection(collectionName).find(query, options, (err, found) => {
            if (err) {
                return reject(operationFailed(db, err));
            }

            return resolve(operationSucceeded(db, found));
        });
    })
        .then((result) => {
            return new Promise((resolve, reject) => {
                result.data.toArray((err, array) => {
                    if (err) {
                        return reject(operationFailed(result.db, err));
                    }

                    return resolve(operationSucceeded(result.db, array));
                });
            });
        });
};

const companies = (db) => {
    return {
        insertOrUpdate: (company) => {
            const query = {
                'businessID': company.businessID
            };

            return insertOrUpdate(db, 'companies', query, company)
                .then((result) => {
                    return Promise.resolve(result.data);
                })
                .catch((result) => {
                    return Promise.reject(result.error);
                });
        },

        find: (municipality, businessLineCode) => {
            const query = {
                'municipalities': municipality,
                'businessLineCodes': businessLineCode,
                'phoneNumbers': { $exists: true, $not: {$size: 0} }
            };

            return find(db, 'companies', query)
                .then((result) => {
                    return Promise.resolve(result.data);
                })
                .catch((result) => {
                    return Promise.reject(result.error);
                });
        },

        findOne: (businessID) => {
            const query = {
                'businessID': businessID
            };

            return findOne(db, 'companies', query)
                .then((result) => {
                    return Promise.resolve(result.data);
                })
                .catch((result) => {
                    return Promise.reject(result.error);
                });
        }
    };
};

const storage = (db) => {
    return {
        companies: companies(db),
        close: () => db.close()
    };
};

const connect = () => {
    return connection;
};

module.exports = {
    connect: connect
};
