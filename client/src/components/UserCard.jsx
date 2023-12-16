import React from "react";
import NameDropdown from "./NameDropdown.jsx";
import styled from "styled-components";

const UserCardWrapper = styled.div`
  grid-gap: 10px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
`

const UserImg = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 10px 10px 10px 10px;
`
const UserName = styled.div`
  font-weight: bold;
  margin-top: 10px;
  font-size: 18px;
`

const ResultText = styled.div`
  color: ${(props) => (props.isCorrect ? "green" : "red")};
`;

export default function UserCard(props) {

    const [currentName, setCurrentName] = React.useState('')

    const nameInput = <NameDropdown user={props.user}
                                    allNames={props.allUserNames}
                                    setCurrentName={setCurrentName}
                                    handleOnChange={props.handleOnChange}
                                    isLevelOver={props.isLevelOver}

                                />

    const gameResults = props.isLevelOver &&
        <ResultText isCorrect={currentName === props.user.name.first.toLowerCase()}>
            {props.user.name.first}
        </ResultText>

    return (
        <UserCardWrapper>
            <UserImg src={props.user.picture.large} alt="User"/>
            {props.isLearning ? <UserName>{props.user.name.first}</UserName> : nameInput}
            {gameResults}
        </UserCardWrapper>
    )
}