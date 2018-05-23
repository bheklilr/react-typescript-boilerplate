module.exports = (config, type, path) => {
    if (type === 'component') {
        return `${process.cwd()}/${config.componentsDirectory}/${path}`;
    } else if (type === 'container') {
        return `${process.cwd()}/${config.containersDirectory}/${path}`;
    } else {
        return `${process.cwd()}/${type}/${path}`;
    }
}