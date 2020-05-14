import React, { useCallback } from 'react'
import Exercise from '../components/Exercise';
import { DataContextProvider, useData }  from '../contexts/DataContext';
import { Dropzone } from '../components/Dropzone';
import { parseFiles } from '../utils/parseFile';
import { Helmet } from 'react-helmet';

const Page = () => {
  const { data, setData } = useData();

  const onDrop = useCallback(async (acceptedFiles) => {
    const fileContents = await parseFiles(acceptedFiles);
    setData(fileContents);
  }, []);

  if (data.length) {
    return (
      <div>
        <Exercise entries={data} />
        <h2>List of all words:</h2>
        <ul>
          { data.map((entry, i) => (
            <li key={i}><strong>{entry.word}</strong> - <span>{entry.meaning}</span></li>
          ))}
        </ul>
      </div>
    );
  }

  return <Dropzone onDrop={onDrop} />
}

export default () => {
  return (
    <DataContextProvider>
      <Helmet>
        <meta charSet="utf-8"></meta>
        <title>Repeat your words</title>
        <style>
          {
            `* {
              font-family: Arial, Helvetica, sans-serif;
            }
          `}
        </style>
      </Helmet>
      <Page />
    </DataContextProvider>
  );
};
