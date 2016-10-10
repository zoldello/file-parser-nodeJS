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

console.log(components[1].dobDateType);

    }

}

module.exports = File;
