import * as React from 'react';
import * as styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';
import HomePage from '../HomePage';

const AppWrapper = styled.default.div`
        max-width: calc(768px + 16px * 2);
        margin: 0 auto;
        display: flex;
        min-height: 100%;
        padding; 0 16px;
        flex-direction: column;
    `;

export default function App() {
    return (
        <AppWrapper>
            <Header />
            <Switch>
                <Route exact={true} path="/" component={HomePage} />
            </Switch>
            <Footer />
        </AppWrapper>
    );
}
