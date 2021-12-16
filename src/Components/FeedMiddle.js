import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Post from "./Post";
import PostSender from "./PostSender";
import axios from "axios";

const API_URL = "http://localhost:8080/posts";

function FeedMiddle() {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    axios
      .get(API_URL)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Container>
      <PostSender />
      {posts.length !== 0 && posts.map((post, index) => <Post key={index} posts={post} />)}
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
