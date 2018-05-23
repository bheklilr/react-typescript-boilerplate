import { fromJS } from 'immutable';

import {
    CHANGE_LOCALE,
} from './constants';
import {
    DEFAULT_LOCALE,
} from '../../components/App/constants';

const initialState = fromJS({
    locale: DEFAULT_LOCALE,
});

export default function languageProviderReducer(state = initialState, action: any) {
    switch (action.type) {
        case CHANGE_LOCALE:
            return state.set("locale", action.locale);
        default:
            return state;
    }
}
