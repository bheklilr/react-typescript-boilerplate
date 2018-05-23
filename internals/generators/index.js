/**
 * Exports the generators for plop
 */

const path = require('path');

const DEFAULT_PLOP_CONFIG = {
    srcDirectory: 'src/app',
    containersDirectory: '[srcDirectory]/containers',
    componentsDirectory: '[srcDirectory]/components',
}

function getConfig() {
    var config = Object.assign(
        DEFAULT_PLOP_CONFIG,
        require(path.resolve(process.cwd(), 'package.json')).plop || {}
    );

    config.containersDirectory = config.containersDirectory.replace('[srcDirectory]', config.srcDirectory);
    config.componentsDirectory = config.componentsDirectory.replace('[srcDirectory]', config.srcDirectory);

    return config;
}

const CONFIG = getConfig();

const generators = {
    component: require('./component/index.js'),
    // container: require('./container/index.js'),
    // route: require('./route/index.js'),
    // language: require('./language/index.js'),
}

const helpers = {
    // directory: (comp) => {
    //     try {
    //         fs.accessSync(path.join(__dirname, `../../${CONFIG.containersDirectory}/${comp}`), fs.F_OK);
    //         return `containers/${comp}`;
    //     } catch (e) {
    //         return `components/${comp}`;
    //     }
    // },
    curly: (object, open) => {
        return (open ? '{' : '}')
    },
}

module.exports = (plop) => {
    Object.entries(generators).forEach(
        ([name, generator]) => {
            plop.setGenerator(name, generator(CONFIG))
        }
    );
    Object.entries(helpers).forEach(
        ([name, helper]) => plop.addHelper(name, helper)
    )
};