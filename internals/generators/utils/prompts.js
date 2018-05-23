const directories = require('./directories');

export function mkAdd(config, type) {
    return (templateFile, ...paths) => {
        return {
            type: "add",
            templateFile: `./${type}/${templateFile}`,
            path: directories(config, type, '{{ properCase name }}', ...paths),
            abortOnFail: true,
        }
    };
};

export function confirm(name, message) {
    return {
        type: 'confirm',
        default: true,
        name,
        message,
    };
};

export function deny(name, message) {
    return {
        type: 'confirm',
        default: false,
        name,
        message,
    };
};