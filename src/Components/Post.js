import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";

function Post({ posts }) {
  let images = posts.images ? posts.images.split(",") : [];
  const userId = useParams().id;
  const likedUsers = JSON.parse(posts.liked);
  const [liked, setLiked] = useState(likedUsers.user.length !== 0 && likedUsers.user.includes(userId) ? true : false);
  const [commented, setCommented] = useState(posts.commented === 0 ? false : true);
  const [shared, setShared] = useState(posts.shared === 0 ? false : true);
  const [postLikes, setPostLikes] = useState(posts.likes);
  const [postComments, setPostComments] = useState(posts.comments);
  const [postShares, setPostShares] = useState(posts.shares);
  const caption = posts.caption ? posts.caption : "";
  const [moreImages, setMoreImages] = useState(false);
  const [comment, setComment] = useState();
  const onEngClick = (name) => {
    switch (name) {
      case "like":
        console.log("liked: ", liked, "post liked: ", JSON.parse(posts.liked));
        if (!liked) {
          setLiked(true);
          setPostLikes(postLikes + 1);
          likedUsers.user = likedUsers.user.filter((user) => user != userId);
          likedUsers.user.push(userId);
          onLikeClick(likedUsers.user, postLikes + 1);
        } else {
          setLiked(false);
          likedUsers.user = likedUsers.user.filter((user) => user != userId);
          onLikeClick(likedUsers.user, postLikes - 1);
          setPostLikes(postLikes - 1);
        }
        break;
      case "comment":
        document.getElementById("comment-section").focus();
        // setCommented(true);
        // setPostComments((prev) => prev + 1);
        break;
      case "share":
        setShared(true);
        setPostShares((prev) => prev + 1);
        break;
      default:
        console.log("not valid");
    }
  };

  const onLikeClick = (likedUsers, likes) => {
    axios
      .post("http://localhost:8080/like", {
        id: posts.id,
        likedUsers,
        userId,
        likes,
      })
      .then((res) => {
        setPostLikes(res.data.likes);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (images.length > 4) {
      setMoreImages(true);
      images = images.slice(0, 4);
    }
  }, [posts]);

  return (
    <Container id={posts.id}>
      <HeaderSection>
        <div className="pr-container">
          <img src="/images/profile.jpg" alt="profile" />
          <div className="name-container">
            <div className="name">Venura Warnasooriya</div>
            <div className="details-container">
              <div className="time">15 min ago</div>
              <div className="published">
                <img src="/images/global.png" alt="globally" />
              </div>
            </div>
          </div>
        </div>
        <div className="more-options">
          <img src="/images/list.png" alt="more-options" />
        </div>
      </HeaderSection>
      <CaptionSection>{caption}</CaptionSection>
      {images.length !== 0 ? (
        <MediaSection className={`No_images_${!moreImages ? images.length : "4"} ${moreImages ? "more-images" : ""}`}>
          {images.map((image, index) => (
            <div key={index} className={`media-container image_${index + 1}`} src={`http://localhost:8080/${image}`}>
              <span>+{images.length - 3}</span>
            </div>
          ))}
        </MediaSection>
      ) : (
        <div className="space"></div>
      )}
      <EngagementSection>
        <div className="btn-container">
          <div className="like btn" onClick={() => onEngClick("like")}>
            <img src="/images/like.png" alt="like btn" />
            <p>Like</p>
          </div>
          <div className="comment btn" onClick={() => onEngClick("comment")}>
            <img src="/images/comment.png" alt="like btn" />
            <p>Comment</p>
          </div>
          <div className="share btn" onClick={() => onEngClick("share")}>
            <img src="/images/share.png" alt="like btn" />
            <p>Share</p>
          </div>
        </div>
        <div className="stat-container">
          <img src="/images/like-filled.png" alt="liked" />
          <p>{postLikes}</p>
          <img src="/images/comment-filled.png" alt="comment" />
          <p>{postComments}</p>
          <img src="/images/share-filled.png" alt="shares" />
          <p>{postShares}</p>
        </div>
      </EngagementSection>
      <CommentSection>
        <input type="text" id="comment-section" placeholder="Write a comment" onChange={(e) => setComment(e.target.value)} />
        <div className="items">
          <img src="/images/smile.png" alt="feeling" />
          <img src="/images/gallery.png" alt="gallery" />
          <img src="/images/gif.png" alt="gif" />
          <img src="/images/sticker.png" alt="stickers" />
        </div>
      </CommentSection>
    </Container>
  );
}

export default Post;

const Container = styled.div`
  width: 100%;
  padding: 15px;
  background-color: var(--white);
  border-radius: var(--border-radius-s);
  box-shadow: 0 3px 6px 0 var(--normal-gray);
  position: relative;
  margin-bottom: 15px;

  .space {
    margin-top: 15px;
  }
`;

const HeaderSection = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .pr-container {
    display: flex;
    align-items: center;

    & > img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 10px;
    }

    .name-container {
      .name {
        font-size: var(--font-size-s);
        color: var(--facebook-blue);
        font-weight: 700;
        margin-bottom: 3px;
      }

      .details-container {
        display: flex;
        align-items: center;

        .time {
          font-size: var(--font-size-ex);
          color: var(--normal-gray);
          font-weight: 300;
          margin-right: 10px;
        }

        .published {
          display: flex;
          align-items: center;

          img {
            width: 8px;
          }
        }
      }
    }
  }

  .more-options {
    width: 30px;
    height: 100%;
    display: flex;

    img {
      width: 20px;
      height: 20px;
    }
  }
