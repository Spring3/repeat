import React, { useState } from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"
import CommentCheckOutlineIcon from "mdi-react/CommentCheckOutlineIcon"
import CommentRemoveOutlineIcon from "mdi-react/CommentRemoveOutlineIcon"
import AlertCircleOutlineIcon from "mdi-react/AlertCircleOutlineIcon"
import StickerCheckOutlineIcon from 'mdi-react/StickerCheckOutlineIcon';
import CloseIcon from "mdi-react/CloseIcon"
import { Table } from "./Table"
import { Button } from "./Button"
import { useHistory } from "react-router-dom"

const Results = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  flex-grow: 1;
  width: 100%;

  & > svg:first-of-type {
    align-self: flex-end;
    position: absolute;
    cursor: pointer;
    &:hover {
      fill: black;
    }
  }
`

const ResultsStatistics = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;

  li {
    display: flex;
    padding: 0.5rem 1rem;
    font-size: 1.1rem;
    align-items: center;
    svg {
      margin-right: 10px;
    }
  }
`

const ButtonContainer = styled.div`
  align-self: flex-end;
  margin-top: 2rem;
  & > button {
    margin-left: 1rem;
  }
`

const FlexMiddleRow = styled.div`
  display: flex;
  justify-content: center;
`;

const ExerciseResults = ({ onRepeat, progress, entries }) => {
  const history = useHistory()
  const [step, setStep] = useState(1);

  const callRepeat = (onlyWithFailed) => {
    setStep(1);
    onRepeat(onlyWithFailed)
  };

  const renderFormStep = () => {
    switch (step) {
      case 2:
        const hasAnythingToRepeat = Boolean(progress.mistakes.length);
        return (
          <>
            <h1>{hasAnythingToRepeat ? 'Words to repeat' : 'You got all words correctly!'}</h1>
            {hasAnythingToRepeat
              ? <Table height="300px" entries={progress.mistakes} />
              : <FlexMiddleRow><StickerCheckOutlineIcon color="darkseagreen" size={120} /></FlexMiddleRow>
            }
            <ButtonContainer>
              {hasAnythingToRepeat ? <Button onClick={() => callRepeat(true)}>Repeat only failed</Button> : null}
              <Button onClick={() => callRepeat()}>Repeat the test</Button>
              <Button onClick={() => history.replace("/main/exercises")}>Close</Button>
            </ButtonContainer>
          </>
        )
      default:
        return (
          <>
            <h1>Well Done!</h1>
            <ResultsStatistics>
              <li>
                <CommentCheckOutlineIcon color="lightgreen" size={28} /> Correct
                answers: &nbsp;
                <strong>
                  {progress.correct.length} (
                  {((progress.correct.length / entries.length) * 100).toFixed(2)}
                  )%
                </strong>
              </li>
              <li>
                <CommentRemoveOutlineIcon color="red" size={28} /> Wrong answers:
                &nbsp;
                <strong>
                  {progress.mistakes.length} (
                  {((progress.mistakes.length / entries.length) * 100).toFixed(2)}
                  )%
                </strong>
              </li>
              <li>
                <AlertCircleOutlineIcon color="orange" size={28} /> Most complicated
                word: &nbsp;
                <strong>{progress.mainMistake || "-"}</strong>
              </li>
            </ResultsStatistics>
            <ButtonContainer>
              <Button onClick={() => setStep(step + 1)}>Next</Button>
            </ButtonContainer>
          </>
        );
    }
  }

  return (
    <Results>
      <CloseIcon
        size={30}
        color="#999999"
        onClick={() => history.replace("/main/exercises")}
      />
      {renderFormStep()}
      
    </Results>
  )
}

ExerciseResults.propTypes = {
  onRepeat: PropTypes.func.isRequired,
  progress: PropTypes.shape({
    index: PropTypes.number.isRequired,
    correct: PropTypes.arrayOf(
      PropTypes.shape({
        index: PropTypes.number.isRequired,
        word: PropTypes.string.isRequired,
        meaning: PropTypes.string.isRequired,
      })
    ).isRequired,
    mistakes: PropTypes.arrayOf(
      PropTypes.shape({
        index: PropTypes.number.isRequired,
        word: PropTypes.string.isRequired,
        meaning: PropTypes.string.isRequired,
      })
    ).isRequired,
    mainMistake: PropTypes.string,
  }).isRequired,
  entries: PropTypes.arrayOf(PropTypes.shape({
    word: PropTypes.string.isRequired,
    meaning: PropTypes.string.isRequired,
  })).isRequired,
}

export { ExerciseResults }
