import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';

const sagaMiddleware = createSagaMiddleware;

export default function configureStore(initialState = {}, history: any) {
    const middlewares = [
        sagaMiddleware as any,
        routerMiddleware(history),
    ];

    const enhancers = [
        applyMiddleware(...middlewares),
    ];

    const composeEnhancers =
        process.env.NODE_ENV !== 'production' &&
        typeof window === 'object' &&
        // tslint:disable-next-line:no-string-literal
        window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']
            // tslint:disable-next-line:no-string-literal
            ? window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']({
                shouldHotReload: false,
            })
            : compose;

    const store = createStore(
        createReducer(),
        fromJS(initialState),
        composeEnhancers(...enhancers),
    );

    // tslint:disable no-string-literal
    store['runSaga'] = sagaMiddleware['run'];
    store['injectedReducers'] = {};
    store['injectedSagas'] = {};

    if (module['hot']) {
        module['hot'].accept('./reducers', () => {
            store.replaceReducer(createReducer(store['injectedReducers']));
        });
    }
    // tslint:enable

    return store;
}
