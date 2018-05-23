import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider } from 'react-intl';

import { makeSelectLocale } from './selectors';

interface LanguageProviderProps {
    locale: string,
    messages: object,
    children: JSX.Element,
}

class LanguageProvider extends React.PureComponent<LanguageProviderProps> {
    public render() {
        return (
            <IntlProvider
                locale={this.props.locale} 
                key={this.props.locale}
                messages={this.props.messages[this.props.locale]}
                >
                {React.Children.only(this.props.children)}
            </IntlProvider>
        )
    }
}

const mapStateToProps = createSelector(
    makeSelectLocale(),
    (locale) => ({ locale })
)

export default connect(mapStateToProps)(LanguageProvider);