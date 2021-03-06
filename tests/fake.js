const users = require("../domain/users");
const profiles = require("../domain/profiles");
const companies = require("../domain/companies");

const customer = () => users.customer(
    username = "jdoe",
    givenName = "John",
    familyName = "Doe",
    email = "john.doe@example.com",
    telephone = "0401234567"
);

const electricianCompanyFromTurku = () => companies.CompanyProfile(
    businessID = "12345",
    name = "Example Electrician Company",
    registrationDate = new Date("2015-12-24"),
    municipalities = ["TURKU"],
    businessLineCodes = [43210],
    phoneNumbers = ["0401234567"],
    websites = ["http://example.com/electrician"],
    addresses = ["Street 1 E 12"],
    updated = new Date()
);

const hvacCompanyFromHelsinki = () => companies.CompanyProfile(
    businessID = "67890",
    name = "Example HVAC Company",
    registrationDate = new Date("2016-12-24"),
    municipalities = ["HELSINKI"],
    businessLineCodes = [43220],
    phoneNumbers = ["0401111111"],
    websites = ["http://example.com/hvac"],
    addresses = ["Street 1 H 12"],
    updated = new Date()
);

const hvacCompanyFromÄänekoski = () => companies.CompanyProfile(
    businessID = "11111",
    name = "Another  HVAC Company",
    registrationDate = new Date("2016-12-24"),
    municipalities = ["ÄÄNEKOSKI"],
    businessLineCodes = [43220],
    phoneNumbers = ["0401111111"],
    websites = ["http://example.com/äänekoski/hvac"],
    addresses = ["Street 1 H 12"],
    updated = new Date()
);

module.exports = {
    customer: customer,
    electricianCompanyFromTurku: electricianCompanyFromTurku,
    hvacCompanyFromHelsinki: hvacCompanyFromHelsinki,
    hvacCompanyFromÄänekoski: hvacCompanyFromÄänekoski
};
