let api = require('./../../app/api');
let sinon = require('sinon');
let File = require('./../../app/file');
let express = require('express');
let fs = require('fs');
let proxyquire = require('proxyquire');
let _ = require('lodash');


describe('api', function() {
    let expressMock;


    beforeEach(function () {

        expressMock = sinon.mock(proxyquire('express', {
            'get':  _.noop
        }));
    });


    afterEach(function () {

    });

    it(`something`, () => {
        let file = new File('./spec/support/sample-pipe.txt');
        file.init();

        expressMock.expects("get").once();

    api.bootup();


    } );

    } );

/*
let express = require('express');
let fs = require('fs');


module.exports =  {
    bootup:  function(file)  {
        let app = express();

        app.get('/records/gender', (request, response)  => {
            let sortByGender = file.sortedByGenderThenLastName();

            response.json(sortByGender);
        });

        app.get('/records/birthdate', (request, response)  => {
            let sortedByDOB = file.sortedByDOB();

            response.json(sortedByDOB);
        });

        app.get('/records/name', (request, response)  => {
            let sortedByName = file.sortedByLastName();

            response.json(sortedByName);
        });

        let server = app.listen(8081, function () {
            let host = server.address().address;
            let port = server.address().port;
            console.log(`File Parser listening at http://${host}:${port}`);
        });
    }
}

*/
