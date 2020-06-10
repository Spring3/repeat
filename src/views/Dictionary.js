import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import debounce from 'lodash.debounce';
import { useData } from '../contexts/DataContext';
import { Wrapper } from '../components/Wrapper';
import { Table } from '../components/Table';

const Searchbar = styled.input`
  width: 100%;
  padding: .5rem;
  min-width: 0;
  box-sizing: border-box;
  margin-bottom: 1rem;
`;

const Dictionary = () => {
  const { data: entries } = useData();
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
          <Table entries={searchResults} />
        )
        : (<p>No results that match your search query</p>)
      }
    </Wrapper>
  )
}

export {
  Dictionary
};
