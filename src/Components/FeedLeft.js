import React from "react";
import styled from "styled-components";
import LeftFeedItems from "./LeftFeedItems";

function FeedLeft() {
  return (
    <Container>
      <ProfilePreview></ProfilePreview>
      <LeftFeedItems />
    </Container>
  );
}

export default FeedLeft;

//350px = 21.875rem
const Container = styled.div`
  --header-height: 60px;

  width: 21.875rem;
  height: calc(100vh - var(--header-height));
  position: fixed;
`;

const ProfilePreview = styled.div``;
