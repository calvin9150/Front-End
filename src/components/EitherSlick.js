import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import EitherCard from "./EitherCard";
import EitherCompleteCard from "./EitherCompleteCard";

//다음으로 넘어가기 버튼
function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        width: "50px",
        height: "50px",
        right: "0px",
        top: "260px",
        zIndex: "100000",
      }}
      onClick={onClick}
    >
      <img
        src={require("../images/arrow.png").default}
        alt="arrowNext"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          right: "-100px",
          top: "0px",
          border: null,
        }}
      />
    </div>
  );
}
//이전으로 넘어가기 버튼
function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        width: "50px",
        height: "50px",
        right: "0px",
        top: "260px",
        zIndex: "9999",
      }}
      onClick={onClick}
    >
      <img
        src={require("../images/arrowL.png").default}
        alt="arrowNext"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          left: "-100px",
          top: "0px",
          border: null,
        }}
      />
    </div>
  );
}

const EiterSlick = ({ PostList, PostingList, PostCompleteList }) => {
  const NotCompleteList =
    PostList && PostList.filter(post => post.completed === 0);
  const CompleteList =
    PostList && PostList.filter(post => post.completed === 1);

  return (
    <>
      <Wrap>
        <div>
          <Slider {...settings}>
            {NotCompleteList &&
              NotCompleteList?.map(v => (
                <EitherCard
                  key={v.toString()}
                  eitherId={v.eitherId}
                  nickname={v.nickname}
                  title={v.title}
                  contentA={v.contentA}
                  contentB={v.contentB}
                  date={v.date}
                  likeCnt={v.likeCnt}
                  voteCntA={v.voteCntA}
                  voteCntB={v.voteCntB}
                  liked={v.liked}
                  voted={v.voted}
                  completed={v.completed}
                />
              ))}
            {CompleteList &&
              CompleteList.map(v => (
                <EitherCompleteCard
                  key={v.toString()}
                  eitherId={v.eitherId}
                  nickname={v.nickname}
                  title={v.title}
                  contentA={v.contentA}
                  contentB={v.contentB}
                  date={v.date}
                  likeCnt={v.likeCnt}
                  voteCntA={v.voteCntA}
                  voteCntB={v.voteCntB}
                  liked={v.liked}
                  voted={v.voted}
                  completed={v.completed}
                />
              ))}
            {PostingList &&
              PostingList?.map(v => (
                <EitherCard
                  key={v.toString()}
                  eitherId={v.eitherId}
                  nickname={v.nickname}
                  title={v.title}
                  contentA={v.contentA}
                  contentB={v.contentB}
                  date={v.date}
                  likeCnt={v.likeCnt}
                  voteCntA={v.voteCntA}
                  voteCntB={v.voteCntB}
                  liked={v.liked}
                  voted={v.voted}
                  completed={v.completed}
                />
              ))}
            {PostCompleteList &&
              PostCompleteList?.map(v => (
                <EitherCompleteCard
                  key={v.toString()}
                  eitherId={v.eitherId}
                  nickname={v.nickname}
                  title={v.title}
                  contentA={v.contentA}
                  contentB={v.contentB}
                  date={v.date}
                  likeCnt={v.likeCnt}
                  voteCntA={v.voteCntA}
                  voteCntB={v.voteCntB}
                  liked={v.liked}
                  voted={v.voted}
                  completed={v.completed}
                />
              ))}
          </Slider>
        </div>
      </Wrap>
    </>
  );
};

const settings = {
  className: "center",
  centerMode: true,
  infinite: true,
  // adaptiveHeight: true,
  // focusOnSelect: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  speed: 500,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  centerPadding: "0px",
  // responsive: [
  //   { breakpoint: 2200, settings: { slidesToShow: 3, slidesToScroll: 1 } },
  //   { breakpoint: 1900, settings: { slidesToShow: 1, slidesToScroll: 1 } },
  // ],
};

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;

  .center .slick-slide.slick-center {
    -ms-transform: scale(1.3);
    transform: scale(1.3);
    z-index: 2;
  }
`;

export default EiterSlick;
