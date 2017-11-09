const municipalities = require('./municipalities');

const Professions = {
    None: 0,
    Electrician: 43210,
    HVAC: 43220
};

const Address = (
    streetAddress = "",
    postalCode = "",
    postOffice = "") => ({
        streetAddress: streetAddress,
        postalCode: postalCode,
        postOffice: postOffice
    });

const parseBusinessLineCode = (professionName = "") => {
    switch (professionName.toLowerCase()) {
        case "electrician": return Professions.Electrician;
        case "hvac": return Professions.HVAC;
        default: return Professions.None;
    }
};

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

const CompanyProfile = (
    businessID = "",
    name = "",
    registrationDate = new Date(),
    municipalities = [],
    businessLineCodes = [],
    phoneNumbers = [],
    websites = [],
    addresses = []) => ({
        businessID: businessID,
        name: name,
        registrationDate: registrationDate,
        municipalities: municipalities,
        businessLineCodes: businessLineCodes,
        phoneNumbers: phoneNumbers,
        websites: websites,
        addresses: addresses,
        updated: new Date()
    });


module.exports = {
    Professions: Professions,
    PersonProfile: PersonProfile,
    CompanyProfile: CompanyProfile,
    parseBusinessLineCode: parseBusinessLineCode
};
