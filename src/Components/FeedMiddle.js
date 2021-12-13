import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Post from "./Post";
import PostSender from "./PostSender";
import axios from "axios";

const API_URL = "http://localhost:8080/";

function FeedMiddle() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setPosts([...res.data, ...posts]);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Container>
      <PostSender />
      {posts.map((post) => {
        <Post />;
      })}
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
