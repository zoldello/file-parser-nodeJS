let File = require('./file');
let api = require('./api');

module.exports = {
    bootup : function() {
        let filePath = process.argv.slice(2);

        if (!filePath || filePath.length === 0) {
            console.error(`The input file was not found.`);
            return;
        }

        let file = new File(filePath[0]);
        file.init();
        //let components = file.getComponents();
        let  componentsSortedByGenderThenLastName = file.sortedByGenderThenLastName();
        let componentsSortedByDOB  = file.sortedByDOB();
        let sortByLastName = file.sortedByLastName();

        api.bootup(file);
    }
};
