import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { useData } from '../contexts/DataContext';
import { Exercises } from './Exercises';
import { Dictionary } from './Dictionary';

const MainView = () => {
  const { data: entries } = useData();
  const { path } = useRouteMatch();

  console.log('path in main', path)

  if (!entries.length) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Navbar wordsCount={entries.length} />
      <Switch>
        <Route exact path={path}>
          <Redirect to="/main/exercises" />
        </Route>
        <Route exact path={`${path}/dictionary`} component={Dictionary} />          
        <Route path={`${path}/exercises`} component={Exercises} />
      </Switch>
    </>
  );
}

export {
  MainView
}
