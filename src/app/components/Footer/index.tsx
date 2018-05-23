/**
 * Footer Component
 */
import * as React from 'react';
import { default as styled } from 'styled-components';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

const FooterWrapper = styled.footer`
    display: flex;
    justify-content: space-between;
    padding: 3em 0;
    border-top: 1px solid #666;
`;

type FooterProps = {}

function Footer(props: FooterProps) {
    return (
        <FooterWrapper />
    )
};

export default Footer;