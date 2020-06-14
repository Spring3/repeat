import React, { useState } from "react";
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import CommentCheckOutlineIcon from 'mdi-react/CommentCheckOutlineIcon';
import CommentRemoveOutlineIcon from 'mdi-react/CommentRemoveOutlineIcon';
import AlertCircleOutlineIcon from 'mdi-react/AlertCircleOutlineIcon';
import CloseIcon from 'mdi-react/CloseIcon';
import { Table } from './Table';
import { Button } from './Button';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import { useHistory } from 'react-router-dom';

const Results = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  flex-grow: 1;
  width: 100%;

  & > svg:first-of-type {
    align-self: flex-end;
    position: absolute;
    cursor: pointer;
    &:hover {
      fill: black;
    }
  }
`;

const ResultsStatistics = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;

  li {
    display: flex;
    padding: 0.5rem 1rem;
    font-size: 1.1rem;
    align-items: center;
    svg {
      margin-right: 10px;
    }
  }
`;

const ButtonContainer = styled.div`
  align-self: flex-end;
  margin-top: 2rem;
  & > button {
    margin-left: 1rem;
  }
`;

const StyledTabs = styled(Tabs)`
  flex-grow: 1;
  margin-top: 1rem;
`;

const StyledTabList = styled(TabList)`
  list-style-type: none;
  padding: 0;
  margin: 0;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-evenly;
`;

const StyledTab = styled(Tab)`
  padding: 0.5rem 1rem;
  border-bottom: 2px solid ${props => props.isActive ? 'black' : '#DDDDDD'}
`;

const CustomTab = ({ children, isActive }) => {
  return (
    <StyledTab isActive={isActive}>
      {children}
    </StyledTab>
  );
}

CustomTab.tabsRole = 'Tab';

const ExerciseResults = ({ onRepeat, progress, entries }) => {
  const history = useHistory();
  const [selectedTab, setSelectedTab] = useState(0);

  const onTabClick = tabIndex => setSelectedTab(tabIndex);

  return (
    <Results>
      <CloseIcon
        size={30}
        color="#999999"
        onClick={() => history.replace("/main/exercises")}
      />
      <h1>Well Done!</h1>
      <StyledTabs selectedIndex={selectedTab} onSelect={onTabClick}>
        <StyledTabList>
          <CustomTab isActive={selectedTab === 0}>Statistics</CustomTab>
          {progress.mistakes.length ? (
            <CustomTab isActive={selectedTab === 1}>Words to repeat</CustomTab>
          ) : null}
        </StyledTabList>
        <TabPanel>
          <ResultsStatistics>
            <li>
              <CommentCheckOutlineIcon color="lightgreen" size={28} /> Correct
              answers: &nbsp;
              <strong>
                {progress.correct.length} (
                {((progress.correct.length / entries.length) * 100).toFixed(2)}
                )%
              </strong>
            </li>
            <li>
              <CommentRemoveOutlineIcon color="red" size={28} /> Wrong answers:
              &nbsp;
              <strong>
                {progress.mistakes.length} (
                {((progress.mistakes.length / entries.length) * 100).toFixed(2)}
                )%
              </strong>
            </li>
            <li>
              <AlertCircleOutlineIcon color="orange" size={28} /> Most
              complicated word: &nbsp;
              <strong>{progress.mainMistake || "-"}</strong>
            </li>
          </ResultsStatistics>
        </TabPanel>
        <TabPanel>
          <Table height="300px" entries={progress.mistakes} />
        </TabPanel>
      </StyledTabs>
      <ButtonContainer>
        <Button
          onClick={() => onRepeat(true)}
        >
          Repeat only failed
        </Button>
        <Button
          onClick={() => onRepeat()}
        >
          Repeat
        </Button>
      </ButtonContainer>
    </Results>
  )
}

ExerciseResults.propTypes = {
  onRepeat: PropTypes.func.isRequired,
  progress: PropTypes.shape({
    index: PropTypes.number.isRequired,
    correct: PropTypes.arrayOf(PropTypes.shape({
      index: PropTypes.number.isRequired,
      word: PropTypes.string.isRequired,
      meaning: PropTypes.string.isRequired
    })).isRequired,
    mistakes: PropTypes.arrayOf(PropTypes.shape({
      index: PropTypes.number.isRequired,
      word: PropTypes.string.isRequired,
      meaning: PropTypes.string.isRequired
    })).isRequired,
    mainMistake: PropTypes.string,
  }).isRequired,
  entries: PropTypes.shape({
    word: PropTypes.string.isRequired,
    meaning: PropTypes.string.isRequired
  }).isRequired
}

export {
  ExerciseResults
}
