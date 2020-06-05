import React from 'react';
import PropTypes from 'prop-types';
import { navigate, useMatch } from '@reach/router';
import styled from '@emotion/styled';

const StyledNavbar = styled.nav`
  background: white;
  padding: .7rem .5rem;
`;

const Menu = styled.ul`
  background: white;
  list-style-type: none;
  margin: 0;
  padding: .7rem .5rem;
  display: flex;
`;

const MenuItem = styled.li`
  padding: 1rem 2rem;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.1rem;
  color: ${props => props.isActive ? 'black' : '#AAAAAA'};
  transition: color ease .4s;

  &:hover {
    color: black;
  }
`;

const Navbar = ({ wordsCount }) => {
  return (
    <StyledNavbar>
      <Menu>
        <MenuItem
          isActive={Boolean(useMatch('/main/exercises'))}
          onClick={() => navigate('/main/exercises')}
        >
          Exercises
        </MenuItem>
        <MenuItem
          isActive={Boolean(useMatch('/main/dictionary'))}
          onClick={() => navigate('/main/dictionary')}
        >
          Words ({wordsCount})
        </MenuItem>
      </Menu>
    </StyledNavbar>
  )
}

Navbar.propTypes = {
  wordsCount: PropTypes.number
}

export {
  Navbar
};
