import React, { createContext, useState, useContext } from "react"
import { shuffle } from "../utils/shuffleArray"

const ExerciseContext = createContext()

const DEFAULT_BATCH_SIZE = 1

const useExerciseContext = () => {
  const [entries, setEntries] = useState([])
  const [batchSize, setBatchSize] = useState(1)
  const [progress, setProgress] = useState({
    index: 0,
    isDone: false,
    isLast: false,
    correct: [],
    mistakes: [],
  })

  const reset = (entries, options = {}) => {
    if (entries) {
      setEntries(shuffle(entries))
    }
    setBatchSize(options.batchSize || DEFAULT_BATCH_SIZE)
    setProgress({
      index: 0,
      isDone: false,
      isLast: false,
      correct: [],
      mistakes: [],
    })
  }

  const repeat = mistakesOnly => {
    if (mistakesOnly) {
      reset(progress.mistakes, { batchSize })
    } else {
      reset(undefined, { batchSize })
    }
  }

  const getCurrentBatch = () => {
    if (!entries.length || progress.isDone) {
      return []
    }
    return entries.slice(progress.index, progress.index + batchSize)
  }

  const submitAnswer = ({ correct = [], mistakes = [] }) => {
    if (progress.isDone) {
      return
    }

    const nextIndex = progress.index + batchSize

    setProgress({
      ...progress,
      isDone: entries.length && nextIndex >= entries.length,
      isLast: nextIndex + batchSize >= entries.length,
      index: nextIndex,
      correct: progress.correct.concat(correct),
      mistakes: progress.mistakes.concat(mistakes),
    })
  }

  const percentDone = Number((progress.index / entries.length) * 100).toFixed(2)

  return {
    progress,
    percentDone,
    totalQuestions: entries.length,
    submitAnswer,
    setBatchSize,
    getCurrentBatch,
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
