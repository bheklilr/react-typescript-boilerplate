const path = require('path');

module.exports = (config, type, ...pathParts) => {
    if (type === 'component') {
        return path.join(process.cwd(), config.componentsDirectory, ...pathParts);
    } else if (type === 'container') {
        return path.join(process.cwd(), config.containersDirectory, ...pathParts);
    } else {
        return path.join(process.cwd(), type, ...pathParts);
    }
}