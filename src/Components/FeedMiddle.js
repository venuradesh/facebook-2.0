import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Post from "./Post";
import PostSender from "./PostSender";
import axios from "axios";

const API_URL = "http://localhost:8080/posts";

function FeedMiddle() {
  const [posts, setPosts] = useState([]);

  const sortById = (arr) => {
    if (Array.isArray(arr)) {
      //bubble sort technique
      for (let i = 0; i < arr.length - 1; i++) {
        let flag = false;
        for (let j = 0; j < arr.length - 1; j++) {
          if (arr[j].id < arr[j + 1].id) {
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
            flag = true;
          }
        }
        if (flag === false) break;
      }
      return arr;
    } else {
      return arr;
    }
  };

  const getPosts = () => {
    axios
      .get(API_URL)
      .then((res) => {
        let data = sortById(res.data);
        setPosts(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getPosts();
  });

  return (
    <Container>
      <PostSender />
      {posts.length === 0 ? (
        <div className="loading-contaner">
          <div className="loader"></div>
          <div className="loader two"></div>
          <div className="loader three"></div>
        </div>
      ) : (
        posts.map((post, index) => <Post key={index} posts={post} />)
      )}
    </Container>
  );
}

export default FeedMiddle;

const Container = styled.div`
  padding: 15px;
  width: calc(100vw - 60px - 800px);
  max-height: 100vh;
  height: calc(100vh - 60px);

  .loading-contaner {
    width: 100%;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;

    .loader {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 15px;

      &::after {
        content: "";
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: var(--facebook-blue);
        opacity: 0.7;
        animation: loader 0.5s ease infinite alternate;
      }

      &.two {
        &::after {
          animation-delay: 0.2s;
        }
      }

      &.three {
        &::after {
          animation-delay: 0.4s;
        }
      }

      @keyframes loader {
        to {
          transform: scale(1.2);
          opacity: 1;
        }
      }
    }
  }
`;
