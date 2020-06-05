import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from '@reach/router';
import { Navbar } from '../components/Navbar';
import { useData } from '../contexts/DataContext';

const MainView = ({ children }) => {
  const { data: entries } = useData();

  if (!entries.length) {
    return <Redirect to="/" noThrow={true} />;
  }

  return (
    <div>
      <Navbar wordsCount={entries.length} />
      {children}
    </div>
  );
}

MainView.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element)
}

export {
  MainView
}
