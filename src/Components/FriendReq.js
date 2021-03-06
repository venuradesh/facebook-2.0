import React from "react";
import styled from "styled-components";
import ReqTile from "./ReqTile";

function FriendReq() {
  return (
    <Container>
      <div className="heading">Requests</div>
      <div className="req-container">
        <ReqTile profilePic="/images/user.png" name="Emma Watson" bio="Actress | Social speaker" />
        <ReqTile profilePic="/images/user.png" name="Kumar Sangakkara" bio="Cricketer" />
      </div>
    </Container>
  );
}

export default FriendReq;

const Container = styled.div`
  background-color: var(--white);
  border-radius: var(--border-radius-s);
  width: 100%;
  padding: 15px;
  max-height: 400px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0px;
  }

  .heading {
    font-size: var(--font-size-h);
    font-weight: 700;
    margin-bottom: 15px;
  }
`;
