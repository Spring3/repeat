import React from 'react';
import styled from '@emotion/styled';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { DataContextProvider }  from '../contexts/DataContext';
import { Helmet } from 'react-helmet';
import 'normalize.css';
import { IndexView } from '../views/index';
import { MainView } from '../views/main';
import { Footer } from '../components/Footer';

const FullpageWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export default () => {
  return (
    <DataContextProvider>
      <Helmet>
        <meta charSet="utf-8"></meta>
        <title>Repeat your words</title>
        <style>
          {
            `* {
              font-family: Arial, Helvetica, sans-serif;
            }
          `}
        </style>
      </Helmet>

      <FullpageWrapper>
        <Router>
          <Switch>
            <Route exact path="/" component={IndexView} />
            <Route path="/main" component={MainView} />
          </Switch>
        </Router>
        <Footer />
      </FullpageWrapper>
    </DataContextProvider>
  );
};
