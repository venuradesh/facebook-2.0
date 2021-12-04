import { CollectionsOutlined } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Story from "./Story";

function FeedRght() {
  const storyContainer = useRef(null);
  const [scrollNext, setScrollNext] = useState(0);

  useEffect(() => {
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const scrollableWidth = storyContainer.current.scrollWidth - storyContainer.current.getBoundingClientRect().width - 130;

    storyContainer.current.scrollTo({
      top: 0,
      left: scrollNext,
      behavior: "smooth",
    });

    if (scrollNext > 0) {
      if (!prevBtn.classList.contains("active")) prevBtn.classList.add("active");
    } else if (scrollNext === 0) document.getElementById("prev-btn").classList.remove("active");

    if (scrollNext > scrollableWidth) nextBtn.classList.remove("active");
    else {
      if (!nextBtn.classList.contains("active")) nextBtn.classList.add("active");
    }
  }, [scrollNext]);

  const onNextClick = () => {
    const scrollableWidth = storyContainer.current.scrollWidth - storyContainer.current.getBoundingClientRect().width;
    console.log(scrollNext);
    console.log(scrollableWidth);

    if (scrollNext < scrollableWidth) {
      setScrollNext(scrollNext + 130);
    }
  };

  const onPrevClick = () => {
    if (scrollNext > 0) {
      setScrollNext(scrollNext - 130);
    }
  };

  return (
    <Container>
      <StoryContainer>
        <div className="story-heading">Stories</div>
        <div className="stories" ref={storyContainer}>
          <Story />
          <Story />
          <Story />
          <Story />
          <Story />
          <Story />
        </div>
      </StoryContainer>
      <NextButtonContainer className="active" id="next-btn" onClick={() => onNextClick()}>
        <img src="/images/next.png" alt="next-button" />
      </NextButtonContainer>
      <PrevButtonContainer className="" id="prev-btn" onClick={() => onPrevClick()}>
        <img src="/images/next.png" alt="prev-button" />
      </PrevButtonContainer>
    </Container>
  );
}

export default FeedRght;

const Container = styled.div`
  position: fixed;
  padding: 15px;
  width: 380px;
  max-height: calc(100vh - 60px);
`;

const StoryContainer = styled.div`
  .story-heading {
    margin-bottom: 15px;
    font-size: var(--font-size-h);
    font-weight: 700;
  }

  .stories {
    display: flex;
    overflow-x: auto;

    &::-webkit-scrollbar {
      width: 0px;
    }
  }
`;

const NextButtonContainer = styled.div`
  background-color: var(--white);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: none;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 5px;
  top: calc(50% - 10px);
  cursor: pointer;
  transition: all 0.3s ease;

  &.active {
    display: flex;
  }

  &:hover {
    transform: scale(1.2);
  }

  img {
    width: 40%;
    height: 40%;
  }
`;

const PrevButtonContainer = styled(NextButtonContainer)`
  display: none;

  &.active {
    left: 5px;
    display: flex;

    img {
      transform: rotateZ(180deg);
    }
  }
`;
