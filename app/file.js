fs = require('fs');
_ = require('lodash');

class File {

    constructor(filePath) {
        this.filePath = filePath;
        this.components = [];
    }

    getComponents() {
        if (!!this.components && this.components.length > 0) {
            return this.components;
        }

        return this.parseFileForComponents();
    }

    parseFileForComponents() {
        // Hack: Synchronous read (normally bad) is neccessary because programm should not do anything until file is read
        let data = fs.readFileSync(this.filePath, 'utf8'),
        lineByLine = data.split('\n'),
        separator = ',';

        this.components = [];

        for(let line of lineByLine) {
            if (!line) {
                continue;
            }

            let parts = line.split(separator),
            partDateSplit = parts[4].split('/');

            // dob-dateType was made so that date conversion need not be done repeated
            // when date value is needed for things like sorting
            let partsJson = {
                lastName: parts[0],
                firstName: parts[1],
                gender: parts[2],
                favoriteColor: parts[3],
                dob: parts[4],
                dobDateType: new Date(partDateSplit[2], partDateSplit[1], partDateSplit[0])
            };

            this.components.push(partsJson);
        }
        return this.components;
    }

    // Note: This is a bit counterintuitive. It is sorted by last name and then by gender (females first). It is done this way
    // so that females always appear first in the list, without having to break up the list and recombine
    sortedByGenderThenLastName(components) {
        if (!components || !components.sort) {
            console.log('No value to sort. Contact support');
            return;
        }

        let sortedByLastName = _.sortBy(components, s => s.lastName.toLowerCase());
        let sortedByGender = _.sortBy(sortedByLastName, s => s.gender.toLowerCase());

        return sortedByGender;
    }

    sortedByDOB(components) {
        if (!components) {
            console.log('No value to sort. Contact support');
            return;
        }

            return _.sortBy(components, s => s.dobDateType);
    }


sortedByLastName(components) {
    if (!components) {
        console.log('No value to sort. Contact support');
        return;
    }

        return _.orderBy(components, ['lastName'], ['desc']);
    }
}
module.exports = File;