`;

const CaptionSection = styled.div`
  margin-top: 15px;
  font-size: var(--font-size-s);
  color: var(--dark-blue);
`;

const MediaSection = styled.div`
  margin-top: 15px;
  width: 100%;
  max-height: 500px;
  min-height: 400px;
  display: grid;

  &.No_images_1 {
    min-height: 500px;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
    grid-template-areas: "img1";
  }

  &.No_images_2 {
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: "img1 img2";
  }

  &.No_images_3 {
    grid-tempate-rows: repeat(2, 1fr);
    grid-template-columns: 1.5fr 1fr;
    grid-template-areas:
      "img1 img2"
      "img1 img3";
  }

  &.No_images_4 {
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: 2fr 1fr;
    grid-template-areas:
      "img1 img2"
      "img1 img3"
      "img1 img4";
  }

  &.more-images {
    .media-container {
      &.image_4 {
        position: relative;
        display: grid;
        place-items: center;

        &::after {
          content: "";
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          position: absolute;
          background-color: var(--dark-blue);
          opacity: 0.6;
        }

        span {
          display: block;
          font-size: 2.8rem;
          font-weight: 700;
          color: var(--white);
          z-index: 1;
        }
      }
    }
  }

  .media-container {
    background-size: cover;
    object-fit: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .media-container {
    span {
      display: none;
    }

    &.image_1 {
      grid-area: img1;
      display: flex;
      background-image: url(${(props) => props.children[0].props.src});
      background-size: cover;
      object-fit: cover;
    }

    &.image_2 {
      grid-area: img2;
      background-image: url(${(props) => (props.children[1] ? props.children[1].props.src : "")});
    }

    &.image_3 {
      grid-area: img3;
      background-image: url(${(props) => (props.children[2] ? props.children[2].props.src : "")});
    }

    &.image_4 {
      grid-area: img4;
      background-image: url(${(props) => (props.children[3] ? props.children[3].props.src : "")});
    }
  }
`;

const EngagementSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  padding-bottom: 5px;
  border-bottom: 1px solid var(--normal-gray);
  margin-bottom: 10px;

  .btn-container {
    display: flex;
    align-items: center;

    img {
      width: 15px;
      height: 15px;
    }

    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      column-gap: 5px;
      padding: 10px 15px;
      width: 100px;
      cursor: pointer;

      p {
        font-size: var(--font-size-s);
        color: var(--dark-blue);
      }

      &:hover {
        background-color: var(--light-gray);
      }
    }
  }

  .stat-container {
    display: flex;
    align-items: center;
    column-gap: 10px;
    margin-right: 15px;

    img {
      width: 15px;
      height: 15px;
    }

    p {
      font-size: var(--font-size-s);
      font-weight: 500;
      color: var(--dark-blue);
    }
  }
`;

const CommentSection = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;

  input {
    padding: 10px 15px;
    background-color: var(--light-gray);
    border: none;
    border-radius: 50px;
    flex: 1;
    color: var(--dark-blue);
    outline: none;

    &::placeholder {
      font-weight: 100;
      color: var(--normal-gray);
    }
  }

  img {
    width: 20px;
    height: 20px;
  }

  .items {
    display: flex;
    column-gap: 10px;
  }
`;
