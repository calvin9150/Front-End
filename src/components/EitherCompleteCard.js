import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import MaterialIcon from "material-icons-react";
import { FiThumbsUp, FiMoreHorizontal } from "react-icons/fi";
import { HiThumbUp } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";

import Nickname from "./Nickname";
import { deletePostDB, likePostDB } from "../redux/actions/eitherCard";

const EitherCompleteCard = props => {
  const dispatch = useDispatch();
  let {
    eitherId,
    nickname,
    title,
    contentA,
    contentB,
    date,
    likeCnt,
    voteCntA,
    voteCntB,
    liked,
    user,
  } = props;

  //유저정보(닉네임)
  const userInfo = useSelector(state => state.user.userInfo);

  const [percent, setPercent] = useState("");
  const [likes, setLikes] = useState(likeCnt);
  const [likeState, setLikeState] = useState(liked === null ? false : true);
  const [action, setAction] = useState(null);

  const { deletePostDBDone, deletePostDBError } = useSelector(
    state => state.eitherCard,
  );
  useEffect(() => {
    if (action) {
      if (deletePostDBDone) {
        alert("투표가 삭제되었습니다.");
        window.location.replace("/either");
      }
      if (deletePostDBError) {
        alert("투표 삭제에 오류가 발생하였습니다.");
      }
      setAction(null);
    }
  }, [deletePostDBDone, deletePostDBError]);

  //Progress Bar 퍼센트 계산
  useEffect(() => {
    if (voteCntA === 0 && voteCntB === 0) {
      setPercent(50);
    } else if (voteCntA === 0) {
      setPercent(0);
    } else if (voteCntB === 0) {
      setPercent(100);
    } else {
      let calPercent = (voteCntA / (voteCntA + voteCntB)) * 100;
      setPercent(Math.round(calPercent));
    }
  }, [voteCntA, voteCntB]);

  //좋아요
  const onClickLike = () => {
    if (liked !== null) {
      return;
    } else if (userInfo.nickname === "GUEST") {
      alert("로그인 후 사용 가능합니다.");
      return;
    } else {
      dispatch(likePostDB(eitherId));
      setLikes(likeCnt + 1);
      setLikeState(true);
    }
  };
  //삭제하기
  const onClickDelete = () => {
    dispatch(deletePostDB(eitherId));
    setAction(true);
  };
  //버튼A 상태 보여주기
  const SelctButtonA = (BGcolor, content) => {
    return (
      <EitherButtonA
        style={{ backgroundColor: BGcolor, color: "#101214" }}
        disabled
      >
        <ButtonText>{content}</ButtonText>
      </EitherButtonA>
    );
  };
  //버튼B 상태 보여주기
  const SelctButtonB = (BGcolor, content) => {
    return (
      <EitherButtonB
        style={{ backgroundColor: BGcolor, color: "#101214" }}
        disabled
      >
        <ButtonText>{content}</ButtonText>
      </EitherButtonB>
    );
  };
  return (
    <>
      <Container>
        <ManuButtonGrid>
          <div>
            {nickname === userInfo.nickname ? (
              <div>
                <Menu
                  menuButton={
                    <MenuButton
                      styles={{
                        border: "none",
                        backgroundColor: "transparent",
                      }}
                    >
                      <FiMoreHorizontal size={20} />
                    </MenuButton>
                  }
                  menuStyles={{ border: "0px solid" }}
                  portal={true}
                >
                  <MenuItem
                    styles={{
                      fontSize: "14px",
                    }}
                    onClick={onClickDelete}
                  >
                    삭제하기
                  </MenuItem>
                </Menu>
              </div>
            ) : null}
          </div>
        </ManuButtonGrid>
        <TitleDiv> {title} </TitleDiv>
        <DateDiv>{date.substring(0, 16)}</DateDiv>
        <TotalCntGrid>
          <FaRegUser style={{ width: "16", height: "16", color: "#00397c" }} />
          <TotalCntDiv>{voteCntA + voteCntB}</TotalCntDiv>
        </TotalCntGrid>
        {!userInfo.nickname ? (
          <div>
            {SelctButtonA(null, contentA)}
            {SelctButtonB(null, contentB)}
          </div>
        ) : (
          <div>
            {voteCntA === voteCntB ? (
              <div>
                {SelctButtonA("#DFDFDF", contentA)}
                {SelctButtonB("#DFDFDF", contentB)}
              </div>
            ) : voteCntA > voteCntB ? (
              <div>
                {SelctButtonA("#DFDFDF", contentA)}
                {SelctButtonB(null, contentB)}
              </div>
            ) : (
              <div>
                {SelctButtonA(null, contentA)}
                {SelctButtonB("#DFDFDF", contentB)}
              </div>
            )}
          </div>
        )}
        <ProgressGrid>
          <EitherProgress>
            <ProgressLabel>
              <div className="LabelLeft">{percent + "%"}</div>
              <div className="LabelRight">{100 - percent + "%"}</div>
            </ProgressLabel>
            <HightLight width={percent + "%"} />
          </EitherProgress>
        </ProgressGrid>
        <EitherFooter>
          <div>
            <Nickname
              nickname={nickname}
              userId={user}
              width={"32px"}
              height={"32px"}
              fontSize={"14px"}
            />
          </div>
          <div className="Grid">
            {!likeState ? (
              <FiThumbsUp
                onClick={onClickLike}
                style={{ width: "24", height: "24", cursor: "pointer" }}
              />
            ) : (
              <HiThumbUp
                style={{ width: "24", height: "24", cursor: "pointer" }}
              />
            )}
            <div className="Likes">{likes}</div>
          </div>
        </EitherFooter>
      </Container>
    </>
  );
};

