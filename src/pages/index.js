import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Papa from 'papaparse';

export default () => {
  const [entries, setEntries] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    const reader = new FileReader()

    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
      Papa.parse(reader.result, {
        header: true,
        complete: (result) => {
          console.log('result', JSON.stringify(result, null, 2));
          setEntries(result.data);
        },
        error: (error) => {
          console.error(error);
        }
      })
    }

    reader.readAsText(file);
  }, []);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false });

  if (entries.length) {
    return (
      <ul>
        { entries.map((entry, i) => (
          <li key={i}><strong>{entry.word}</strong> - <span>{entry.translation}</span></li>
        ))}
      </ul>
    )
  }

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive
        ? <p>Drop the .csv file here...</p>
        : <p>Drag 'n' drop the .cvs file here, or click to select file</p>
      }
    </div>
  )
}
