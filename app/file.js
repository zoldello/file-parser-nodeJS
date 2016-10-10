fs = require('fs');

class File {

    constructor(filePath) {
        this.filePath = filePath;
    }
    getComponents()  {
        fs.readFile(this.filePath, 'utf8', componentsCallBack)
    }

    componentsCallBack() {

    }

}

module.exports = File;
