import 'babel-polyfill';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import * as FontFaceObserver from 'fontfaceobserver';
import createHistory from 'history/createBrowserHistory';
import 'sanitize.css/sanitize.css';

import LanguageProvider from 'app/containers/LanguageProvider';
import App from 'app/components/App';
import './index.css';

import configureStore from './configureStore';

import { translationMessages } from './i18n';

const openSansObserver = new FontFaceObserver('Open Sans', {});

openSansObserver.load().then(() => {
    document.body.classList.add('fontLoaded');
}, () => {
    document.body.classList.remove('fontLoaded');
});

// Create redux store with history
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');
if (MOUNT_NODE === null) {
    throw Error('Mount point is null');
}

const render = (messages: object) => {
    ReactDOM.render(
        <Provider store={store}>
            <LanguageProvider messages={messages}>
                <ConnectedRouter history={history}>
                    <App />
                </ConnectedRouter>
            </LanguageProvider>
        </Provider>,
        MOUNT_NODE,
    );
};

if (module['hot']) {
    module['hot'].accept(['./i18n', 'app/containers/App'], () => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render(translationMessages);
    });
}

if (!window['Intl']) {
    (new Promise((resolve) => {
        resolve(import('intl'));
    })).then(() => Promise.all([
        import('intl/locale-data/jsonp/en.js'),
        import('intl/locale-data/jsonp/de.js'),
    ])).then(() => render(translationMessages))
    .catch((err) => {
        throw err;
    });
} else {
    render(translationMessages);
}

if (process.env.NODE_ENV === 'production') {
    OfflinePluginRuntime.install();
}