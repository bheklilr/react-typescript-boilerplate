/**
 * HomePage Component
 */

import * as React from 'react';
import { default as styled } from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

type HomePageProps = {};
type HomePageState = {};


class HomePage extends React.PureComponent<HomePageProps, HomePageState> {
  public render() {
    return (
      <div>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

export default HomePage;
