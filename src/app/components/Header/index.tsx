/**
 * Header Component
 */
import * as React from 'react';
import { default as styled } from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

interface HeaderProps {
}

function Header(props: HeaderProps) {
    return (
        <div>
            <FormattedMessage {...messages.header} />
        </div>
    );
}

export default Header;
