const componentExists = require('./componentExists');
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

export function componentType() {
    return {
        type: 'list',
        name: 'type',
        message: 'Select the base component type:',
        default: 'Stateless Function',
        choices: () => ['Stateless Function', 'React.PureComponent', 'React.Component'],
    }
}

export function componentName(config) {
    return {
        type: 'input',
        name: 'name',
        message: 'What should it be called?',
        validate: (value) => {
            if ((/.+/).test(value)) {
                return componentExists(config, value)
                    ? 'A component or container with this name already exists'
                    : true;
            }
            return 'The name is required';
        }
    }
}
