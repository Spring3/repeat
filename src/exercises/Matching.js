import React, { useEffect } from "react"
import styled from "@emotion/styled"
import { useData } from "../contexts/DataContext"
import { CenteredWrapper } from "../components/CenteredWrapper"
import { useExercise } from "../contexts/ExerciseContext"
import { ExerciseResults } from "../components/ExerciseResults"

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

  return (
    <CenteredWrapper>
      <div>
        <ul>
          {batch.map(entry => (
            <li key={entry.word}>{entry.word}</li>
          ))}
        </ul>
      </div>
    </CenteredWrapper>
  )
}

export { MatchingExercise }
