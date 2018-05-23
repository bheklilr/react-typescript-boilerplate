const path = require('path');
const tslint = require(path.resolve(process.cwd(), 'tslint.json'));

module.exports = function() {
    process.stdout.write(JSON.stringify(
        tslint || {},
        null,
        2
    ))
};