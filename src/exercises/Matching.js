import React, { useEffect } from "react"
import styled from "@emotion/styled"
import { css } from "@emotion/core"
import { useData } from "../contexts/DataContext"
import { CenteredWrapper } from "../components/CenteredWrapper"
import { useExercise } from "../contexts/ExerciseContext"
import { ExerciseResults } from "../components/ExerciseResults"
import { shuffle } from "../utils/shuffleArray"
import { formatMeaning } from "../utils/formatMeaning"
import { Button } from "../components/Button"

const ExerciseWrapper = styled.div`
  padding: 2rem 4rem;
  border-radius: 10px;
  box-shadow: 0px 0px 20px #dedede;
  border: 1px solid #dedede;
  display: flex;
  flex-direction: column;

  ${props =>
    props.showResults
      ? css`
          min-width: 500px;
        `
      : css`
          min-height: 350px;
          min-width: 300px;
        `}
`

const TaskWrapper = styled.div`
  display: flex;
  flex-grow: 1;
`

const TaskDefinition = styled.ul`
  list-style-type: none;
  display: grid;
  grid-template-columns: auto auto;
  row-gap: 1rem;
  column-gap: 3rem;
  padding: 0;
  flex-direction: column;
  justify-content: space-between;

  & > li {
    background: white;
    border-radius: 3px;
    display: flex;
    padding: 0.5rem;
    align-items: center;

    input {
      margin-right: 1rem;
    }

    ul {
      list-style-type: none;
      padding: 0;
    }

    ul li {
      margin-bottom: 0.5rem;
    }
  }

  & > li:hover {
    transition: background ease 0.5s;
    background: lightgrey;
    cursor: pointer;
  }
`

const MatchingExercise = () => {
  const { data } = useData()
  const {
    progress,
    next,
    isDone,
    getCurrentBatch,
    repeat,
    getEntries,
    submitAnswer,
    reset,
  } = useExercise()

  useEffect(() => {
    reset(data, { batchSize: 4 })
  }, [])

  const batch = getCurrentBatch()

  if (isDone) {
    return (
      <ExerciseResults
        progress={progress}
        entries={getEntries()}
        onRepeat={repeat}
      />
    )
  }

  const shuffledWords = shuffle(batch.map(entry => entry.word))
  const shuffeldMeanings = shuffle(batch.map(entry => entry.meaning))
  const entries = shuffledWords.reduce(
    (acc, curr, i) => [...acc, curr, shuffeldMeanings[i]],
    []
  )

  return (
    <CenteredWrapper>
      <ExerciseWrapper>
        <h2>Match the word with the correct meaning</h2>
        <TaskWrapper>
          <TaskDefinition>
            {entries.map((wordOrMeaning, i) =>
              i % 2 === 0 ? (
                <li key={wordOrMeaning}>
                  <strong>{wordOrMeaning}</strong>
                </li>
              ) : (
                <li key={wordOrMeaning}>
                  <ul>
                    {formatMeaning(wordOrMeaning).map((entry, i) =>
                      typeof entry === "string" ? (
                        <li key={i}>{entry}</li>
                      ) : (
                        <li key={i}>
                          <i>{Object.keys(entry)[0]}:</i>
                          <span>{Object.values(entry)[0]}</span>
                        </li>
                      )
                    )}
                  </ul>
                </li>
              )
            )}
          </TaskDefinition>
        </TaskWrapper>
        <Button>Next</Button>
      </ExerciseWrapper>
    </CenteredWrapper>
  )
}

export { MatchingExercise }
