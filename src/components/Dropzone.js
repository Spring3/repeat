import React from "react"
import PropTypes from "prop-types"
import { useDropzone } from "react-dropzone"
import styled from "@emotion/styled"

const StyledDropzone = styled.div`
  padding: 20px;
  background: #fafafa;
  border: 2px dashed #eeeeee;
  border-radius: 5px;
  width: 440px;

  & > p {
    color: #bdbdbd;
    text-align: center;
    font-size: 1.2rem;
  }
`

const Dropzone = ({ onDrop }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  })

  return (
    <StyledDropzone {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the .csv file here...</p>
      ) : (
        <p>Drag & drop the .csv file here, or click to select</p>
      )}
    </StyledDropzone>
  )
}

Dropzone.propTypes = {
  onDrop: PropTypes.func.isRequired,
}

export { Dropzone }
