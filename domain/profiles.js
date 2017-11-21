const municipalities = require('./municipalities');

const Professions = {
    None: 0,
    Electrician: 1,
    HVAC: 2
};

const Address = (
    streetAddress = "",
    postalCode = "",
    postOffice = "") => ({
        streetAddress: streetAddress,
        postalCode: postalCode,
        postOffice: postOffice
    });

const PersonProfile = (
    name = "",
    professions = [Professions.None],
    email = "",
    telephone = "",
    businessID = "") => ({
        name: name,
        professions: professions,
        email: email,
        telephone: telephone,
        businessID: businessID
    });

module.exports = {
    Professions: Professions,
    PersonProfile: PersonProfile
};
