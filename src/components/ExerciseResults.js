import React, { useState } from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"
import CommentCheckOutlineIcon from "mdi-react/CommentCheckOutlineIcon"
import CommentRemoveOutlineIcon from "mdi-react/CommentRemoveOutlineIcon"
import StickerCheckOutlineIcon from "mdi-react/StickerCheckOutlineIcon"
import { Table } from "./Table"
import { Button } from "./Button"
import { useHistory } from "react-router-dom"
import CloseIcon from "mdi-react/CloseIcon"

const Results = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

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
`

const ExerciseResults = ({ onRepeat, onReset, progress }) => {
  const history = useHistory()
  const [step, setStep] = useState(1)

  const renderFormStep = () => {
    switch (step) {
      case 2:
        const hasAnythingToRepeat = Boolean(progress.mistakes.length)
        return (
          <>
            <h1>
              {hasAnythingToRepeat
                ? "Words to repeat"
                : "You got all words correctly!"}
            </h1>
            {hasAnythingToRepeat ? (
              <Table height="300px" entries={progress.mistakes} />
            ) : (
              <FlexMiddleRow>
                <StickerCheckOutlineIcon color="darkseagreen" size={120} />
              </FlexMiddleRow>
            )}
            <ButtonContainer>
              {hasAnythingToRepeat ? (
                <Button
                  onClick={() => {
                    setStep(1)
                    onRepeat(true)
                  }}
                >
                  Repeat only failed
                </Button>
              ) : null}
              <Button
                onClick={() => {
                  setStep(1)
                  onReset()
                }}
              >
                Repeat the test
              </Button>
              <Button onClick={() => history.replace("/main/exercises")}>
                Close
              </Button>
            </ButtonContainer>
          </>
        )
      default:
        const percentageCorrect = (
          (progress.correct.length /
            (progress.correct.length + progress.mistakes.length)) *
          100
        ).toFixed(2)
        const percentageMistakes = 100 - percentageCorrect
        let header
        if (percentageCorrect === 100) {
          header = "Excellent!"
        } else if (percentageCorrect > 80) {
          header = "Well done!"
        } else if (percentageCorrect > 50) {
          header = "Good job!"
        } else if (percentageCorrect > 0) {
          header = "A decent try"
        } else {
          header = "You'll do better next time"
        }
        return (
          <>
            <h1>{header}</h1>
            <ResultsStatistics>
              <li>
                <CommentCheckOutlineIcon color="lightgreen" size={28} /> Correct
                answers: &nbsp;
                <strong>
                  {progress.correct.length} ({percentageCorrect})%
                </strong>
              </li>
              <li>
                <CommentRemoveOutlineIcon color="red" size={28} /> Wrong
                answers: &nbsp;
                <strong>
                  {progress.mistakes.length} ({percentageMistakes})%
                </strong>
              </li>
            </ResultsStatistics>
            <ButtonContainer>
              <Button onClick={() => setStep(step + 1)}>Next</Button>
            </ButtonContainer>
          </>
        )
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
  onReset: PropTypes.func.isRequired,
  progress: PropTypes.shape({
    index: PropTypes.number.isRequired,
    correct: PropTypes.arrayOf(
      PropTypes.shape({
        index: PropTypes.number,
        word: PropTypes.string.isRequired,
        meaning: PropTypes.string.isRequired,
      })
    ).isRequired,
    mistakes: PropTypes.arrayOf(
      PropTypes.shape({
        index: PropTypes.number,
        word: PropTypes.string.isRequired,
        meaning: PropTypes.string.isRequired,
      })
    ).isRequired,
    mainMistake: PropTypes.string,
  }).isRequired,
}

export { ExerciseResults }
