import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

const TableOfWords = styled.table`
  td, th {
    padding: .5rem 1rem;
    border: 2px solid #eeeeee;
    background: white;
  }

  ${props => props.height && css`
    display: block;
    overflow-y: scroll;
    
    th {
      position: sticky;
      top: 0;
    }
  `}
`;

const Table = ({ entries, height, width }) => {
  return (
    <TableOfWords width={width} height={height}>
      <thead>
        <tr>
          <th>Word</th>
          <th>Meaning</th>
        </tr>
      </thead>
      <tbody>
        { entries.map((entry, i) => (
          <tr key={i}>
            <td><strong>{entry.word}</strong></td>
            <td>{entry.meaning}</td>
          </tr>
        ))}
      </tbody>
    </TableOfWords>
  )
}

Table.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.shape({
    word: PropTypes.string.isRequired,
    meaning: PropTypes.string.isRequired
  })),
  height: PropTypes.string,
  width: PropTypes.string
}

Table.defaultProps = {
  entries: [],
  width: '100%'
}

export {
  Table
};
