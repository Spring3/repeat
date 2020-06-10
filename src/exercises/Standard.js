import React, { useState } from "react"
import styled from "@emotion/styled"
import { useData } from "../contexts/DataContext"
import { CenteredWrapper } from '../components/CenteredWrapper';
import { Input } from '../components/Input';
import { Progressbar } from '../components/Progressbar';
import Confetti from 'react-confetti';
import tweenFunctions from 'tween-functions';
import { useWindowSize } from '../hooks/useWindowSize';
import CommentCheckOutlineIcon from 'mdi-react/CommentCheckOutlineIcon';
import CommentRemoveOutlineIcon from 'mdi-react/CommentRemoveOutlineIcon';
import AlertCircleOutlineIcon from 'mdi-react/AlertCircleOutlineIcon';
import CloseIcon from 'mdi-react/CloseIcon';
import { Button } from '../components/Button';
import { css } from "@emotion/core";
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import { Table } from '../components/Table';

const TestWrapper = styled.div`
  padding: 2rem 4rem;
  border-radius: 10px;
  box-shadow: 0px 0px 20px #dedede;
  border: 1px solid #dedede;
  ${props => props.showResults
    ? css`
      min-height: 500px;
      min-width: 500px;
    `
    : css`
      min-height: 300px;
      min-width: 300px;
    `
  }
`;

const Task = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-evenly;

  input {
    margin-top: 1rem;
    font-weight: bold;
  }
`;

const TaskProgress = styled.div`
  text-align: center;
  color: #BBBBBB;

  .index {
    z-index: 1;
    font-size: .8rem;
    background: rgba(255, 255, 255, .5);
  }
`;

const TaskInformation = styled.div`
  h4 {
    color: #BBBBBB;
  }

  .meaning {
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

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

const StandardExercise = () => {
  const { data: entries } = useData()
  const [selectedTab, setSelectedTab] = useState(0);
  const windowSize = useWindowSize();
  const [confettiTime, setConfettiTime] = useState(false)
  // TODO: move to context
  const [progress, setProgress] = useState({
    index: 0,
    correct: [],
    mistakes: [],
    mainMistake: 'Test'
  })

  const entry = entries[progress.index]
  const ENTER = 13

  const onKeyUp = e => {
    if (e.keyCode === ENTER) {
      const nextIndex = progress.index + 1;
      if (nextIndex === entries.length) {
        setConfettiTime(true);
      }
      const { value } = e.target
      const entry = entries[progress.index]

      if (value.trim().toLowerCase() === entry.word) {
        setProgress({
          ...progress,
          index: nextIndex,
          correct: [...progress.correct, { index: progress.index, entry }],
          mistakes: progress.mistakes,
        })
      } else {
        setProgress({
          ...progress,
          index: nextIndex,
          correct: progress.correct,
          mistakes: [...progress.mistakes, { index: progress.index, entry }],
        })
      }
      e.target.value = ""
    }
  }

  const progressPercent = Number(progress.index / entries.length * 100).toFixed(2);

  const onComplete = (confetti) => {
    setConfettiTime(false);
    confetti.reset();
  };

  const onTabClick = tabIndex => setSelectedTab(tabIndex);

  return (
    <CenteredWrapper>
      <TestWrapper showResults={progress.index === entries.length}>
        {
          progress.index === entries.length
          ? (
            <Results>
              <CloseIcon size={30} color="#999999" />
              <h1>Well Done!</h1>
              <StyledTabs selectedIndex={selectedTab} onSelect={onTabClick}>
                <StyledTabList>
                  <CustomTab
                    isActive={selectedTab === 0}
                  >Statistics</CustomTab>
                  <CustomTab
                    isActive={selectedTab === 1}
                  >Words to repeat</CustomTab>
                </StyledTabList>
                <TabPanel>
                  <ResultsStatistics>
                    <li>
                      <CommentCheckOutlineIcon color="lightgreen" size={28} /> Correct answers: &nbsp;
                      <strong>{progress.correct.length} ({(progress.correct.length / entries.length * 100).toFixed(2)})%</strong>
                    </li>
                    <li>
                      <CommentRemoveOutlineIcon color="red" size={28} /> Wrong answers: &nbsp;
                      <strong>{progress.mistakes.length} ({(progress.mistakes.length / entries.length * 100).toFixed(2)})%</strong>
                    </li>
                    <li>
                      <AlertCircleOutlineIcon color="orange" size={28} /> Most complicated word: &nbsp;
                      <strong>{progress.mainMistake}</strong>
                    </li>
                  </ResultsStatistics>
                </TabPanel>
                <TabPanel>
                  <Table height="300px" entries={progress.mistakes.map(e => e.entry)} />
                </TabPanel>
              </StyledTabs>
              <ButtonContainer>
                <Button>Repeat only failed</Button>
                <Button>Repeat</Button>
              </ButtonContainer>
            </Results>
          )
          : (
            <>
              <TaskProgress>
                <div className="index">{progress.index + 1} / {entries.length}</div>
                <Progressbar thickness={2} percent={progressPercent} />
              </TaskProgress>
              <Task>
                <TaskInformation>
                  <h4>Meaning:</h4>
                  <div className="meaning">{entry.meaning}</div>
                </TaskInformation>
                <Input type="text" onKeyUp={onKeyUp} placeholder="Word:" required />
              </Task>
            </>
          )
        }
      </TestWrapper>
      <Confetti
        height={windowSize.height}
        width={windowSize.width}
        recycle={false}
        numberOfPieces={confettiTime ? 200 : 0}
        onConfettiComplete={onComplete}
        confettiSource={{
          x: 0,
          y: windowSize.height / 2,
          w: 0,
          h: windowSize.height
        }}
        friction={.97}
        gravity={.2}
        wind={.1}
        tweenDuration={7000}
        initialVelocityX={15}
        initialVelocityY={30}
        tweenFunction={tweenFunctions.easeOutQuad}
      />
      <Confetti
        height={windowSize.height}
        width={windowSize.width}
        recycle={false}
        numberOfPieces={confettiTime ? 200 : 0}
        onConfettiComplete={onComplete}
        tweenDuration={7000}
        confettiSource={{
          x: windowSize.width,
          y: windowSize.height / 2,
          w: 0,
          h: windowSize.height
        }}
        friction={.97}
        gravity={.2}
        wind={-.1}
        initialVelocityX={-15}
        initialVelocityY={30}
        tweenFunction={tweenFunctions.easeOutQuad}
      />
    </CenteredWrapper>
  )
}

export { StandardExercise }
