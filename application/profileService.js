const municipalities = require('../domain/municipalities');
const profiles = require('../domain/profiles');
const companies = require('../domain/companies');
const storage = require('../infrastructure/storage');

const findPersonProfiles = (municipalityName, professionName) => {

    const personProfiles = [
        profiles.PersonProfile("Jane Smith", profiles.Professions.Electrician),
        profiles.PersonProfile("John Smith", profiles.Professions.HVAC),
        profiles.PersonProfile("Flower Smith", profiles.Professions.HVAC)
    ];

    return Promise.resolve(personProfiles);
};

const findCompanyProfiles = (municipalityName, profession) => {
    const businessLineCode = companies.parseBusinessLineCode(profession);
    const municipality = municipalities.findMunicipality(municipalityName).name.toUpperCase();

    const toPresentationCompanyProfile = storedObject => ({
        name: storedObject.name,
        phoneNumbers: storedObject.phoneNumbers,
        websites: storedObject.websites,
        addresses: storedObject.addresses
    });

    const toPresentationCompanyProfiles = storedObjects =>
        storedObjects.map(toPresentationCompanyProfile);

    return storage.connect().then(
        storage => storage.companies
            .find(municipality, businessLineCode)
            .then(toPresentationCompanyProfiles));
};

module.exports = {
    findPersonProfiles: findPersonProfiles,
    findCompanyProfiles: findCompanyProfiles
};
