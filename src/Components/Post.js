import React, { useState, useRef } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import moment from "moment";

function Post({ posts }) {
  let images = posts.images ? posts.images.split(",") : [];
  const commentSection = useRef(null);
  const coverDefault = useRef(null);
  const userCover = useRef(null);
  const [user, setUser] = useState(null);
  const userId = useParams().id;
  const likedUsers = JSON.parse(posts.liked);
  const commentedUsers = JSON.parse(posts.commented).user;
  const [liked, setLiked] = useState(likedUsers.user.length !== 0 && likedUsers.user.includes(userId) ? true : false);
  const [postLikes, setPostLikes] = useState(posts.likes);
  const [postComments, setPostComments] = useState(posts.comments);
  const [postShares, setPostShares] = useState(posts.shares);
  const caption = posts.caption ? posts.caption : "";
  const [moreImages, setMoreImages] = useState(false);
  const [comment, setComment] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/user/${posts.userID}`)
      .then((response) => setUser(response.data.user))
      .catch((err) => console.log(err));
  }, []);

  const onEngClick = (name) => {
    switch (name) {
      case "like":
        if (!liked) {
          setLiked(true);
          setPostLikes(postLikes + 1);
          likedUsers.user = likedUsers.user.filter((user) => user !== userId);
          likedUsers.user.push(userId);
          onLikeClick(likedUsers.user, postLikes + 1);
        } else {
          setLiked(false);
          likedUsers.user = likedUsers.user.filter((user) => user !== userId);
          onLikeClick(likedUsers.user, postLikes - 1);
          setPostLikes(postLikes - 1);
        }
        break;
      case "comment":
        commentSection.current.focus();
        document.querySelector(".send-btn").classList.add("activated");
        break;
      case "share":
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
      .catch((err) => console.error(err));
  };

  const onSendButtonClick = () => {
    commentSection.current.value = "";
    if (comment) {
      commentedUsers.push([userId, comment]);
      axios
        .post("http://localhost:8080/comment", {
          id: posts.id,
          commentedUsers,
          commentCount: posts.comments + 1,
        })
        .then((response) => {
          setPostComments(response.data.commentCount);
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    if (images.length > 4) {
      setMoreImages(true);
      images = images.slice(0, 4);
    }
  }, [posts]);

  return (
    <Container id={posts.id}>
      {!user ? (
        ""
      ) : (
        <>
          <HeaderSection>
            <div className="pr-container">
              <img src={user.ProfilePic ? `http://localhost:8080/${user.ProfilePic}` : "/images/user.png"} alt="profile" />
              <div className="name-container">
                <div className="name">
                  {user.FirstName} {user.lastName}
                </div>
                <div className="details-container">
                  <div className="time">{moment().to(parseInt(posts.modify_time))}</div>
                  <div className="published">
                    <img src="/images/global.png" alt="globally" />
                  </div>
                </div>
                <div className="profile-preview-container">
                  <img src={user.cover ? `http://localhost:8080/${user.cover}` : coverDefault.current.classList.add("activated")} alt="Cover-photo" />
                  <div className="cover-default" ref={coverDefault}></div>
                  <div className="profile-container">
                    <img src={user.ProfilePic ? `http://localhost:8080/${user.ProfilePic}` : "/images/user.png"} alt="user-profilepic" />
                  </div>
                  <div className="name-bio-container">
                    <div className="name">
                      {user.FirstName} {user.lastName}
                    </div>
                    <div className="bio">{user.bio ? user.bio : ""}</div>
                  </div>
                  <div className="options">
                    <div className="add-friend">
                      <img src="/images/add-friend.png" alt="add-friend" />
                      <p>Add Friend</p>
                    </div>
                    <div className="block-user">
                      <img src="/images/block.png" alt="block-user" />
                      <p>Block user</p>
                    </div>
                    <div className="view-profile">
                      <img src="/images/view.png" alt="view-profile" />
                      <p>View profile</p>
                    </div>
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
                <ThumbUpOutlinedIcon className={`liked-btn-outlined ${liked ? "activated" : ""}`} />
                <ThumbUpIcon className={`liked-btn-filled ${liked ? "activated" : ""}`} />
                {/* <img src="/images/like.png" alt="like btn" /> */}
                <p className={liked ? `liked` : ""}>Like</p>
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
            <div className="input">
              <input
                type="text"
                id="comment-section"
                ref={commentSection}
                placeholder="Write a comment"
                onKeyUp={(e) => {
                  e.key !== "Enter" ? setComment(e.target.value) : onSendButtonClick();
                }}
              />
              <SendOutlinedIcon className="send-btn" onClick={() => onSendButtonClick()} />
            </div>

            <div className="items">
              <img src="/images/smile.png" alt="feeling" />
              <img src="/images/gallery.png" alt="gallery" />
              <img src="/images/gif.png" alt="gif" />
              <img src="/images/sticker.png" alt="stickers" />
            </div>
          </CommentSection>
        </>
      )}
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
      cursor: pointer;
      position: relative;

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

      .profile-preview-container {
        display: none;
      }

      &:hover {
        .profile-preview-container {
          display: block;
          width: 300px;
          height: 300px;
          background-color: var(--white);
          box-shadow: 0 0 3px 1px var(--normal-gray);
          position: absolute;
          z-index: 100;
          top: 20px;
          border-radius: var(--border-radius-s);
          overflow: hidden;
          cursor: default;

          img {
            width: 300px;
            height: 150px;
            object-fit: cover;
          }

          .cover-default {
            display: none;

            .activated {
              width: 300px;
              height: 150px;
              background-color: var(--dark-blue);
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
            }
          }

          .profile-container {
            position: absolute;
            width: 100px;
            height: 100px;
            top: 40%;
            left: 50%;
            transform: translate(-50%, -50%);

            img {
              width: 100px;
              height: 100px;
              object-fit: cover;
              border-radius: 50%;
              border: 4px solid var(--facebook-blue);
            }
          }

          .name-bio-container {
            position: absolute;
            top: 57%;
            left: 50%;
            transform: translateX(-50%);
            width: 300px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .name {
              font-size: 1.2rem;
              color: var(--dark-blue);
              text-align: center;
            }

            .bio {
              font-size: var(--font-size-s);
              font-weight: 400;
              color: var(--normal-gray);
              text-align: center;
            }
          }

          .options {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 300px;
            position: absolute;
            padding: 15px;
            bottom: 0;

            img {
              width: 25px;
              height: 25px;
            }

            .add-friend,
            .block-user,
            .view-profile {
              display: flex;
              flex-direction: column;
              row-gap: 5px;
              align-items: center;
              transition: all 0.3s ease;
              cursor: pointer;

              p {
                font-size: var(--font-size-s);
                font-weight: 600;
                color: var(--dark-blue);
              }

              &:hover {
                transform: scale(1.1);
              }
            }
          }
        }
      }
    }
  }

  .more-options {
    width: 30px;
    height: 100%;
    display: flex;
    align-items: center;

    img {
      cursor: pointer;
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

      .liked-btn-outlined {
        display: block;
        color: var(--dark-blue);
        font-size: 1.2rem;

        &.activated {
          display: none;
        }
      }

      .liked-btn-filled {
        display: none;

        &.activated {
          display: block;
          color: var(--facebook-blue);
          font-size: 1.2rem;
        }
      }

      p {
        font-size: var(--font-size-s);
        color: var(--dark-blue);

        &.liked {
          color: var(--facebook-blue);
          font-weight: 700;
        }
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

  .input {
    flex: 1;
    position: relative;

    input {
      padding: 10px 15px;
      background-color: var(--light-gray);
      border: none;
      border-radius: 50px;
      width: 100%;
      color: var(--dark-blue);
      outline: none;
      padding-right: 40px;
      z-index: 1;

      &::placeholder {
        font-weight: 100;
        color: var(--normal-gray);
      }
    }

    .send-btn {
      display: block;
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 1.2rem;
      cursor: pointer;
      color: var(--dark-blue);
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
