import React, { useCallback, useState } from "react"
import { useHistory } from "react-router-dom"
import { useData } from "../contexts/DataContext"
import { Dropzone } from "../components/Dropzone"
import { parseFiles } from "../utils/parseFile"
import styled from "@emotion/styled"
import { CenteredWrapper } from "../components/CenteredWrapper"
import uniqBy from "lodash.uniqby"

const Notice = styled.small`
  display: block;
  margin-top: 1rem;
  color: grey;
`

const ErrorMessage = styled.div`
  color: red;
  margin: 1rem 0px;
`

const IndexView = () => {
  const { setData } = useData()
  const [error, setError] = useState()
  const history = useHistory()

  const onDrop = useCallback(async acceptedFiles => {
    const fileContents = await parseFiles(acceptedFiles)
    const nonEmptyEntries = fileContents.reduce(
      (acc, contents) =>
        acc.concat(
          contents.reduce((acc, { word, meaning }) => {
            if (!word || !meaning) {
              return acc
            }
            return [...acc, { word: word.trim().toLowerCase(), meaning }]
          }, [])
        ),
      []
    )
    const uniqueNonEmptyEntries = uniqBy(nonEmptyEntries, entry => entry.word)
    if (!uniqueNonEmptyEntries.length) {
      setError("The file you have uploaded, appears to be empty.")
    } else {
      setData(uniqueNonEmptyEntries)
      history.push("/main/exercises")
    }
  }, [])

  return (
    <CenteredWrapper>
      <div>
        <h2>Upload the .csv file</h2>
        <Dropzone onDrop={onDrop} />
        <Notice>
          * The file should have 2 columns with "word" and "meaning" as headers
        </Notice>
        {error ? <ErrorMessage color="red">{error}</ErrorMessage> : null}
      </div>
    </CenteredWrapper>
  )
}

export { IndexView }
