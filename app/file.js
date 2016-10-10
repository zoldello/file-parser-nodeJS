fs = require('fs');

class File {

    constructor(filePath) {
        this.filePath = filePath;
    }
    getComponents()  {
        fs.readFile(this.filePath, 'utf8', this.componentsCallBack)
    }

    componentsCallBack(error, data) {
        if (error) {
            console.log('Error reading file: ${this.filePath}');
            return;
        }

        let lineByLine = data.split('\n'),
        components = [],
        separator = ','

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
    }

    // Note: This is a bit counterintuitive. It is sorted by last name and then by gender (females first). It is done this way
    // so that females always appear first in the list. Doing it the intuitive way as per method name can result in males coming
    // before females
    componentsSortedByGenderThenLastName(components) {
        if (!components.sort) {
            console.log('Soring is not supported. You may be using the wrong node.js version or there may be an issue. Contact support');
            return;
        }

        let sortedByLastName = components.sort(a, b) {
            // case is irrelevant, so equalize
            let nameA = a.lastName.toUpperCase(),
                nameB = b.lstName.toUpperCase();

            if (nameA < nameB) {
                return -1;
            }

            if (nameA > nameB) {
                return 1;
            }

            return 0;
        }
    }

}

module.exports = File;
