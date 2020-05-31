import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const ExerciseLayout = styled.ul`
  background: #eeeeee;
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;

  li {
    padding: 1rem 2rem;
    cursor: pointer;
  }
`;

const TableWrapper = styled.div`
  padding: 1rem;
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

const ENTER = 13;

const Exercise = ({ entries }) => {
  const [progress, setProgress] = useState({
    index: 0,
    correct: [],
    mistakes: []
  });
  const [beginExercise, setBeginExercise] = useState(false)
  const [displayWords, setDisplayWords] = useState(false)

  const entry = entries[progress.index];

  const onKeyUp = (e) => {
    if (e.keyCode === ENTER) {
      const { value } = e.target;
      if (value.trim().toLowerCase() === entry.word) {
        setProgress({
          index: progress.index + 1,
          correct: [...progress.correct, progress.index],
          mistakes: progress.mistakes
        });
      } else {
        setProgress({
          index: progress.index + 1,
          correct: progress.correct,
          mistakes: [...progress.mistakes, progress.index]
        });
      }
      e.target.value = '';
    }
  };

  if (progress.index === entries.length) {
    return (
      <div>
        <h2>Done!</h2>
        <p>Correct: {progress.correct.length}</p>
        <p>Mistakes: {progress.mistakes.length}</p>
        <p>Ratio: {(progress.correct.length / entries.length * 100).toFixed(2)}%</p>
      </div>
    );
  }

  if (beginExercise) {
    return (
      <div>
        <div>
          <h3>{entry.meaning}</h3>
          <input type="text" onKeyUp={onKeyUp} placeholder="Answer" required />
          <small>Press Enter to submit</small>
        </div>
        <div>
          <button
            type="button"
            onClick={() => setBeginExercise(false)}
          >End Exercise</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <ExerciseLayout>
        <li
          onClick={() => {
            setDisplayWords(false);
          }}
        >Exercises</li>
        <li
          onClick={() => {
            setDisplayWords(true);
            setBeginExercise(false);
          }}
        >Words ({entries.length})</li>
      </ExerciseLayout>
      {displayWords
        ? (
          <TableWrapper>
            <Searchbar type="text" placeholder="Search..." onChange={() => {}}></Searchbar>
            <TableOfWords>
              <tr>
                <th>Word</th>
                <th>Meaning</th>
              </tr>            
              { entries.map((entry, i) => (
                <tr key={i}>
                  <td><strong>{entry.word}</strong></td>
                  <td>{entry.meaning}</td>
                </tr>
              ))}
            </TableOfWords>
          </TableWrapper>
        )
        : (
          <div>
            <button
              type="button"
              onClick={() => {
                setBeginExercise(true);
                setDisplayWords(false);
              }}
            >
              Begin Exercise
            </button>
          </div>
        )
      }
    </div>
  );
}

Exercise.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.shape({
    word: PropTypes.string.isRequired,
    meaning: PropTypes.string.isRequired
  }))
};

export default Exercise;
