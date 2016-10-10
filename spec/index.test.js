var index = require('./../index');
var main = require('./../app/main');
var sinon = require('sinon');

describe('index', function() {
    //let mainObjectSpy = sinon.spy(main, 'bootup');

    beforeEach(function () {
        // consoleErrorMock = sinon.mock(console).expects('error');
    });

    afterEach(function () {
    //    mainObjectSpy.restore();
        //eventEmitStub.emit.restore();
    });


    it('should print applicant\'s credentials', () => {
        let expected = `Philip Adenekan | File Parser \n`,
            actual = index.startupMesssage();

            expect(actual.trim()).toEqual(expected.trim());
    } );
});


/*
var main = require('./app/main');

var startupMesssage = () => {
    return `Philip Adenekan | File Parser\n`;
}

console.log(startupMesssage());
main.bootup();

// mainly for unit testing
module.exports =  {
    'startupMesssage': startupMesssage
};

*/
