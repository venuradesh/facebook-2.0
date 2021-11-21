import React from "react";
import styled from "styled-components";

function SideBarItem(props) {
  return (
    <Container>
      <div className="wrapper">
        <div className={`nav-item ${props.openthis}`} src={props.src}></div>
      </div>
    </Container>
  );
}

export default SideBarItem;

const Container = styled.div`
  --header-width: 60px;

  top: var(--header-width);
  width: var(--header-width);
  height: var(--header-width);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  .wrapper {
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    box-sizing: content-box;
    border-radius: var(--border-radius-s);

    .nav-item {
      width: 100%;
      height: 100%;
      background-image: url(${(props) => props.children.props.children.props.src});
      background-size: cover;
      position: relative;

      &.open::after {
        content: "";
        position: absolute;
        width: 8px;
        height: 8px;
        background-color: var(--facebook-blue);
        border-radius: 50%;
        top: -10px;
        right: -5px;
      }
    }
  }

  &:hover {
    background-color: var(--light-gray);
  }
`;
