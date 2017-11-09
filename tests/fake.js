const users = require("../domain/users");

const customer = () => users.customer(
    username = "jdoe",
    givenName = "John",
    familyName = "Doe",
    email = "john.doe@example.com",
    telephone = "0401234567"
);

module.exports = {
    customer: customer
};
