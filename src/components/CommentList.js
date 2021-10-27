import React from "react";
import styled from "styled-components";
import Comment from "./Comment";

const CommentList = props => {
  const dataList = props.dataList;
  const commentList = props.dataList.Comment;
  return (
    <React.Fragment>
      <TempDiv>
        {commentList.map((p, i) => (
          <div>
            <Comment
              dataList={dataList}
              User={p.User}
              date={p.date}
              commentLikeCnt={p.commentLikeCnt}
              comment={p.comment}
              id={p.id}
            />
          </div>
        ))}
      </TempDiv>
    </React.Fragment>
  );
};

const TempDiv = styled.div`
  background-color: yellow;
`;

export default CommentList;
