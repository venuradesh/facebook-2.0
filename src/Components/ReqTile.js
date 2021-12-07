import React from "react";
import styled from "styled-components";

function ReqTile(props) {
  return (
    <Container>
      <div className="profile-container">
        <div className="pic-container" src={props.profilePic}></div>
        <div className="info-container">
          <div className="name">{props.name}</div>
          <div className="bio">{props.bio}</div>
        </div>
      </div>
      <div className="response-container">
        <div className="accept"></div>
        <div className="ignore"></div>
      </div>
    </Container>
  );
}

export default ReqTile;

const Container = styled.div`
  width: 100%;
  height: max-content;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: var(--border-radius-s);
  transition: all 0.3s ease;

  .profile-container {
    display: flex;
    column-gap: 10px;
    align-items: center;
    cursor: pointer;

    .pic-container {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-image: url(${(props) => props.children[0].props.children[0].props.src});
      background-size: cover;
      background-repeat: no-repeat;
      object-fit: cover;
      background-position: center;
    }

    .info-container {
      .name {
        font-size: var(--font-size-n);
        color: var(--dark-blue);
        font-weight: 500;
      }

      .bio {
        display: flex;
        flex-wrap: wrap;
        font-size: var(--font-size-ex);
        color: var(--normal-gray);
        margin-top: 2px;
      }
    }
  }

  .response-container {
    height: 100%;
    display: flex;
    align-items: center;

    .accept,
    .ignore {
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      object-fit: cover;
      width: 18px;
      height: 18px;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        transform: scale(1.2);
      }
    }

    .accept {
      background-image: url("/images/check.png");
      margin-right: 20px;
    }

    .ignore {
      background-image: url("/images/wrong.png");
    }
  }

  &:hover {
    background-color: var(--light-gray);
  }
`;
