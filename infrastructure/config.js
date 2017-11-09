module.exports = {
    tcpPort: process.env.VALMIIKSI_TCP_PORT || 10888,
    jwtSecret: process.env.VALMIIKSI_TOKEN_SECRET || 'development-token-secret',
    mongodbConnection: process.env.VALMIIKSI_MONGODB_CONNECTION || 'mongodb://localhost:27017/valmiiksi-dev'
};
