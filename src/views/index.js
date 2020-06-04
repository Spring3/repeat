import React, { useCallback } from 'react';
import { navigate } from '@reach/router';
import { useData }  from '../contexts/DataContext';
import { Dropzone } from '../components/Dropzone';
import { parseFiles } from '../utils/parseFile';
import styled from '@emotion/styled';

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

const IndexView = () => {
  const { setData } = useData();

  const onDrop = useCallback(async (acceptedFiles) => {
    const fileContents = await parseFiles(acceptedFiles);
    setData(fileContents);
    navigate('/main');
  }, []);

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

export {
  IndexView
}
