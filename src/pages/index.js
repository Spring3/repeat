import React, { useCallback } from 'react'
import Exercise from '../components/Exercise';
import { DataContextProvider, useData }  from '../contexts/DataContext';
import { Dropzone } from '../components/Dropzone';
import { parseFiles } from '../utils/parseFile';

const Page = () => {
  const { data, setData } = useData();

  const onDrop = useCallback(async (acceptedFiles) => {
    const fileContents = await parseFiles(acceptedFiles);
    setData(fileContents);
  }, []);

  if (data.length) {
    return (
      <>
        <Exercise entries={data} />
        <ul>
          { data.map((entry, i) => (
            <li key={i}><strong>{entry.word}</strong> - <span>{entry.meaning}</span></li>
          ))}
        </ul>
      </>
    );
  }

  return <Dropzone onDrop={onDrop} />
}

export default () => {
  return (
    <DataContextProvider>
      <Page />
    </DataContextProvider>
  );
};
