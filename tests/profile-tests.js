const fake = require("./fake");
const helpers = require("./test-helpers");
const server = require("../infrastructure/server");
const api = require("../infrastructure/api.client");
const chai = require("chai");
const expect = chai.expect;

describe("Profile API", () => {

    beforeEach(helpers.dropCollections);
    before(server.start);
    after(server.stop);

    const customer = fake.customer();
    const customerToken = helpers.createCustomerToken(customer);

    describe("/profiles", () => {

        it("is secured", done => {
            api.profiles.get("invalidToken", "turku", "hvac")
                .then(result => {
                    expect(result.response.statusCode).to.equal(401);
                })
                .then(done)
                .catch(error => {
                    done(error || "failed");
                });
        });

        it("provides profiles", done => {
            api.profiles.get(customerToken, "turku", "hvac")
                .then(result => {
                    expect(result.error).to.equal(null);
                    expect(result.response.statusCode).to.equal(200);

                    const profiles = JSON.parse(result.body);

                    expect(profiles[0].name).to.equal("Jane Smith");
                })
                .then(done)
                .catch(error => {
                    done(error || "failed");
                });
        });
    });

    describe("/companies", () => {

        it("provides company name and contact details", done => {

            const hvacCompany = fake.hvacCompanyFromHelsinki();

            helpers.storeCompany(hvacCompany).then(() =>

                api.companies.get("helsinki", "hvac")
                    .then(result => {
                        expect(result.error).to.equal(null);
                        expect(result.response.statusCode).to.equal(200);

                        const profiles = JSON.parse(result.body);

                        expect(profiles).to.have.lengthOf(1);
                        expect(profiles[0].name).to.equal(hvacCompany.name);
                        expect(profiles[0].phoneNumbers).to.deep.equal(hvacCompany.phoneNumbers);
                        expect(profiles[0].websites).to.deep.equal(hvacCompany.websites);
                        expect(profiles[0].addresses).to.deep.equal(hvacCompany.addresses);
                    })
                    .then(done)
                    .catch(error => {
                        done(error || "failed");
                    })
            );
        });

        it("filters data by municipality", done => {

            const hvacCompany = fake.hvacCompanyFromHelsinki();

            helpers.storeCompany(hvacCompany).then(() =>

                api.companies.get("turku", "hvac")
                    .then(result => {
                        expect(result.error).to.equal(null);
                        expect(result.response.statusCode).to.equal(200);

                        const profiles = JSON.parse(result.body);

                        expect(profiles).to.be.empty;
                    })
                    .then(done)
                    .catch(error => {
                        done(error || "failed");
                    })
            );
        });

        it("filters data by profession", done => {

            const hvacCompany = fake.hvacCompanyFromHelsinki();

            helpers.storeCompany(hvacCompany).then(() =>

                api.companies.get("helsinki", "electrician")
                    .then(result => {
                        expect(result.error).to.equal(null);
                        expect(result.response.statusCode).to.equal(200);

                        const profiles = JSON.parse(result.body);

                        expect(profiles).to.be.empty;
                    })
                    .then(done)
                    .catch(error => {
                        done(error || "failed");
                    })
            );
        });

        it("provides HVAC companies by municipality", done => {

            const hvacCompany = fake.hvacCompanyFromHelsinki();

            helpers.storeCompany(hvacCompany).then(() =>

                api.companies.get("helsinki", "hvac")
                    .then(result => {
                        expect(result.error).to.equal(null);
                        expect(result.response.statusCode).to.equal(200);

                        const profiles = JSON.parse(result.body);

                        expect(profiles).to.have.lengthOf(1);
                    })
                    .then(done)
                    .catch(error => {
                        done(error || "failed");
                    })
            );
        });

        it("provides Electrician companies by municipality", done => {

            const electricianCompany = fake.electricianCompanyFromTurku();

            helpers.storeCompany(electricianCompany).then(() =>
                api.companies.get("Turku", "electrician")
                    .then(result => {
                        expect(result.error).to.equal(null);
                        expect(result.response.statusCode).to.equal(200);

                        const profiles = JSON.parse(result.body);

                        expect(profiles).to.have.lengthOf(1);
                    })
                    .then(done)
                    .catch(error => {
                        done(error || "failed");
                    })
            );
        });

        it("supports special characters with umlauts", done => {

            const hvacCompany = fake.hvacCompanyFromHämeenlinna();

            helpers.storeCompany(hvacCompany).then(() =>

                api.companies.get("hämeenlinna", "hvac")
                    .then(result => {
                        expect(result.error).to.equal(null);
                        expect(result.response.statusCode).to.equal(200);

                        const profiles = JSON.parse(result.body);

                        expect(profiles).to.have.lengthOf(1);
                    })
                    .then(done)
                    .catch(error => {
                        done(error || "failed");
                    })
            );
        });

        it("supports special characters without umlauts", done => {

            const hvacCompany = fake.hvacCompanyFromHämeenlinna();

            helpers.storeCompany(hvacCompany).then(() =>

                api.companies.get("hameenlinna", "hvac")
                    .then(result => {
                        expect(result.error).to.equal(null);
                        expect(result.response.statusCode).to.equal(200);

                        const profiles = JSON.parse(result.body);

                        expect(profiles).to.have.lengthOf(1);
                    })
                    .then(done)
                    .catch(error => {
                        done(error || "failed");
                    })
            );
        });
    });
});

