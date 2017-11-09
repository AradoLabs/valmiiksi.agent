const customer = (
    username = "",
    givenName = "",
    familyName = "",
    email = "",
    telephone = "") => ({
        username: username,
        givenName: givenName,
        familyName: familyName,
        email: email,
        telephone: telephone
    });

module.exports = {
    customer: customer
};
