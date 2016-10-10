let File = require('./file');

module.exports = {
    bootup : function() {
        file = new File('./csv.txt');

        let components = file.getComponents(),
            componentsSortedByGenderThenLastName = file.componentsSortedByGenderThenLastName(components);

console.log(componentsSortedByGenderThenLastName);


    }
};
