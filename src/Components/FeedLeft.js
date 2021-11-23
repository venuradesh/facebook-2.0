import React, { useState } from "react";
import styled from "styled-components";

function FeedLeft() {
  const [persClick, setPerseClick] = useState(false);
  const [profClick, setProfClick] = useState(false);
  const [entClick, setEntClick] = useState(true);

  const onItemClick = (item) => {
    document.querySelector(`.${item}-next`).classList.toggle("active");
    if (document.querySelector(`.${item}-next`).classList.contains("active")) {
      if (item == "pers") setPerseClick(true);
      if (item == "prof") setProfClick(true);
      document.querySelector(`.${item}-heading`).style.marginBottom = "10px";
    } else {
      if (item == "pers") setPerseClick(false);
      if (item == "prof") setProfClick(false);
      document.querySelector(`.${item}-heading`).style.marginBottom = "0px";
    }
  };

  const onEntClick = () => {
    document.querySelector(".ent-next").classList.toggle("active");
    if (!entClick) {
      setEntClick("true");
      document.querySelector(".ent-heading").style.marginBottom = "10px";
    } else {
      setEntClick(false);
      document.querySelector(".ent-heading").style.marginBottom = "0px";
    }
  };

  return (
    <Container>
      <ProfilePreview>
        <div className="cover-container" src="/images/cover.jpg"></div>
        <div className="dp-container" src="/images/profile.jpg"></div>
        <div className="text-container">
          <div className="title">Venura Warnasooriya</div>
          <div className="headline">Web Developer | Software Developer | Graphic Designer</div>
          <div className="location">lives in Gampola</div>
          <div className="last-update">Last update on 3rd january 2021</div>
        </div>
        <div className="edit-profile">Edit Profile</div>
      </ProfilePreview>
      <PersonalInformation>
        <div className="heading pers-heading" onClick={() => onItemClick("pers")}>
          Personal
          <img className="pers-next" src="/images/next.png" alt="next btn" />
        </div>
        {persClick ? (
          <>
            <div className="items">
              <img src="/images/ad-activity.png" alt="recent ad activites" />
              <div className="text-content">
                <div className="name">Recent Ad Activites</div>
                <div className="desc">See all of the ads that you've interacted on Facebook 2.0</div>
              </div>
            </div>
            <div className="items">
              <img src="/images/memories-clr.png" alt="memories" />
              <div className="text-content">
                <div className="name">Memories</div>
                <div className="desc">Browse your photos, videos and posts on Facebook 2.0</div>
              </div>
            </div>
            <div className="items">
              <img src="/images/saved-clr.png" alt="saved" />
              <div className="text-content">
                <div className="name">Saved</div>
                <div className="desc">Find Posts, photos, and videos that you've saved for later</div>
              </div>
            </div>
            <div className="items">
              <img src="/images/whether-clr.png" alt="whether" />
              <div className="text-content">
                <div className="name">Whether</div>
                <div className="desc">Check your local forecast and sign up for daily whether notifications</div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </PersonalInformation>
      <Professional>
        <div className="heading prof-heading" onClick={() => onItemClick("prof")}>
          Professional
          <img className="prof-next" src="/images/next.png" alt="next btn" />
        </div>
        {profClick ? (
          <>
            <div className="items">
              <img src="/images/ads-manager.png" alt="ads manager" />
              <div className="text-content">
                <div className="name">Ads Manager</div>
                <div className="desc">Create, manage, and track the performance of your ads</div>
              </div>
            </div>
            <div className="items">
              <img src="/images/business-manager.png" alt="business manager" />
              <div className="text-content">
                <div className="name">Business Manager</div>
                <div className="desc">A better way to manage your business across Facebook and instagram, all in one place</div>
              </div>
            </div>
            <div className="items">
              <img src="/images/jobs.png" alt="jobs" />
              <div className="text-content">
                <div className="name">Jobs</div>
                <div className="desc">Find a job that's right for you</div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </Professional>
      <Entertainment>
        <div className="heading ent-heading" onClick={() => onEntClick()}>
          Entertainment
          <img className="ent-next active" src="/images/next.png" alt="next-btn" />
        </div>
        {entClick ? (
          <>
            <div className="items">
              <img src="/images/video-games.png" alt="video-games" />
              <div className="text-content">
                <div className="name">Gaming Video</div>
                <div className="desc">Watch and connect with your favourite games and streamers</div>
              </div>
            </div>
            <div className="items">
              <img src="/images/game-control.png" alt="games" />
              <div className="text-content">
                <div className="name">Play Games</div>
                <div className="desc">Play your favourite games</div>
              </div>
            </div>
            <div className="items">
              <img src="/images/watch.png" alt="watch" />
              <div className="text-content">
                <div className="name">Watch</div>
                <div className="desc">A video destination personalized to your interests and connections</div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </Entertainment>
    </Container>
  );
}

export default FeedLeft;

//400px = 25rem
const Container = styled.div`
  --header-height: 60px;

  width: 25rem;
  height: calc(100vh - var(--header-height));
  overflow-y: overlay;
  position: fixed;
  padding: 15px;

  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--bluewish-gray);
  }

  &:hover::-webkit-scrollbar-thumb {
    background-color: var(--normal-gray);
  }
`;

const ProfilePreview = styled.div`
  height: 300px;
  width: 100%;
  background-color: var(--white);
  border-radius: var(--border-radius-s);
  overflow: hidden;
  box-shadow: 0 1px 6px 0 var(--normal-gray);
  position: relative;
  cursor: default;

  .cover-container {
    width: 100%;
    height: 50%;
    background-image: url(${(props) => props.children[0].props.src});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    object-fit: cover;
  }

  .dp-container {
    width: 100px;
    height: 100px;
    background-image: url(${(props) => props.children[1].props.src});
    border-radius: 50%;
    background-size: cover;
    object-fit: cover;
    background-position: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-70%);
    border: 4px solid var(--facebook-blue);
    cursor: pointer;
  }

  .text-container {
    width: 90%;
    height: 100px;
    position: absolute;
    top: 62%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    display: flex;
    flex-direction: column;

    .title {
      font-size: var(--font-size-h);
      font-weight: 650;
      color: var(--dark-blue);
      margin-bottom: 5px;
    }

    .headline,
    .location {
      font-size: var(--font-size-s);
      color: var(--normal-gray);
    }

    .last-update {
      font-size: var(--font-size-ex);
      color: var(--normal-gray);
      flex: 1;
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }
  }

  .edit-profile {
    background-color: var(--white);
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 10px;
    border-radius: var(--border-radius-s);
    font-size: var(--font-size-s);
    font-weight: 600;
    color: var(--dark-blue);
    visibility: hidden;
    cursor: pointer;

    &:hover {
      background-color: var(--light-gray);
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  &:hover .edit-profile {
    visibility: visible;
    animation: fadeIn 1s forwards;
  }
`;

const PersonalInformation = styled.div`
  width: 100%;
  font-size: var(--font-size-h);
  color: var(--dark-blue);
  font-weight: 650;
  background-color: var(--white);
  padding: 15px 15px;
  border-radius: var(--border-radius-s);
  margin-top: 15px;
  box-shadow: 0 1px 6px 0 var(--normal-gray);
  transition: all 0.3s ease;

  .heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }

  img {
    width: 15px;
    cursor: pointer;
    height: 15px;
    transition: all 0.3s ease;

    &.active {
      transform: rotateZ(-90deg);
    }
  }

  .items {
    padding: 10px;
    display: flex;
    align-items: center;
    column-gap: 20px;
    padding-right: 30px;
    border-radius: var(--border-radius-s);
    cursor: pointer;

    img {
      width: 25px;
      height: 25px;
    }

    .text-content {
      .name {
        font-size: var(--font-size-n);
        font-weight: 500;
        color: var(--dark-blue);
      }

      .desc {
        font-size: var(--font-size-ex);
        font-weight: 200;
        color: var(--normal-gray);
      }
    }

    &:hover {
      background-color: var(--light-gray);
    }
  }
`;

const Professional = styled(PersonalInformation)``;

const Entertainment = styled(PersonalInformation)`
  .ent-heading {
    margin-bottom: 10px;
  }
`;
