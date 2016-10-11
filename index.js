var main = require('./app/main');

var startupMesssage = () => {
    return `Philip Adenekan | File Parser\n`;
};

console.log(startupMesssage());
main.bootup();

// mainly for unit testing
module.exports =  {
    'startupMesssage': startupMesssage
};
