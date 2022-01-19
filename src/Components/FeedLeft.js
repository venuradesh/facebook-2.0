import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

function FeedLeft({ user }) {
  const [persClick, setPerseClick] = useState(false);
  const [profClick, setProfClick] = useState(false);
  const [entClick, setEntClick] = useState(true);
  const [socialClick, setSocialClick] = useState(false);
  const [previewCover, setPreviewCover] = useState("");
  const [previewProfile, setPreviewProfile] = useState("");
  const editProfile = useRef(null);
  const [firstName, setFirstName] = useState(user.FirstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio ? user.bio : "");
  const [job, setJob] = useState(user.works_at ? user.works_at : "");
  const [country, setCountry] = useState(user.country ? user.country : "");
  const [relationship, setRelationship] = useState(user.relationship ? user.relationship : "");
  const [dob, setDob] = useState(user.dob);
  const [dpPhoto, setDpPhoto] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const userId = useParams();
  let formData = new FormData();

  const onItemClick = (item) => {
    document.querySelector(`.${item}-next`).classList.toggle("active");
    if (document.querySelector(`.${item}-next`).classList.contains("active")) {
      if (item === "pers") setPerseClick(true);
      if (item === "prof") setProfClick(true);
      if (item === "social") setSocialClick(true);
      document.querySelector(`.${item}-heading`).style.marginBottom = "10px";
    } else {
      if (item === "pers") setPerseClick(false);
      if (item === "prof") setProfClick(false);
      if (item === "social") setSocialClick(false);
      document.querySelector(`.${item}-heading`).style.marginBottom = "0px";
    }
  };

  useEffect(() => {
    console.log(user.profilePic);
    console.log(user.cover);
  });

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

  const onEditProfileClick = () => {
    editProfile.current.classList.toggle("activated");
  };

  const onUpdateProfilePic = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setPreviewProfile(reader.result);
      document.getElementById("profilePicture").classList.add("previewProfile");
    };
    setDpPhoto(e.target.files[0]);
  };

  const onUpdateCover = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setPreviewCover(reader.result);
      document.getElementById("coverPhoto").classList.add("previewCover");
    };
    setCoverPhoto(e.target.files[0]);
  };

  const onUpdateClick = (e) => {
    console.log(dpPhoto ? console.log(user.cover) : console.log(user.ProfilePic));
    e.preventDefault();
    formData.append("id", userId.id);
    formData.append("FirstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("bio", bio);
    formData.append("works_at", job);
    formData.append("country", country);
    formData.append("dob", dob);
    formData.append("relationship", relationship);

    dpPhoto ? formData.append("profilePic", dpPhoto, dpPhoto.name) : formData.append("profilePic", user.ProfilePic);
    coverPhoto ? formData.append("coverPhoto", coverPhoto, coverPhoto.name) : formData.append("coverPhoto", user.cover);

    axios
      .put("http://localhost:8080/update", formData, {
        headers: {
          "content-type": "multimedia/form-data",
        },
      })
      .then((response) => {
        formData = new FormData();
        onEditProfileClick();
        // document.location.reload();
      });
  };

  return (
    <>
      <EditProfile className="" ref={editProfile}>
        <div id="background" className="background" onClick={() => onEditProfileClick()}></div>
        <div className="box">
          <div className="title">Update your profile</div>
          <ProfilePicContainer className="profile-cover-pic-container">
            {previewProfile ? (
              <>
                <img className="profile-pic-container" alt="profile" id="profilePicture" src={previewProfile} onClick={() => document.getElementById("profile-photo").click()} />
                <input type="file" name="profile-photo" id="profile-photo" accept="image/jpg, image/jpeg" onChange={(e) => onUpdateProfilePic(e)} />
              </>
            ) : (
              <div className="profile-pic-container" onClick={() => document.getElementById("profile-photo").click()}>
                <div className="upload">
                  Click here to upload your <span>profile photo</span>
                </div>
                <input type="file" name="profile-photo" id="profile-photo" accept="image/jpg, image/jpeg" onChange={(e) => onUpdateProfilePic(e)} />
              </div>
            )}
            {previewCover ? (
              <>
                <img className="cover-pic-container" id="coverPhoto" alt="cover" src={previewCover} onClick={() => document.getElementById("cover-photo").click()} />
                <input type="file" name="cover-photo" id="cover-photo" accept="image/jpg, image/jpeg" onChange={(e) => onUpdateCover(e)} />
              </>
            ) : (
              <div className="cover-pic-container" onClick={() => document.getElementById("cover-photo").click()}>
                <div className="upload">
                  Click here to upload your <span>cover photo</span>
                </div>
                <input type="file" name="cover-photo" id="cover-photo" accept="image/jpg, image/jpeg" onChange={(e) => onUpdateCover(e)} />
              </div>
            )}
          </ProfilePicContainer>
          <div className="name-container">
            <input type="text" name="firstName" id="firstName" placeholder={user.FirstName} onChange={(e) => setFirstName(e.target.value)} />
            <input type="text" name="lastName" id="lastName" placeholder={user.lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div className="bio-container">
            <input type="text" name="bio" id="bio" placeholder="Simply describe you" onChange={(e) => setBio(e.target.value)} />
          </div>
          <div className="works-at">
            <input type="text" name="works at" id="works-at" placeholder="Works at ..." onChange={(e) => setJob(e.target.value)} />
            <input type="date" name="dob" id="dob" pattern="dd/mm/yyyy" value={dob} onChange={(e) => setDob(e.target.value)} />
          </div>
          <div className="country-relationship-container">
            <input type="text" name="country" id="country" placeholder="Enter Your Country" onChange={(e) => setCountry(e.target.value)} />
            <select name="relationships" default="single" onChange={(e) => setRelationship(e.target.value)}>
              <option value="single" id="single">
                Single
              </option>
              <option id="inARelationship" value="in a relationship">
                In a relationship
              </option>
              <option id="married" value="married">
                Married
              </option>
            </select>
          </div>
          <div className="email-container">
            <input type="email" name="email" id="email" placeholder={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="btn-container">
            <input type="submit" value="Update" onClick={(e) => onUpdateClick(e)} />
          </div>
        </div>
      </EditProfile>
      <Container>
        <ProfilePreview>
          <div className="cover-container" src={user.cover ? `http://localhost:8080/${user.cover}` : "/images/cover-default.png"}></div>
          <div className="dp-container" src={user.ProfilePic ? `http://localhost:8080/${user.ProfilePic}` : "/images/user.png"}></div>
          <div className="text-container">
            <div className="title">
              {user.FirstName} {user.lastName}
            </div>
            <div className="headline">{user.bio ? user.bio : ""}</div>
            <div className="location">{user.location ? user.location : ""}</div>
            <div className="last-update">Last update </div>
          </div>
          <div className="edit-profile" onClick={() => onEditProfileClick()}>
            Edit Profile
          </div>
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
        <Social>
          <div className="heading social-heading" onClick={() => onItemClick("social")}>
            social
            <img className="social social-next" src="/images/next.png" alt="social-next" />
          </div>
          {socialClick ? (
            <>
              <div className="items">
                <img src="/images/events.png" alt="events" />
                <div className="text-content">
                  <div className="name">Events</div>
                  <div className="desc">Organize or find events and other things to do online and nearby</div>
                </div>
              </div>
              <div className="items">
                <img src="/images/friends-clr.png" alt="events" />
                <div className="text-content">
                  <div className="name">Friends</div>
                  <div className="desc">Search for or people may know</div>
                </div>
              </div>
              <div className="items">
                <img src="/images/groups-clr.png" alt="events" />
                <div className="text-content">
                  <div className="name">Groups</div>
                  <div className="desc">Connect with people who share your interests</div>
                </div>
              </div>
              <div className="items">
                <img src="/images/newsfeed.png" alt="events" />
                <div className="text-content">
                  <div className="name">News Feed </div>
                  <div className="desc">See relavant posts from people and pages that you follow</div>
                </div>
              </div>
              <div className="items">
                <img src="/images/pages-clr.png" alt="events" />
                <div className="text-content">
                  <div className="name">Pages</div>
                  <div className="desc">Discover and connect with business on facebook</div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </Social>
      </Container>
    </>
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
  top: 60px;
  left: 60px;
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

const EditProfile = styled.div`
  display: none;

  &.activated {
    display: block;
    position: fixed;
    width: calc(100vw - 60px);
    height: calc(100vh - 60px);
    z-index: 1;

    .background {
      width: 100%;
      height: 100%;
      background-color: black;
      opacity: 0.3;
    }

    .box {
      width: 600px;
      height: 600px;
      background-color: var(--white);
      box-shadow: 0px 0px 5px 1px gray;
      position: absolute;
      top: 50%;
      left: calc(54% - 60px);
      transform: translate(-50%, -50%);
      border-radius: var(--border-radius-s);
      overflow-y: overlay;
      overflow-hidden;
      padding: 20px;

      &::-webkit-scrollbar {
        width: 5px;
      }

      .title {
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--dark-blue);
        text-align: center;
      }

      .profile-cover-pic-container {
        
      }

      input[type="text"],
      input[type="email"],
      input[type="date"],
      select {
        background-color: var(--light-gray);
        padding: 15px;
        flex: 1;
        border: none;
        border-radius: var(--border-radius-s);
        font-size: 1rem;
        outline: none;
      }

      select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }

      .name-container,
      .bio-container,
      .works-at,
      .country-relationship-container,
      .email-container {
        display: flex;
        margin-top: 15px;
        column-gap: 15px;
      }

      .btn-container {
        margin-top: 15px;
        display: flex;
        justify-content: center;

        input[type="submit"] {
          padding: 15px 50px;
          border: none;
          background-color: var(--green);
          border-radius: var(--border-radius-s);
          color: var(--white);
          font-size: 1rem;
          cursor:pointer;
        }
      }
    }
  }
`;

const ProfilePicContainer = styled.div`
  width: 100%;
  height: 250px;
  margin-top: 25px;
  display: flex;
  align-items: center;
  column-gap: 15px;

  .profile-pic-container,
  .cover-pic-container {
    flex: 1;
    width: 260px;
    height: 250px;
    display: flex;
    align-items: center;
    border: 4px dashed var(--facebook-blue);
    background-color: #63a6e0;
    cursor: pointer;

    .upload {
      font-size: 1.3rem;
      text-align: center;
      opacity: 0.7;
      color: var(--white);

      span {
        font-weight: 700;
      }
    }
  }
  input {
    display: none;
  }

  .previewProfile,
  .previewCover {
    border: none;
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

const Social = styled(PersonalInformation)``;
