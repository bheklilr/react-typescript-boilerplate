const _ = require('lodash');
const path = require('path');

function importConfig(filename) {
    return require(path.resolve(process.cwd(), filename));
}

function resolveExtends(conf) {
    const base = conf.extends;
    if (base === null || base === undefined) {
        return conf;
    } else {
        delete conf.extends;
        var baseConfig = resolveExtends(importConfig(base));
        return _.merge(baseConfig, conf);
    }
}

module.exports = function(env) {
    var tsconfig;
    if (env === 'dev') {
        tsconfig = importConfig('tsconfig.json');
    } else {
        tsconfig = importConfig(`tsconfig.${env}.json`);
    }
    tsconfig = resolveExtends(tsconfig);
    process.stdout.write(JSON.stringify(
        tsconfig || {},
        null,
        2
    ))
};