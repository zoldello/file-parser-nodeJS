let File = require('./../../app/file');
let api = require('./../../app/api');
let sinon = require('sinon');

describe('file', function() {
    beforeEach(function () {
    });

    afterEach(function () {
    });

    it(`should be able to get Comma separated file compnents`, () => {
        let file = new File('./spec/support/sample-csv.txt');
        file.init();

        let firstRow = file.getComponents()[0];

        expect(firstRow.lastName).toEqual(`Jackson`);
        expect(firstRow.firstName).toEqual(`Michael`);
        expect(firstRow.gender).toEqual(`Male`);
        expect(firstRow.favoriteColor).toEqual(`Blue`);
        expect(firstRow.dob).toEqual(`08/25/1958`);
    } );

    it(`should be able to get pipe separated file compnents`, () => {
        let file = new File('./spec/support/sample-pipe.txt');
        file.init();

        let firstRow = file.getComponents()[0];

        expect(firstRow.lastName).toEqual(`Jackson`);
        expect(firstRow.firstName).toEqual(`Michael`);
        expect(firstRow.gender).toEqual(`Male`);
        expect(firstRow.favoriteColor).toEqual(`Blue`);
        expect(firstRow.dob).toEqual(`08/25/1958`);
    } );

    it(`should be able to get space separated file compnents`, () => {
        let file = new File('./spec/support/sample-space.txt');
        file.init();

        let firstRow = file.getComponents()[0];

        expect(firstRow.lastName).toEqual(`Jackson`);
        expect(firstRow.firstName).toEqual(`Michael`);
        expect(firstRow.gender).toEqual(`Male`);
        expect(firstRow.favoriteColor).toEqual(`Blue`);
        expect(firstRow.dob).toEqual(`08/25/1958`);
    } );

    it('should sort by gender properly (females ascending, then last and ascending)' , () => {
        let file = new File('./spec/support/sorting-file.txt');
        file.init();

        let components = file.sortedByGenderThenLastName();

        expect(components[0].lastName).toEqual('Kunis');
        expect(components[1].lastName).toEqual('Jackson');
        expect(components[2].lastName).toEqual('Kutcher');
    });

    it('should sort by date of ascending' , () => {
        let file = new File('./spec/support/sorting-file.txt');
        file.init();

        let components = file.sortedByDOB();

        expect(components[0].lastName).toEqual('Kutcher');
        expect(components[1].lastName).toEqual('Kunis');
        expect(components[2].lastName).toEqual('Jackson');
    });

    it('should sort by last name descending' , () => {
        let file = new File('./spec/support/sorting-file.txt');
        file.init();

        let components = file.sortedByLastName();

        expect(components[0].lastName).toEqual('Kutcher');
        expect(components[1].lastName).toEqual('Kunis');
        expect(components[2].lastName).toEqual('Jackson');
    });

    it('should add' , () => {
        let file = new File('./spec/support/sample.add.txt');
        file.init();

/*
        let componentsParts = {
            lastName: 'Smith',
            firstName: 'Jeffrey',
            gender: 'Male',
            favoriteColor: 'Brown',
            dob: '01/01/1996'
        }
        */

    file.add( "Smith, Jeffrey, Male, Brown, 01/01/1996"   );

let components = file.getComponents();

        expect(components[1].lastName).toEqual('Smith');
        expect(components[1].firstName).toEqual('Jeffrey');
        expect(components[1].gender).toEqual('Male');
        expect(components[1].favoriteColor).toEqual('Brown');
        expect(components[1].dob).toEqual('01/01/1996');
    });


});
