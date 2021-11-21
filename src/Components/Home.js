import React from "react";
import styled from "styled-components";
import FeedLeft from "./FeedLeft";
import Header from "./Header";
import NavBar from "./NavBar";

const Home = () => {
  return (
    <Container>
      <Header />
      <NavBar />
      <Feed>
        <FeedLeft />
      </Feed>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  min-width: 100vw;
  max-width: 100vw;
  min-height: 100vh;
`;

const Feed = styled.div`
  position: relative;
  left: 60px;
  top: 60px;
  z-index: -1;
`;
