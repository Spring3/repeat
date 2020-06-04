import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import ImageStandard from '../images/standard.jpg';
import ImageMeaning from '../images/meaning.jpg';
import { Navbar, Tabs, WordsTab } from './Navbar';

const Wrapper = styled.div`
  padding: 2rem;
`;

const GridWrapper = styled(Wrapper)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 1rem;
`;

const ExerciseCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 300px;
  box-shadow: 0px 0px 5px 2px #eee;
  cursor: pointer;
  position: relative;
`;

const CardImage = styled.div`
  background: url("${props => props.image}") center center;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-size: cover;
`;

const CardInformation = styled.div`
  z-index: 2;
  background: rgba(255, 255, 255, .6);
  padding: 1rem;
`;

const ENTER = 13;

const Exercise = ({ entries }) => {
  const [activeTab, setActiveTab] = useState(Tabs.Exercises);
  const [progress, setProgress] = useState({
    index: 0,
    correct: [],
    mistakes: []
  });
  const [beginExercise, setBeginExercise] = useState(false)

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
      <Navbar
        onNavigate={tab => setActiveTab(tab)}
        wordsCount={entries.length}
      />
      {activeTab === Tabs.Words
        ? (<WordsTab entries={entries} />)
        : (
          <GridWrapper>
            <ExerciseCard
              onClick={() => {
                setBeginExercise(true);
              }}
            >
              <CardImage image={ImageStandard} loading="lazy" alt="Dictionary" />
              <CardInformation>
                <h2>Standard test</h2>
                <p>You are given the meaning, and you need to type the word</p>
              </CardInformation>
            </ExerciseCard>
            <ExerciseCard
              onClick={() => {
                setBeginExercise(true);
              }}
            >
              <CardImage image={ImageMeaning} loading="lazy" alt="Matching the words" />
              <CardInformation>
                <h2>Match the meaning</h2>
                <p>You are given the word, and you need to choose the meaning</p>
              </CardInformation>
            </ExerciseCard>
          </GridWrapper>
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
