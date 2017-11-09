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

        it("provides HVAC companies", done => {
            api.companies.get("kaarina", "hvac")
                .then(result => {
                    expect(result.error).to.equal(null);
                    expect(result.response.statusCode).to.equal(200);

                    const profiles = JSON.parse(result.body);

                    expect(profiles[0].name).to.equal("LVI-Wikström Oy");
                })
                .then(done)
                .catch(error => {
                    done(error || "failed");
                });
        });

        it("provides Electrician companies", done => {
            api.companies.get("turku", "electrician")
                .then(result => {
                    expect(result.error).to.equal(null);
                    expect(result.response.statusCode).to.equal(200);

                    const profiles = JSON.parse(result.body);

                    expect(profiles[0].name).to.equal("Toikkatech Oy");
                })
                .then(done)
                .catch(error => {
                    done(error || "failed");
                });
        });
    });
});

