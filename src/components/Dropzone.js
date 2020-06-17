import React from "react"
import PropTypes from "prop-types"
import { useDropzone } from "react-dropzone"
import styled from "@emotion/styled"

const StyledDropzone = styled.div`
  box-sizing: border-box;
  padding: 20px;
  background: #fafafa;
  border: 2px dashed #eeeeee;
  border-radius: 5px;
  min-width: 440px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  & > p {
    color: #bdbdbd;
    text-align: center;
    font-size: 1.2rem;
  }
`

const Dropzone = ({ onDrop, className }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  })

  return (
    <StyledDropzone className={className} {...getRootProps()}>
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
  className: PropTypes.string,
}

export { Dropzone }
