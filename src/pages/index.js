import React from 'react';
import { Router } from '@reach/router';
import { DataContextProvider }  from '../contexts/DataContext';
import { Helmet } from 'react-helmet';
import 'normalize.css';
import { IndexView } from '../views/index';
import { MainView } from '../views/main';
import { Exercises } from '../views/Exercises';
import { Dictionary } from '../views/Dictionary';
import { Matching, Standard } from '../exercises';

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
        <IndexView default />
        <MainView path="/main">
          <Exercises path="/exercises">
            <Standard path="/standard" />
            <Matching path="/matching" />
          </Exercises>
          <Dictionary path="/dictionary" />
        </MainView>
      </Router>
    </DataContextProvider>
  );
};
