import React from "react";
import styled from "styled-components";
import { useState } from "react";

const EitherWrite = () => {
  const [eitherState, setEitherState] = useState(true);
  const [multiState, setMultiState] = useState(false);
  const [title, setTitle] = useState("");
  const [contentA, setContentA] = useState("");
  const [contentB, setContentB] = useState("");

  //radio button
  const EitherRadioBtn = () => {
    if (eitherState === true) {
      return;
    } else {
      setEitherState(!eitherState);
      setMultiState(!multiState);
    }
  };
  const MultiRadioBtn = () => {
    if (multiState === true) {
      return;
    } else {
      setEitherState(!eitherState);
      setMultiState(!multiState);
    }
  };
  //Title Value
  const OnChangeTitle = e => {
    setTitle(e.target.value);
    console.log(e.target.value);
  };
  //contentA button Value
  const OnChangeContentA = e => {
    setContentA(e.target.value);
    console.log(e.target.value);
  };
  //contentB button Value
  const OnChangeContentB = e => {
    setContentB(e.target.value);
    console.log(e.target.value);
  };

  return (
    <>
      <ContentBox>
        <Index>
          <h4 style={{ width: "30px" }}>구분</h4>
          <div style={{ display: "flex" }}>
            <RadioButton>
              <input
                type="radio"
                id="either"
                checked={eitherState}
                onChange={EitherRadioBtn}
              />
              <label htmlFor="either">찬반</label>
            </RadioButton>
            <RadioButton>
              <input
                type="radio"
                id="multi"
                checked={multiState}
                onChange={MultiRadioBtn}
              />
              <label htmlFor="multi">객관식</label>
            </RadioButton>
          </div>
        </Index>
        <hr />
        <Title>
          <h4 style={{ width: "30px" }}>제목</h4>
          <Input
            type="text"
            placeholder="질문을 입력해주세요."
            value={title}
            onChange={OnChangeTitle}
          />
        </Title>
        <hr />
        <VoteBox>
          <EitherButtonGrid>
            <EitherButton>
              <h1 style={{ marginTop: "70px" }}>O</h1>
              <ButtonInput
                placeholder="해당 항목의 상세설명이 필요하면 적어주세요"
                value={contentA}
                onChange={OnChangeContentA}
              />
            </EitherButton>
            <EitherButton>
              <h1 style={{ marginTop: "70px" }}>X</h1>
              <ButtonInput
                placeholder="해당 항목의 상세설명이 필요하면 적어주세요"
                value={contentB}
                onChange={OnChangeContentB}
              />
            </EitherButton>
          </EitherButtonGrid>
        </VoteBox>
      </ContentBox>
    </>
  );
};

const RadioButton = styled.div`
  width: 70px;
  display: flex;
  margin: 0px 0px 0px 60px;
  align-items: center;
`;

const ContentBox = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 100%;
  padding: 1em;
  box-sizing: border-box;
`;

const Index = styled.div`
  margin: 10px;
  display: flex;
`;

const Title = styled.div`
  margin: 10px;
  display: flex;
`;

const Input = styled.input`
  width: 100%;
  margin: 15px 0px 15px 30px;
  border: none;
  outline: none;
  font-size: 18px;
`;

const VoteBox = styled.div`
  width: 100%;
  height: 400px;
`;

const EitherButtonGrid = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EitherButton = styled.div`
  width: 40%;
  height: 60%;
  border: 1px solid black;
  text-align: center;
  align-content: center;
`;

const ButtonInput = styled.input`
  border: none;
  outline: none;
  width: 80%;
  text-align: center;
`;

export default EitherWrite;