const Container = styled.div`
  text-align: center;
  width: 380px;
  height: 490px;
  box-sizing: border-box;
  margin: 70px auto;
  border: 2px solid #00397c;
  border-radius: 10px;
  padding: 46px 32px;
  background: linear-gradient(
    180deg,
    rgba(0, 57, 124, 0.2) 0%,
    rgba(0, 0, 0, 0) 100%
  );
`;
const ManuButtonGrid = styled.div`
  .div {
    position: relative;
  }
  position: absolute;
  top: 110px;
  right: 40px;
`;
const TitleDiv = styled.div`
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin: auto;
  word-break: break-all;
`;
const DateDiv = styled.div`
  margin: 8px auto;
  font-size: 11px;
  color: #868e96;
`;
const TotalCntGrid = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;
const TotalCntDiv = styled.div`
  font-size: 12px;
  line-height: 20px;
  color: #868e96;
  margin-left: 8px;
`;
const ProgressGrid = styled.div`
  width: 100%;
  margin: auto;
`;
const EitherProgress = styled.div`
  margin: 24px auto;
  border: 1px solid #00397c;
  border-radius: 6px;
  width: 100%;
  height: 6px;
  background-color: #ffffff;
`;
const HightLight = styled.div`
  background-color: #dfdfdf;
  transition: 1s;
  width: ${props => props.width};
  height: 6px;
  margin-bottom: 1px;
  border-radius: ${props =>
    props.width === "100%" ? "5px 5px 5px 5px" : "5px 0px 0px 5px"};
`;
const ProgressLabel = styled.div`
  width: 316px;
  position: absolute;
  color: #00397c;
  margin-top: 6px;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  .LabelLeft {
    margin: 8px 0px 0px 10px;
  }
  .LabelRight {
    margin: 8px 10px 0px 0px;
  }
`;

const EitherButtonA = styled.button`
  width: 156px;
  height: 160px;
  border: 2px solid #00397c;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  font-size: 16px;
  line-height: 23px;
  margin: 24px auto 0px auto;
`;
const EitherButtonB = styled.button`
  width: 156px;
  height: 160px;
  border: 2px solid #00397c;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  font-size: 16px;
  line-height: 23px;
  margin: 24px auto 0px auto;
`;
const EitherFooter = styled.div`
  width: 313px;
  position: relative;
  margin-top: 40px;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  .Grid {
    color: #e25b45;
    display: flex;
    align-items: center;
  }
  .Likes {
    font-size: 14px;
    margin-left: 14px;
  }
`;
const ButtonText = styled.h5`
  word-break: break-all;
`;
export default EitherCompleteCard;
