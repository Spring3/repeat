import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const ExerciseLayout = styled.ul`
  background: white;
  list-style-type: none;
  margin: 0;
  padding: .5rem;
  display: flex;

  li {
    padding: 1rem 2rem;
    cursor: pointer;
    font-weight: bold;
  }
`;

const Tabs = {
  Exercises: 'exersizes',
  Words: 'words'
};

const Navbar = ({ onNavigate, wordsCount }) => {
  return (
    <ExerciseLayout>
      <li
        onClick={() => onNavigate(Tabs.Exercises)}
      >
        Exercises
      </li>
      <li
        onClick={() => onNavigate(Tabs.Words)}
      >
        Words ({wordsCount})
      </li>
    </ExerciseLayout>
  )
}

Navbar.propTypes = {
  onNavigate: PropTypes.func.isRequired,
  wordsCount: PropTypes.number
}

Navbar.defaultProps = {
  wordsCount: 0
}

export {
  Navbar,
  Tabs
};
