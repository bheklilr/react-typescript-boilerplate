const path = require('path');

module.exports = function(env) {
    var config = require(path.resolve(process.cwd(), `internals/webpack/webpack.${env}.babel`));
    process.stdout.write(JSON.stringify(
        config,
        null,
        2
    ))
};