const path = require('path');
const pkg = require(path.resolve(process.cwd(), 'package.json'));

module.exports = function() {
    process.stdout.write(JSON.stringify(
        pkg['jest'] || {},
        null,
        2
    ))
};