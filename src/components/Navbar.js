import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import debounce from 'lodash.debounce';

const ExerciseLayout = styled.ul`
  background: #eeeeee;
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

const Wrapper = styled.div`
  padding: 2rem;
`;

const TableOfWords = styled.table`
  td, th {
    padding: .5rem 1rem;
    border: 2px solid #eeeeee;
  }
`;

const Searchbar = styled.input`
  width: 100%;
  padding: .5rem;
  min-width: 0;
  box-sizing: border-box;
  margin-bottom: 1rem;
`;

const WordsTab = ({ entries }) => {
  const [searchResults, setSearchResults] = useState(entries);

  const onSearch = useCallback(event => {
    debouncedSearch(event.target.value);
  }, [entries]);

  const debouncedSearch = debounce(value => {
    const text = value || '';
    const query = text.trim().toLowerCase();
    const filteredEntries = entries.filter(entry => `${entry.word}${entry.meaning}`.toLowerCase().trim().includes(query));
    setSearchResults(filteredEntries);
  }, 300);

  return (
    <Wrapper>
      <Searchbar type="search" placeholder="Search..." onChange={onSearch} />
      {
        searchResults.length
        ? (
          <TableOfWords width="100%">
            <thead>
              <tr>
                <th>Word</th>
                <th>Meaning</th>
              </tr>
            </thead>
            <tbody>
              { searchResults.map((entry, i) => (
                <tr key={i}>
                  <td><strong>{entry.word}</strong></td>
                  <td>{entry.meaning}</td>
                </tr>
              ))}
            </tbody>
          </TableOfWords>
        )
        : (<p>No results that match your search query</p>)
      }
    </Wrapper>
  )
}

WordsTab.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.shape({
    word: PropTypes.string.isRequired,
    meaning: PropTypes.string.isRequired
  }))
};

export {
  Navbar,
  Tabs,
  WordsTab
};
