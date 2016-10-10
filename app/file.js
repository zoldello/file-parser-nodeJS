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
            let parts = line.split(separator);

            components.push(parts);
        }



    }

}

module.exports = File;
