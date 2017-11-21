const municipalities = require('./municipalities');

const BusinessLines = {
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
        case "electrician": return BusinessLines.Electrician;
        case "hvac": return BusinessLines.HVAC;
        default: return BusinessLines.None;
    }
};

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
    BusinessLines: BusinessLines,
    CompanyProfile: CompanyProfile,
    parseBusinessLineCode: parseBusinessLineCode
};
