const componentExists = require('../utils/componentExists');
const directories = require('../utils/directories');

module.exports = (config) => {
    return {
        description: 'Add a container component',
        prompts: [
            {
                type: 'list',
                name: 'type',
                message: 'Select the base component type:',
                default: 'Stateless Function',
                choices: () => ['Stateless Function', 'React.PureComponent', 'React.Component'],
            },
            {
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
            },
            {
                type: 'confirm',
                name: 'wantHeaders',
                default: false,
                message: 'Do you want headers?',
            },
            {
                type: 'confirm',
                name: 'wantActionsAndReducer',
                default: true,
                message: 'Do you want an actions/constants/selectors/reducer tuple for this container?',
            },
            {
                type: 'confirm',
                name: 'wantSaga',
                default: true,
                message: 'Do you want sagas for asynchronous flows? (e.g. fetching data)',
            },
            {
                type: 'confirm',
                name: 'wantMessages',
                default: true,
                message: 'Do you want i18n messages? (i.e. will this component use text)',
            },
            {
                type: 'confirm',
                name: 'wantLoadable',
                default: true,
                message: 'Do you want to load resources asynchronously?',
            },
        ],
        actions: (data) => {
            const add = (templateFile, ...paths) => {
                return {
                    type: "add",
                    templateFile: './container/' + templateFile,
                    path: directories(config, 'container', '{{ properCase name }}', ...paths),
                    abortOnFail: true,
                }
            };

            function* actionsIter() {
                const containerTemplate = data.type === 'Stateless Function'
                    ? 'stateless.tsx.hbs'
                    : 'class.tsx.hbs';

                yield add(containerTemplate, 'index.tsx');
                yield add('index.test.tsx.hbs', 'tests', 'index.test.tsx');
                if (data.wantMessages) {
                    yield add('messages.ts.hbs', 'messages.ts');
                }
                if (data.wantActionsAndReducers) {
                    yield add('actions.ts.hbs', 'actions.ts');
                    yield add('actions.test.hbs', 'tests', 'actions.test.ts');

                    yield add('constants.ts.hbs', 'constants.ts');

                    yield add('selectors.ts.hbs', 'selectors.ts');
                    yield add('selectors.test.ts.hbs', 'tests', 'selectors.test.ts');

                    yield add('reducer.ts.hbs', 'reducer.ts');
                    yield add('reducer.test.ts.hbs', 'tests', 'reducer.test.ts');
                }
                if (data.wantSaga) {
                    yield add('saga.ts.hbs', 'saga.ts');
                    yield add('saga.test.ts.hbs', 'tests', 'saga.test.ts');
                }
                if (data.wantLoadable) {
                    yield add('loadable.ts.hbs', 'Loadable.ts');
                }
            }
            return Array.from(actionsIter());
        }
    }
}