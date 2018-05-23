import { createSelector } from 'reselect';

const selectLanguage = (state: any) => state.get('language');

const makeSelectLocale = () => createSelector(
    selectLanguage,
    (languageState) => languageState.get('locale')
);

export {
    selectLanguage,
    makeSelectLocale,
}