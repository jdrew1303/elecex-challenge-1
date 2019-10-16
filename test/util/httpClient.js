'use strict';

const request = require('request-promise');

module.exports = {
    get(uri) {
        const options = {
            method: 'GET',
            uri
        };
        return this.sendRequest(options);
    },
    post(uri, body) {
        const options = {
            method: 'POST',
            uri,
            body
        };
        return this.sendRequest(options);
    },
    sendRequest(requestOptions) {
        const baseOptions = {
            json: true,
            resolveWithFullResponse: true,
            headers: {
                'Content-type': 'application/json'
            }
        };
        const options = Object.assign(requestOptions, baseOptions);
        return request(options);
    }
};
