import React, { useCallback } from 'react'
import Exercise from '../components/Exercise';
import { DataContextProvider, useData }  from '../contexts/DataContext';
import { Dropzone } from '../components/Dropzone';
import { parseFiles } from '../utils/parseFile';
import { Helmet } from 'react-helmet';
import styled from '@emotion/styled';
import 'normalize.css';

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const Notice = styled.small`
  display: block;
  margin-top: 1rem;
  color: grey;
`;

const Page = () => {
  const { data, setData } = useData();

  const onDrop = useCallback(async (acceptedFiles) => {
    const fileContents = await parseFiles(acceptedFiles);
    setData(fileContents);
  }, []);

  if (data.length) {
    return (
      <Exercise entries={data} />
    );
  }

  return (
    <CenteredContainer>
      <div>
        <h2>Upload the .csv file</h2>
        <Dropzone onDrop={onDrop} />
        <Notice>* The file should have 2 columns with "word" and "meaning" as headers</Notice>
      </div>
    </CenteredContainer>
  )
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
