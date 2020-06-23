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
    getCurrentEntry,
    repeat,
    getEntries,
    submitAnswer,
    reset,
  } = useExercise()

  useEffect(() => {
    reset(data)
  }, [])

  const entry = getCurrentEntry()

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
        <h3>{entry.meaning}</h3>
        <input type="text" placeholder="Answer" required />
        <small>Press Enter to submit</small>
      </div>
    </CenteredWrapper>
  )
}

export { MatchingExercise }
