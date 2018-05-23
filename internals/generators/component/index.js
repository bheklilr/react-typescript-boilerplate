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
            let componentTemplate;

            switch (data.type) {
                case 'Stateless Function': {
                    componentTemplate = './component/stateless.tsx.hbs';
                    break;
                }
                default: {
                    componentTemplate = './component/class.tsx.hbs';
                }
            }

            const actions = [
                {
                    type: 'add',
                    path: directories(config, 'component', '{{properCase name}}/index.tsx'),
                    templateFile: componentTemplate,
                    abortOnFail: true,
                },
                {
                    type: 'add',
                    path: directories(config, 'component', '{{properCase name}}/tests/index.test.tsx'),
                    templateFile: './component/test.tsx.hbs',
                    abortOnFail: true,
                },
            ];

            // If they want a i18n messages file
            if (data.wantMessages) {
                actions.push({
                type: 'add',
                path: directories(config, 'component', '{{properCase name}}/messages.ts'),
                templateFile: './component/messages.ts.hbs',
                abortOnFail: true,
                });
            }
        
            return actions;
        }
    }
};
