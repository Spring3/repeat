import React from "react"
import styled from "@emotion/styled"
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom"

import { Wrapper } from "../components/Wrapper"
import ImageStandard from "../images/standard.jpg"
import ImageMeaning from "../images/meaning.jpg"
import { Standard, Matching } from "../exercises"
import { ExerciseContextProvider } from "../contexts/ExerciseContext"

const GridWrapper = styled(Wrapper)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 2rem;
`

const ExerciseCard = styled.div`
  display: flex;
  border-radius: 5px;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 300px;
  box-shadow: 0px 0px 5px 2px #eee;
  cursor: pointer;
  position: relative;
`

const CardImage = styled.div`
  border-radius: 5px;
  background: url("${props => props.image}") center center;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-size: cover;
`

const CardInformation = styled.div`
  z-index: 2;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.6);
  padding: 1rem;
`

const ExerciseCatalogue = () => {
  const history = useHistory()
  return (
    <GridWrapper>
      <ExerciseCard onClick={() => history.push("/main/exercises/standard")}>
        <CardImage image={ImageStandard} loading="lazy" alt="Dictionary" />
        <CardInformation>
          <h2>Standard</h2>
          <p>You are given the meaning, and you need to type the word</p>
        </CardInformation>
      </ExerciseCard>
      <ExerciseCard onClick={() => history.push("/main/exercises/matching")}>
        <CardImage
          image={ImageMeaning}
          loading="lazy"
          alt="Matching the words"
        />
        <CardInformation>
          <h2>Match the meaning</h2>
          <p>You are given the word, and you need to choose the meaning</p>
        </CardInformation>
      </ExerciseCard>
    </GridWrapper>
  )
}

const Exercises = () => {
  const { path } = useRouteMatch()

  return (
    <ExerciseContextProvider>
      <Switch>
        <Route exact path={path} component={ExerciseCatalogue} />
        <Route exact path={`${path}/standard`} component={Standard} />
        <Route exact path={`${path}/matching`} component={Matching} />
      </Switch>
    </ExerciseContextProvider>
  )
}

export { Exercises }
