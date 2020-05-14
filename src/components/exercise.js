import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ENTER = 13;

const Exercise = ({ entries }) => {
  const [progress, setProgress] = useState({
    index: 0,
    correct: [],
    mistakes: []
  });

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

  return (
    <div>
      <h3>{entry.meaning}</h3>
      <input type="text" onKeyUp={onKeyUp} placeholder="Answer" required />
      <small>Press Enter to submit</small>
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
