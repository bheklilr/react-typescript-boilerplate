const { mkAdd, componentType, componentName, confirm, deny } = require('../utils/prompts');

module.exports = (config) => {
    return {
        description: 'Add a container component',
        prompts: [
            componentType(),
            componentName(config),
            deny('wantHeaders', 'Do you want headers?'),
            confirm(
                'wantActionsAndReducer', 
                'Do you want an actions/constants/selectors/reducer tuple for this container?',
            ),
            confirm(
                'wantSaga',
                'Do you want sagas for asynchronous flows? (e.g. fetching data)',
            ),
            confirm(
                'wantMessages',
                'Do you want i18n messages? (i.e. will this component use text)',
            ),
            confirm(
                'wantLoadable',
                'Do you want to load resources asynchronously?',
            ),
        ],
        actions: (data) => {
            const add = mkAdd(config, 'container');

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