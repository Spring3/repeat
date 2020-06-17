import React, { useState, useCallback, useEffect } from "react"
import styled from "@emotion/styled"
import debounce from "lodash.debounce"
import { useData } from "../contexts/DataContext"
import { Wrapper } from "../components/Wrapper"
import { Table } from "../components/Table"
import { Button } from "../components/Button"
import { Modal } from "../components/Modal"
import { Dropzone } from "../components/Dropzone"
import { parseFiles } from "../utils/parseFile"
import uniqBy from "lodash.uniqby"

const Searchbar = styled.input`
  flex-grow: 1;
  padding: 0.5rem;
  min-width: 0;
  box-sizing: border-box;
`

const MenuRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  & > button {
    margin-left: 1rem;
  }
`

const ErrorMessage = styled.div`
  color: red;
  margin: 1rem 0px;
`

const Dictionary = () => {
  const [error, setError] = useState()
  const { data: entries, setData } = useData()
  const [searchResults, setSearchResults] = useState(entries)
  const [showDropzoneModal, setShowDropzoneModal] = useState(false)

  useEffect(() => {
    setSearchResults(entries)
  }, [entries])

  const onDrop = useCallback(
    async acceptedFiles => {
      const fileContents = await parseFiles(acceptedFiles)
      if (!fileContents.length) {
        setError("The file you have uploaded, appears to be empty.")
      } else {
        const uniqueEntries = uniqBy(
          entries.concat(fileContents),
          entry => entry.word
        )
        setData(uniqueEntries)
      }
    },
    [entries]
  )

  const onSearch = useCallback(
    event => {
      debouncedSearch(event.target.value)
    },
    [entries]
  )

  const debouncedSearch = debounce(value => {
    const text = value || ""
    const query = text.trim().toLowerCase()
    const filteredEntries = entries.filter(entry =>
      `${entry.word}${entry.meaning}`.toLowerCase().trim().includes(query)
    )
    setSearchResults(filteredEntries)
  }, 300)

  return (
    <Wrapper>
      <MenuRow>
        <Searchbar type="search" placeholder="Search..." onChange={onSearch} />
        <Button onClick={() => setShowDropzoneModal(true)}>Add More</Button>
      </MenuRow>
      {searchResults.length ? (
        <Table entries={searchResults} />
      ) : (
        <p>No results that match your search query</p>
      )}
      {showDropzoneModal ? (
        <Modal
          header="Upload files"
          detached
          onClose={() => setShowDropzoneModal(false)}
        >
          <Dropzone onDrop={onDrop} />
          {error ? <ErrorMessage color="red">{error}</ErrorMessage> : null}
        </Modal>
      ) : null}
    </Wrapper>
  )
}

export { Dictionary }
