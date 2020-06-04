import React, { useCallback, useState } from 'react'
import { DataContextProvider, useData }  from '../contexts/DataContext';
import { Dropzone } from '../components/Dropzone';
import { parseFiles } from '../utils/parseFile';
import { Helmet } from 'react-helmet';
import styled from '@emotion/styled';
import 'normalize.css';
import { Navbar, Tabs } from '../components/Navbar';
import { WordsTab } from '../components/WordsTab';
import { ExercisesTab } from '../components/ExercisesTab';

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
  const [activeTab, setActiveTab] = useState(Tabs.Exercises);

  const onDrop = useCallback(async (acceptedFiles) => {
    const fileContents = await parseFiles(acceptedFiles);
    setData(fileContents);
  }, []);

  if (data.length) {
    return (
      <div>
        <Navbar
          onNavigate={tab => setActiveTab(tab)}
          wordsCount={data.length}
        />
        {activeTab === Tabs.Words
          ? (<WordsTab entries={data} />)
          : (<ExercisesTab entries={data} />)
        }
      </div>
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
