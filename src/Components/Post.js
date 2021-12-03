import React from "react";
import styled from "styled-components";

function Post() {
  return (
    <Container>
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
      <CaptionSection>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur voluptates vitae esse! Assumenda dolore exercitationem, tempore fugit maiores saepe illum?</CaptionSection>
      <MediaSection>
        <div className="media-container one" src="/images/media1.jpg"></div>
        <div className="media-container two" src="/images/media2.jpg"></div>
        <div className="media-container three" src="/images/media3.jpg"></div>
        <div className="media-container four" src="/images/media4.jpg"></div>
      </MediaSection>
      <EngagementSection>
        <div className="btn-container">
          <div className="like btn">
            <img src="/images/like.png" alt="like btn" />
            <p>Like</p>
          </div>
          <div className="comment btn">
            <img src="/images/comment.png" alt="like btn" />
            <p>Comment</p>
          </div>
          <div className="share btn">
            <img src="/images/share.png" alt="like btn" />
            <p>Share</p>
          </div>
        </div>
        <div className="stat-container">
          <img src="/images/like-filled.png" alt="liked" />
          <p>986</p>
          <img src="/images/comment-filled.png" alt="comment" />
          <p>200</p>
          <img src="/images/share-filled.png" alt="shares" />
          <p>5</p>
        </div>
      </EngagementSection>
      <CommentSection>
        <input type="text" id="comment-section" placeholder="Write a comment" />
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
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: 2fr 1fr;

  .media-container {
    background-size: cover;
    object-fit: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .one {
    grid-row: 1/-1;
    grid-column: 1;
    display: flex;
    background-image: url(${(props) => props.children[0].props.src});
  }

  .two {
    grid-column: 2;
    grid-row: 1;
    background-image: url(${(props) => props.children[1].props.src});
  }

  .three {
    grid-column: 2;
    grid-row: 2;
    background-image: url(${(props) => props.children[2].props.src});
  }

  .four {
    grid-column: 2;
    grid-row: 3;
    background-image: url(${(props) => props.children[3].props.src});
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
