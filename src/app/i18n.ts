import { addLocaleData } from 'react-intl';
import * as enLocaleData from 'react-intl/locale-data/en';
import * as deLocaleData from 'react-intl/locale-data/de';

import { DEFAULT_LOCALE } from './components/App/constants';

import enTranslationMessages from 'app/translations/en';
import deTranslationMessages from 'app/translations/de';

addLocaleData(enLocaleData);
addLocaleData(deLocaleData);

export const appLocales = [
    'en',
    'de',
];

export const formatTranslationMessages = (locale: string, messages: object) => {
    const defaultFormattedMessages = locale !== DEFAULT_LOCALE
        ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
        : {};
    return Object.keys(messages).reduce((formattedMessages, key) => {
        const formattedMessage: string = !messages[key] && locale !== DEFAULT_LOCALE
            ? defaultFormattedMessages[key]
            : messages[key];
        return {...formattedMessages, ...{ [key]: formattedMessage }};
    }, {});
};

export const translationMessages = {
    en: formatTranslationMessages('en', enTranslationMessages),
    de: formatTranslationMessages('de', deTranslationMessages),
};
