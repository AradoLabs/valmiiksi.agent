const express = require('express');
const authorization = require('./authorization');
const profileService = require('../application/profileService');
const municipalities = require('../domain/municipalities');

const setup = app => {

    const profileRoutes = express.Router();
    const companyRoutes = express.Router();

    profileRoutes.use((request, response, next) => {
        return authorization.authorize(request, response, next);
    });

    profileRoutes.get('/:municipality/:profession', (request, response) => {
        const municipality = request.params.municipality;
        const profession = request.params.profession;
        const profilesPromise = profileService.findPersonProfiles(municipality, profession);

        return profilesPromise
            .then(profiles => response.status(200).send(profiles))
            .catch(reason => response.status(500).send(reason));
    });

    companyRoutes.get('/:municipality/:profession', (request, response) => {
        const municipalityName = request.params.municipality;
        const profession = request.params.profession;

        return profileService.findCompanyProfiles(municipalityName, profession)
            .then(profiles => response.status(200).send(profiles))
            .catch(reason => response.status(500).send(reason));
    });

    companyRoutes.get('/municipalities', (request, response) => {

        const allMunicipalities = municipalities.allMunicipalities();

        return response.status(200).send(allMunicipalities);
    });

    app.use((req, res, next) => {        
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        // res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });

    app.use('/api/profiles', profileRoutes);
    app.use('/api/companies', companyRoutes);
};

module.exports = {
    setup: setup
};
