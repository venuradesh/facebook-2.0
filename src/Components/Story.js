import React from "react";
import styled from "styled-components";

function Story() {
  return (
    <Container src="/images/media1.jpg">
      <div className="overlay"></div>
      <div className="profile-container open" src="images/user.png"></div>
      <div className="down-part"></div>
    </Container>
  );
}

export default Story;

const Container = styled.div`
  height: 200px;
  width: 130px;
  min-width: 130px;
  min-height: 200px;
  border-radius: var(--border-radius-s);
  background-image: url(${(props) => props.src});
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  object-fit: cover;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  transition: all 1s ease;
  cursor: pointer;
  margin-right: 15px;

  .overlay {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: var(--dark-blue);
    opacity: 0.5;
  }

  .down-part {
    position: absolute;
    bottom: 0;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    transform: translateY(80%);
    background-color: var(--dark-blue);
    transition: all 0.3s ease;
  }

  .profile-container {
    width: 50px;
    height: 50px;
    background-image: url(${(props) => props.children[1].props.src});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    object-fit: cover;
    position: relative;
    border-radius: 50%;
    bottom: 20px;
    z-index: 100;

    &.open {
      border: 3px solid var(--facebook-blue);
    }
  }

  &:hover {
    background-size: 200%;
    background-position: center;

    .down-part {
      transform: translateY(70%);
    }
  }
`;
