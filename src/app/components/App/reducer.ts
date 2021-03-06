import { fromJS } from 'immutable';

import {
    LOAD_REPOS,
    LOAD_REPOS_SUCCESS,
    LOAD_REPOS_ERROR,
} from './constants';

const initialState = fromJS({
    currentUser: false,
    error: false,
    loading: false,
    userData: {
        repositories: false,
    },
});

export default function appReducer(state = initialState, action: any) {
    switch (action.type) {
        case LOAD_REPOS:
            return state
                .set('loading', true)
                .set('error', false)
                .setIn(['userData', 'repositories'], false);
        case LOAD_REPOS_SUCCESS:
            return state
                .setIn(['userData', 'repositories'], action.repos)
                .set('loading', false)
                .set('currentUser', action.username);
        case LOAD_REPOS_ERROR:
            return state
                .set("error", action.error)
                .set('loading', false);
        default:
            return state;
    }
}
