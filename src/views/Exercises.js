import React from 'react';
import styled from '@emotion/styled';
import { navigate, useMatch } from '@reach/router';

import ImageStandard from '../images/standard.jpg';
import ImageMeaning from '../images/meaning.jpg';

const Wrapper = styled.div`
  padding: 2rem;
`;

const GridWrapper = styled(Wrapper)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 1rem;
`;

const ExerciseCard = styled.div`
  display: flex;
  border-radius: 5px;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 300px;
  box-shadow: 0px 0px 5px 2px #eee;
  cursor: pointer;
  position: relative;
`;

const CardImage = styled.div`
  border-radius: 5px;
  background: url("${props => props.image}") center center;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-size: cover;
`;

const CardInformation = styled.div`
  z-index: 2;
  border-radius: 5px;
  background: rgba(255, 255, 255, .6);
  padding: 1rem;
`;

const Exercises = ({ children }) => {
  const match = useMatch('/main/exercises');
  
  if (match === null) {
    return children;
  }

  return (
    <GridWrapper>
      <ExerciseCard onClick={() => navigate("/main/exercises/standard")}>
        <CardImage image={ImageStandard} loading="lazy" alt="Dictionary" />
        <CardInformation>
          <h2>Standard</h2>
          <p>You are given the meaning, and you need to type the word</p>
        </CardInformation>
      </ExerciseCard>
      <ExerciseCard onClick={() => navigate("/main/exercises/matching")}>
        <CardImage image={ImageMeaning} loading="lazy" alt="Matching the words" />
        <CardInformation>
          <h2>Match the meaning</h2>
          <p>You are given the word, and you need to choose the meaning</p>
        </CardInformation>
      </ExerciseCard>
    </GridWrapper>
  )
}

export {
  Exercises
};
