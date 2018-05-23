const { mkAdd, componentType, componentName, confirm } = require('../utils/prompts');

module.exports = (config) => {
    return {
        description: 'Add an unconnected component',
        prompts: [
            componentType(),
            componentName(),
            confirm('wantMessages', 'Do you want i18n messages (i.e. will this component use text)?'),
        ],
        actions: (data) => {
            const add = mkAdd(config, 'component');

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
