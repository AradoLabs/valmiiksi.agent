const request = require('request');
const config = require('./config');
const apiAddress = "http://localhost:10999/api/";
const profilesEndpoint = apiAddress + 'profiles';
const companiesEndpoint = apiAddress + 'companies';

const api = {
    profiles: {
        get: (token, municipality, profession) => {
            return new Promise((resolve, reject) => {
                const getRequest = {
                    url: profilesEndpoint + `/${municipality}/${profession}`,
                    method: 'GET',
                    headers: {
                        "Authorization": "beared " + token
                    }
                };
                
                request(getRequest, (error, response, body) => {
                    return resolve({
                        error: error,
                        response: response,
                        body: body
                    });
                });
            });
        }
    },

    companies: {
        get: (municipality, profession) => {
            return new Promise((resolve, reject) => {
                const getRequest = {
                    url: companiesEndpoint + `/${municipality}/${profession}`,
                    method: 'GET'
                };
                
                return request(getRequest, (error, response, body) => {
                    return resolve({
                        error: error,
                        response: response,
                        body: body
                    });
                });
            });
        }
    }
};


module.exports = api;