import React, { createContext, useState, useContext } from "react"
import { shuffle } from "../utils/shuffleArray"

const ExerciseContext = createContext()

const useExerciseContext = () => {
  const [entries, setEntries] = useState([])
  const [progress, setProgress] = useState({
    index: 0,
    correct: [],
    mistakes: [],
  })

  const isDone = entries.length && progress.index === entries.length

  const reset = entries => {
    if (entries) {
      setEntries(shuffle(entries))
    }
    setProgress({
      index: 0,
      correct: [],
      mistakes: [],
    })
  }

  const repeat = mistakesOnly => {
    if (mistakesOnly) {
      reset(progress.mistakes)
    } else {
      reset()
    }
  }

  const getCurrentEntry = () => {
    return entries[progress.index]
  }

  const getEntries = () => {
    return entries
  }

  const submitAnswer = answer => {
    const { isCorrect } = answer
    if (isDone) {
      return
    }
    const entry = getCurrentEntry()

    setProgress({
      ...progress,
      index: progress.index + 1,
      correct: isCorrect ? [...progress.correct, entry] : progress.correct,
      mistakes: isCorrect ? progress.mistakes : [...progress.mistakes, entry],
    })
  }

  const percentDone = Number((progress.index / entries.length) * 100).toFixed(2)

  return {
    progress,
    isDone: progress.index === entries.length,
    percentDone,
    totalQuestions: entries.length,
    submitAnswer,
    getCurrentEntry,
    getEntries,
    repeat,
    reset,
  }
}

const ExerciseContextProvider = ({ children }) => {
  const context = useExerciseContext()
  return (
    <ExerciseContext.Provider value={context}>
      {children}
    </ExerciseContext.Provider>
  )
}

const useExercise = () => useContext(ExerciseContext)

export { ExerciseContext, ExerciseContextProvider, useExercise }
