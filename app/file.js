fs = require('fs');
_ = require('lodash');

class File {
    constructor(filePath) {
        this.filePath = filePath;
        this.components = [];
    }

    init() {
        this.components = this._parseFileForComponents();
    }

    getComponents() {
        return this.components;
    }

    _trimEnd(str, char) {
        let  strTrim = str.trim();

        if (!strTrim || strTrim[strTrim.length - 1] !== char) {
            return strTrim;
        }

        return strTrim.slic(0, -1);
    }

    _parseFileForComponents() {
        // Hack: Synchronous read (normally bad) is neccessary because programm should not do anything until file is read
        let data = fs.readFileSync(this.filePath, 'utf8'),
            lineByLine = data.split('\n'),
            separator = this._getSeparator(lineByLine[0]),
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
                lastName: this._trimEnd(parts[0], separator),
                firstName: this._trimEnd(parts[1], separator),
                gender: this._trimEnd(parts[2], separator),
                favoriteColor: this._trimEnd(parts[3], separator),
                dob: this._trimEnd(parts[4], separator),
                dobDateType: new Date(this._trimEnd(partDateSplit[2], separator),
                    this._trimEnd(partDateSplit[1], separator),
                    this._trimEnd(partDateSplit[0], separator))
            };

            components.push(partsJson);
        }
        return components;
    }

    _getSeparator(row) {
        // - ordering is important. Some last names contain a space as in "Di Eugenio"; so its important that
        // space be the last thing considered.
        // - It is assumed that comma separated fle is the most common use case,
        // so that should be tested first to add a tiny amount of speed
        // - Comma is the default behavior
        if (!row || row.indexOf(',') !== -1) {
            return ','
        } else if ( row.indexOf('|') !== -1) {
            return '|'
        } else {
            return ' '
        }
    }

    add(componentParts) {
        let separator = this._getSeparator(componentParts);
        let parts = componentParts.split(separator);

        let partDateSplit = parts[4].split('/');

        let partsJson = {
            lastName: this._trimEnd(parts[0], separator),
            firstName: this._trimEnd(parts[1], separator),
            gender: this._trimEnd(parts[2], separator),
            favoriteColor: this._trimEnd(parts[3], separator),
            dob: this._trimEnd(parts[4], separator),
            dobDateType: new Date(this._trimEnd(partDateSplit[2], separator),
                this._trimEnd(partDateSplit[1], separator),
                this._trimEnd(partDateSplit[0], separator))
        };

        this.components.push(partsJson);
    }

    // Note: This is a bit counterintuitive. It is sorted by last name and then by gender (females first). It is done this way
    // so that females always appear first in the list, without having to break up the list and recombine
    sortedByGenderThenLastName() {
        if (!this.components || !this.components.sort) {
            console.error('No value to sort. Contact support');
            return;
        }

        let sortedByLastName = _.sortBy(this.components, s => s.lastName.toLowerCase());
        let sortedByGender = _.sortBy(sortedByLastName, s => s.gender.toLowerCase());

        return sortedByGender;
    }

    sortedByDOB() {
        if (!this.components) {
            console.error('No value to sort. Contact support');
            return;
        }

            return _.sortBy(this.components, s => s.dobDateType);
    }

sortedByLastName() {
    if (!this.components) {
        console.error('No value to sort. Contact support');
        return;
    }

        return _.orderBy(this.components, ['lastName'], ['desc']);
    }
}

module.exports = File;
