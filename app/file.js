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

        console.log(data);
    }

}

module.exports = File;
