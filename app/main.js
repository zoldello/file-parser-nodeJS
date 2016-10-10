let File = require('./file');

module.exports = {
    bootup : function() {
        file = new File('./csv.txt');

        let components = file.getComponents();
        let    componentsSortedByGenderThenLastName = file.sortedByGenderThenLastName(components);
        let componentsSortedByDOB  = file.sortedByDOB(components);
        let sortByLastName = file.sortedByLastName(components);

console.log(sortByLastName);



    }
};
