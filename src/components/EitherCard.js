import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import ProgressBar from "@ramonak/react-progress-bar";

import { history } from "../redux/configureStore";
import {
  deletePostDB,
  likePostDB,
  votePostDB,
} from "../redux/actions/eitherCard";

const EitherCard = props => {
  const dispatch = useDispatch();
  const [percent, setPercent] = useState("");
  const {
    eitherId,
    nickname,
    title,
    contentA,
    contentB,
    date,
    likeCnt,
    voteCntA,
    voteCntB,
    voted,
  } = props;
  //Progress Bar 퍼센트 계산
  useEffect(() => {
    if (voteCntA === 0) {
      setPercent(100);
    } else if (voteCntB === 0) {
      setPercent(0);
    } else {
      let calPercent = (voteCntA / (voteCntA + voteCntB)) * 100;
      setPercent(Math.round(calPercent));
    }
  }, []);

  //유저정보(닉네임)
  const userInfo = useSelector(state => state.user.userInfo);
  //수정하기
  const onClickModify = () => {
    history.push(`/either/${eitherId}/edit`);
  };
  //삭제하기
  const onClickDelete = () => {
    dispatch(deletePostDB(eitherId));
  };
  //좋아요
  const onClickLike = () => {
    dispatch(likePostDB(eitherId));
  };
  //contentA 투표
  const onClickContentA = () => {
    dispatch(votePostDB({ eitherId, data: { vote: "A" } }));
  };
  //contentB 투표
  const onClickContentB = () => {
    dispatch(votePostDB({ eitherId, data: { vote: "B" } }));
  };

  return (
    <>
      <Container>
        <EitherText>
          <div>
            <b>OX</b>
            {nickname === userInfo ? (
              voteCntA + voteCntB === 0 ? (
                <div>
                  <button onClick={onClickModify}>수정하기</button>
                  <button onClick={onClickDelete}>삭제하기</button>
                </div>
              ) : (
                <div>
                  <button onClick={onClickDelete}>삭제하기</button>
                </div>
              )
            ) : null}
          </div>
          <h2>{title}</h2>
        </EitherText>
        {voted === 1 ? (
          <div>
            <EitherButton onClick={onClickContentA} disabled>
              <h1>O</h1>
              <h5>{contentA}</h5>
            </EitherButton>
            <EitherButton onClick={onClickContentB} disabled>
              <h1>X</h1>
              <h5>{contentB}</h5>
            </EitherButton>
          </div>
        ) : (
          <div>
            <EitherButton onClick={onClickContentA}>
              <h1>O</h1>
              <h5>{contentA}</h5>
            </EitherButton>
            <EitherButton onClick={onClickContentB}>
              <h1>X</h1>
              <h5>{contentB}</h5>
            </EitherButton>
          </div>
        )}
        <EitherProgress>
          <ProgressBar
            completed={percent}
            labelAlignment="center"
            height="15px"
            width="90%"
            labelSize="10px"
            margin="auto"
          />
        </EitherProgress>
        <EitherFooter>
          <div style={{ fontSize: "10px", padding: "0px 2em" }}>
            {nickname} {"|"} {date}
          </div>
          <div style={{ fontSize: "10px", padding: "0px 2em" }}>
            <button onClick={onClickLike}>좋아요</button> {likeCnt}
          </div>
        </EitherFooter>
      </Container>
    </>
  );
};

const Container = styled.div`
  text-align: center;
  width: 80%;
  height: auto;
  margin: 100px auto;
  border: 1px solid black;
  border-radius: 10px;
  padding: 1em;
  opacity: 0.3;
  background-color: white;
`;

const EitherText = styled.div`
  width: 100%;
`;

const EitherProgress = styled.div`
  margin: 30px;
`;
const EitherButton = styled.button`
  width: 40%;
  height: 40%;
`;
const EitherFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default EitherCard;