import React from "react";
import styled from "styled-components";
import FeedLeft from "./FeedLeft";
import FeedMiddle from "./FeedMiddle";
import Header from "./Header";
import NavBar from "./NavBar";
import FeedRght from "./FeedRght";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const Home = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/user/${id}`).then((res) => {
      setUser(res.data.user);
    });
  }, []);

  return (
    <Container>
      {!user ? (
        <PreLoader>
          <div className="disk"></div>
          <div className="disk two"></div>
          <div className="disk three"></div>
        </PreLoader>
      ) : (
        <>
          <Header user={user} />
          <NavBar />
          <Feed>
            <div className="feed-left">
              <FeedLeft user={user} />
            </div>
            <div className="feed-middle">
              <FeedMiddle />
            </div>
            <div className="feed-right">
              <FeedRght />
            </div>
          </Feed>
        </>
      )}
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
  top: 60px;
  position: relative;
  z-index: 0;
  display: flex;

  .feed-left {
    position: relative;
  }

  .feed-middle,
  .feed-right {
    position: relative;
    left: 400px;
  }
`;

const PreLoader = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .disk {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: var(--facebook-blue);
    margin-right: 10px;
    animation: blink 0.5s ease infinite alternate;
  }

  .two {
    animation-delay: 0.2s;
  }

  .three {
    animation-delay: 0.4s;
  }

  @keyframes blink {
    from {
      opacity: 0.7;
      transform: scale(1);
    }

    to {
      opacity: 1;
      transform: scale(1.2);
    }
  }
`;
