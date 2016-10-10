fs = require('fs');
_ = require('lodash');

class File {
    constructor(filePath) {
        this.filePath = filePath;
        this.components = [];
    }

    init() {
        this.components = this.parseFileForComponents();
    }

    parseFileForComponents() {
        // Hack: Synchronous read (normally bad) is neccessary because programm should not do anything until file is read
        let data = fs.readFileSync(this.filePath, 'utf8'),
            lineByLine = data.split('\n'),
            separator = this.getSeparator(this.components),
            components = [];

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

            components.push(partsJson);
        }
        return components;
    }

    getSeparator() {
        // - ordering is important. Some last names contain a space as in "Di Eugenio"; so its important that
        // space be the last thing considered.
        // - It is assumed that comma separated fle is the most common use case,
        // so that should be tested first to add a tiny amount of speed
        // - Comma is the default behavior
        if (!this.components || this.components.indexOf(',') !== -1) {
            return ','
        } else if ( this.components.indexOf('|') !== -1) {
            return '|'
        } else {
            return ' '
        }
    }

    // Note: This is a bit counterintuitive. It is sorted by last name and then by gender (females first). It is done this way
    // so that females always appear first in the list, without having to break up the list and recombine
    sortedByGenderThenLastName() {
        if (!this.components || !this.components.sort) {
            console.log('No value to sort. Contact support');
            return;
        }

        let sortedByLastName = _.sortBy(this.components, s => s.lastName.toLowerCase());
        let sortedByGender = _.sortBy(sortedByLastName, s => s.gender.toLowerCase());

        return sortedByGender;
    }

    sortedByDOB() {
        if (!this.components) {
            console.log('No value to sort. Contact support');
            return;
        }

            return _.sortBy(this.components, s => s.dobDateType);
    }

sortedByLastName() {
    if (!this.components) {
        console.log('No value to sort. Contact support');
        return;
    }

        return _.orderBy(this.components, ['lastName'], ['desc']);
    }
}

module.exports = File;
