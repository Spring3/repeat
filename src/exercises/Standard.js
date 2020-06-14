import React, { useState, useCallback } from "react"
import styled from "@emotion/styled"
import { useData } from "../contexts/DataContext"
import { CenteredWrapper } from '../components/CenteredWrapper';
import { Input } from '../components/Input';
import { Progressbar } from '../components/Progressbar';
import Confetti from 'react-confetti';
import tweenFunctions from 'tween-functions';
import { useWindowSize } from '../hooks/useWindowSize';
import { css } from "@emotion/core";
import { shuffle } from '../utils/shuffleArray';
import { ExerciseResults } from '../components/ExerciseResults';

const TestWrapper = styled.div`
  padding: 2rem 4rem;
  border-radius: 10px;
  box-shadow: 0px 0px 20px #dedede;
  border: 1px solid #dedede;
  ${props => props.showResults
    ? css`
      min-height: 500px;
      min-width: 500px;
    `
    : css`
      min-height: 300px;
      min-width: 300px;
    `
  }
`;

const Task = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-evenly;

  input {
    margin-top: 1rem;
    font-weight: bold;
  }
`;

const TaskProgress = styled.div`
  text-align: center;
  color: #BBBBBB;

  .index {
    z-index: 1;
    font-size: .8rem;
    background: rgba(255, 255, 255, .5);
  }
`;

const TaskInformation = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  h4 {
    color: #BBBBBB;
  }

  .meaning {
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

const StandardExercise = () => {
  const { data } = useData();
  const [entries, setEntries] = useState(shuffle(data));
  const windowSize = useWindowSize();
  const [confettiTime, setConfettiTime] = useState(false)
  // TODO: move to context
  const [progress, setProgress] = useState({
    index: 0,
    correct: [],
    mistakes: [],
    mainMistake: ''
  })

  const entry = entries[progress.index]
  const ENTER = 13

  const onKeyUp = e => {
    if (e.keyCode === ENTER) {
      const nextIndex = progress.index + 1;
      if (nextIndex === entries.length) {
        setConfettiTime(true);
      }
      const { value } = e.target
      const entry = entries[progress.index]

      if (value.trim().toLowerCase() === entry.word) {
        setProgress({
          ...progress,
          index: nextIndex,
          correct: [...progress.correct, { index: progress.index, ...entry }],
          mistakes: progress.mistakes,
        })
      } else {
        setProgress({
          ...progress,
          index: nextIndex,
          correct: progress.correct,
          mistakes: [...progress.mistakes, { index: progress.index, ...entry }],
        })
      }
      e.target.value = ""
    }
  }

  const progressPercent = Number(progress.index / entries.length * 100).toFixed(2);

  const onComplete = (confetti) => {
    setConfettiTime(false);
    confetti.reset();
  };

  const onRepeat = useCallback((onlyFailed) => {
    if (onlyFailed) {
      setEntries(progress.mistakes)
    }
    setProgress({
      index: 0,
      correct: [],
      mistakes: [],
      mainMistake: "",
    })
  }, [entries]);

  return (
    <CenteredWrapper>
      <TestWrapper showResults={progress.index === entries.length}>
        {
          progress.index === entries.length
          ? (
            <ExerciseResults
              onRepeat={onRepeat}
              progress={progress}
              entries={entries}
            />
          )
          : (
            <>
              <TaskProgress>
                <div className="index">{progress.index + 1} / {entries.length}</div>
                <Progressbar thickness={2} percent={progressPercent} />
              </TaskProgress>
              <Task>
                <TaskInformation>
                  <h4>Meaning:</h4>
                  <div className="meaning">{entry.meaning}</div>
                </TaskInformation>
                <Input type="text" onKeyUp={onKeyUp} placeholder="Word:" required />
              </Task>
            </>
          )
        }
      </TestWrapper>
      <Confetti
        height={windowSize.height}
        width={windowSize.width}
        recycle={false}
        numberOfPieces={confettiTime ? 200 : 0}
        onConfettiComplete={onComplete}
        confettiSource={{
          x: 0,
          y: windowSize.height / 2,
          w: 0,
          h: windowSize.height
        }}
        friction={.97}
        gravity={.2}
        wind={.1}
        tweenDuration={7000}
        initialVelocityX={15}
        initialVelocityY={30}
        tweenFunction={tweenFunctions.easeOutQuad}
      />
      <Confetti
        height={windowSize.height}
        width={windowSize.width}
        recycle={false}
        numberOfPieces={confettiTime ? 200 : 0}
        onConfettiComplete={onComplete}
        tweenDuration={7000}
        confettiSource={{
          x: windowSize.width,
          y: windowSize.height / 2,
          w: 0,
          h: windowSize.height
        }}
        friction={.97}
        gravity={.2}
        wind={-.1}
        initialVelocityX={-15}
        initialVelocityY={30}
        tweenFunction={tweenFunctions.easeOutQuad}
      />
    </CenteredWrapper>
  )
}

export { StandardExercise }
