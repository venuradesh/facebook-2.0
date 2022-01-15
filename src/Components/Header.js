import React from "react";
import styled from "styled-components";

function Header({ user }) {
  const itemContainer = [
    { name: "Home", status: "active", openThis: "" },
    { name: "Watch", status: "", openThis: "" },
    { name: "Market place", status: "", openThis: "" },
    { name: "Groups", status: "", openThis: "open" },
    { name: "Room", status: "", openThis: "open" },
  ];

  return (
    <Container>
      <LogoContainer>
        <img src="/images/favicon.png" alt="Facebook Logo" />
      </LogoContainer>
      <ItemContainer>
        {itemContainer.map((item, index) => (
          <div className={`item ${item.status} `} key={index}>
            <div className={`item-name ${item.openThis}`}>
              <p className={item.openThis}>{item.name}</p>
            </div>
          </div>
        ))}
      </ItemContainer>
      <ProfileContainer>
        <div className="notification open">
          <img src="/images/notification.png" alt="notification" />
        </div>
        <div className="profile-container" src={user.ProfilePic ? `http://localhost:8080/${user.ProfilePic}` : "/images/user.png"}></div>
      </ProfileContainer>
    </Container>
  );
}

export default Header;

const Container = styled.div`
  --header-height: 60px;

  position: fixed;
  left: var(--header-height);
  height: var(--header-height);
  width: calc(100vw - var(--header-height));
  background-color: var(--white);
  box-shadow: 0 3px 5px 0px lightgray;
  z-index: 10;
`;

const LogoContainer = styled.div`
  position: absolute;
  left: calc(0px - var(--header-height));
  width: var(--header-height);
  height: var(--header-height);
  background-color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 40px;
  }
`;

const ItemContainer = styled.div`
  width: max-content;
  position: absolute;
  left: calc(50% - 70px);
  transform: translateX(-50%);
  display: flex;

  .item {
    width: 140px;
    height: var(--header-height);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .item-name {
      position: relative;
      font-weight: 600;
      font-size: var(--font-size-s);
      width: 140px;
      text-align: center;
      padding: 15px 30px;
      border-radius: var(--border-radius-s);
      transition: all 0.3s ease;

      p {
        &.open::after {
          content: "";
          position: absolute;
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          top: 10px;
          background-color: var(--facebook-blue);
        }
      }
    }

    &.active::before {
      content: "";
      position: absolute;
      width: 140px;
      height: 3px;
      bottom: 0;
      background-color: var(--facebook-blue);
    }

    &:hover .item-name {
      background-color: var(--light-gray);
    }
  }
`;

const ProfileContainer = styled.div`
  --icon-size: 20px;

  position: absolute;
  right: 20px;
  display: flex;
  align-items: center;
  height: var(--header-height);

  .notification {
    margin-right: 20px;
    cursor: pointer;
    position: relative;

    img {
      width: var(--icon-size);
      transition: all 0.3s ease;
    }

    &:hover img {
      transform: scale(1.1);
    }

    &.open::after {
      content: "";
      position: absolute;
      width: 0.5rem;
      height: 0.5rem;
      background-color: var(--facebook-blue);
      border-radius: 50%;
      top: -10px;
    }
  }

  .profile-container {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-image: url(${(props) => props.children[1].props.src});
    background-size: cover;
    background-repeat: no-repeat;
    object-fit: cover;
    border: 2px solid var(--white);
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      border: 2px solid var(--facebook-blue);
    }
  }
`;
