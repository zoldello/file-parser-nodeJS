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

/*
POST /records - Post a single data line in any of the 3 formats supported by your existing code
GET /records/gender - returns records sorted by gender
GET /records/birthdate - returns records sorted by birthdate
GET /records/name - returns records sorted by name
*/
