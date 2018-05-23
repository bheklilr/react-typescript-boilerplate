const componentExists = require('../utils/componentExists');
const directories = require('../utils/directories');

module.exports = (config) => {
    return {
        description: 'Add an unconnected component',
        prompts: [
            {
                type: 'list',
                name: 'type',
                message: 'Select the type of component',
                default: 'Stateless Function',
                choices: () => ['Stateless Function', 'React.PureComponent', 'React.Component'],
            },
            {
                type: 'input',
                name: 'name',
                message: 'What should it be called?',
                default: 'Button',
                validate: (value) => {
                    if ((/.+/).test(value)) {
                        return componentExists(config, value)
                            ? 'A component or container with this name already exists'
                            : true;
                    }
                    return 'The name is required';
                },
            },
            {
                type: 'confirm',
                name: 'wantMessages',
                default: true,
                message: 'Do you want i18n messages (i.e. will this component use text)?',
            }
        ],
        actions: (data) => {
            const add = (templateFile, ...paths) => {
                return {
                    type: "add",
                    templateFile: './component/' + templateFile,
                    path: directories(config, 'component', '{{ properCase name }}', ...paths),
                    abortOnFail: true,
                }
            };

            function* actionsIter() {
                const componentTemplate = data.type === 'Stateless Function'
                    ? 'stateless.tsx.hbs'
                    : 'class.tsx.hbs';
                yield add(componentTemplate, 'index.tsx');
                yield add('index.test.tsx.hbs', 'tests', 'index.test.tsx');
                
                // If they want a i18n messages file
                if (data.wantMessages) {
                    yield add('messages.ts.hbs', 'messages.ts');
                }
            }

            return Array.from(actionsIter());
        }
    }
};
