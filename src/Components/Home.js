import React from "react";
import styled from "styled-components";
import FeedLeft from "./FeedLeft";
import FeedMiddle from "./FeedMiddle";
import Header from "./Header";
import NavBar from "./NavBar";

const Home = () => {
  return (
    <Container>
      <Header />
      <NavBar />
      <Feed>
        <div className="feed-left">
          <FeedLeft />
        </div>
        <div className="feed-middle">
          <FeedMiddle />
        </div>
      </Feed>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  min-width: 100vw;
  max-width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
`;

const Feed = styled.div`
  left: 60px;
  right: 60px;
  position: relative;
  z-index: 0;
  display: flex;

  .feed-left {
    top: 60px;
    position: relative;
  }

  .feed-middle {
    position: relative;
    top: 60px;
    left: 400px;
  }
`;
