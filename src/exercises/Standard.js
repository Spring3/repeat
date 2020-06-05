import React, { useState } from "react"
import styled from "@emotion/styled"
import { useData } from "../contexts/DataContext"

const StandardExercise = () => {
  const { data: entries } = useData()
  // TODO: move to context
  const [progress, setProgress] = useState({
    index: 0,
    correct: [],
    mistakes: [],
  })

  const entry = entries[progress.index]
  const ENTER = 13

  const onKeyUp = e => {
    if (e.keyCode === ENTER) {
      const { value } = e.target
      if (value.trim().toLowerCase() === entry.word) {
        setProgress({
          index: progress.index + 1,
          correct: [...progress.correct, progress.index],
          mistakes: progress.mistakes,
        })
      } else {
        setProgress({
          index: progress.index + 1,
          correct: progress.correct,
          mistakes: [...progress.mistakes, progress.index],
        })
      }
      e.target.value = ""
    }
  }

  if (progress.index === entries.length) {
    return (
      <div>
        <h2>Done!</h2>
        <p>Correct: {progress.correct.length}</p>
        <p>Mistakes: {progress.mistakes.length}</p>
        <p>
          Ratio: {((progress.correct.length / entries.length) * 100).toFixed(2)}
          %
        </p>
      </div>
    )
  }

  return (
    <div>
      <div>
        <h3>{entry.meaning}</h3>
        <input type="text" onKeyUp={onKeyUp} placeholder="Answer" required />
        <small>Press Enter to submit</small>
      </div>
      <div>
        <button type="button">
          End Exercise
        </button>
      </div>
    </div>
  )
}

export { StandardExercise }
