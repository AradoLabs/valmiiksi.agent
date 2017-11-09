const jwt = require('jsonwebtoken');
const config = require('./config');

const parseToken = request => {
    const empty = '';
    const header = request.headers['authorization'];
    if (!header) {
        return empty;
    }

    const splitted = header.split(" ");

    if (splitted.length !== 2) {
        return empty;
    }

    return splitted[1];
};

const authorize = (request, response, next) => {
    const unauthorized = {
        success: false,
        message: 'unauthorized'
    };

    const token = parseToken(request);

    if (!token) {
        return response.status(401).send(unauthorized);
    }

    return jwt.verify(token, config.jwtSecret, (error, decoded) => {
        if (error) {
            return response.status(401).send(unauthorized);
        }
        else {
            next();
        }
    });
};

const createToken = (profile) => {
    const token = jwt.sign(
        {
            profile: profile
        },
        config.jwtSecret,
        {
            expiresIn: '7 days'
        }
    );

    return token;
};

module.exports = {
    authorize: authorize,
    createToken: createToken
};
