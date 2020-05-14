import React from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';

const Dropzone = ({ onDrop }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive
        ? <p>Drop the .csv file here...</p>
        : <p>Drag 'n' drop the .cvs file here, or click to select file</p>
      }
    </div>
  );
}

Dropzone.propTypes = {
  onDrop: PropTypes.func.isRequired
}

export {
  Dropzone
};
