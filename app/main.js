let File = require('./file');

module.exports = {
    bootup : function() {
        file = new File('./csv.txt');

        file.getComponents();

    }
};
