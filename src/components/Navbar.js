import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useRouteMatch } from 'react-router-dom';
import styled from '@emotion/styled';

const StyledNavbar = styled.nav`
  background: white;
  padding: .7rem 4rem;
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
  const history = useHistory();
  const { path } = useRouteMatch();
  return (
    <StyledNavbar>
      <Menu>
        <MenuItem
          isActive={'/main/exercises' === path}
          onClick={() => history.push('/main/exercises')}
        >
          Exercises
        </MenuItem>
        <MenuItem
          isActive={'/main/dictionary' === path}
          onClick={() => history.push('/main/dictionary')}
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
