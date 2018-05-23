const fs = require('fs');
const path = require('path');

module.exports = (config, comp) => {
    const components = [
        ...fs.readdirSync(path.join(process.cwd(), config.componentsDirectory)),
        ...fs.readdirSync(path.join(process.cwd(), config.containersDirectory))
    ];
    return components.indexOf(comp) > 0;
};