import React from "react";
import styled from "styled-components";
import Post from "./Post";
import PostSender from "./PostSender";

function FeedMiddle() {
  return (
    <Container>
      <PostSender />
      <Post />
    </Container>
  );
}

export default FeedMiddle;

const Container = styled.div`
  padding: 15px;
  width: calc(100vw - 60px - 800px);
  max-height: 100vh;
  height: calc(100vh - 60px);
`;
