import React from 'react';
import { Router } from '@reach/router';
import { DataContextProvider }  from '../contexts/DataContext';
import { Helmet } from 'react-helmet';
import 'normalize.css';
import { IndexView } from '../views/index';
import { MainView } from '../views/main';

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
      <Router>
        <IndexView path="/" />
        <MainView path="/main" />
      </Router>
    </DataContextProvider>
  );
};
