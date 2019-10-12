import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Header from 'components/Header';
import Search   from 'containers/Search';

import Tree   from 'containers/Tree/';
import { Switch, Route } from 'react-router-dom';

import config from '../../config';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle= {config.projectTitle}
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Header />
      <Switch>
        <Route path="/update" component={Tree} />
        <Route path="/search" component={Search} />
      </Switch>
      <GlobalStyle />
    </AppWrapper>
  );
}
