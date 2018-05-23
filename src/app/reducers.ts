import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import globalReducer from 'app/components/App/reducer';
import languageProviderReducer from 'app/containers/LanguageProvider/reducer';

const routeInitialState = fromJS({
    location: null,
});

function routeReducer(state = routeInitialState, action: { type: string, payload: any}) {
    switch (action.type) {
        case LOCATION_CHANGE:
            return state.merge({
                location: action.payload,
            });
            default:
        return state;
    }
}

export default function createReducer(injectedReducers?: object) {
    return combineReducers({
        route: routeReducer,
        global: globalReducer,
        language: languageProviderReducer,
        ...injectedReducers,
    });
}
