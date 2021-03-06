import React, { useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
const API_URL = "http://localhost:8080/compare";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const passwordField = useRef(null);

  const onCloseClick = () => {
    document.getElementById("item-options").classList.remove("active");
  };

  const onOptionClick = () => {
    document.getElementById("item-options").classList.add("active");
  };

  const onCreateClick = () => {
    document.location.href = "/create";
  };

  const showPassword = () => {
    console.log(passwordField.current.type);
    if (passwordField.current.type === "password") passwordField.current.type = "text";
    else passwordField.current.type = "password";
  };

  const onLoginClick = () => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    axios
      .post(API_URL, formData, {
        headers: {
          "content-type": "multitype/form-data",
        },
      })
      .then((response) => {
        if (response.data.response) {
          document.getElementById("incorrectPassword").classList.remove("activated");
          document.location.href = `/${response.data.user.id}`;
        } else {
          document.getElementById("incorrectPassword").classList.add("activated");
        }
      });
  };

  const onAnchorClick = (e) => {
    e.preventDefault();
  };

  return (
    <Container>
      <div className="background"></div>
      <div className="overlay"></div>
      <div className="login-container">
        <div className="content">
          <div className="logo">
            <img src="/images/facebook.png" alt="facebook-logo" />
          </div>
          <div className="brand">
            <div className="name">acebook 2.0</div>
            <div className="desc">facebook helps you connect and share with the people in your life.</div>
          </div>
        </div>
        <div className="loginBox">
          <input type="text" className="text input" placeholder="Email address or phone number" onChange={(e) => setEmail(e.target.value)} />
          <div className="password-container">
            <input
              type="password"
              className="password input"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  onLoginClick();
                }
              }}
              ref={passwordField}
            />
            <img src="/images/eye.png" alt="show password" onClick={(e) => showPassword(e)} />
          </div>
          <span id="incorrectPassword">Username or password is incorrect</span>
          <button className="btn login" id="login-btn " type="submit" onClick={() => onLoginClick()}>
            Log in
          </button>
          <div className="forget-pwd">Forget Password?</div>
          <div className="seperator"></div>
          <button className="btn create" id="create-btn " onClick={() => onCreateClick()}>
            Create New Account
          </button>
          <div className="create-page">
            <img src="/images/facebook-page.png" alt="facebook page" />
            <p>
              <span>Create a Page</span> for celebrity, brand or business
            </p>
          </div>
        </div>
      </div>
      <Footer>
        <ul>
          <li>
            <a href="/lang" className="lang" onClick={(e) => onAnchorClick(e)}>
              English
            </a>
          </li>
          <li>
            <a href="/lang" className="lang" onClick={(e) => onAnchorClick(e)}>
              ???????????????
            </a>
          </li>
          <li>
            <a href="/lang" className="lang" onClick={(e) => onAnchorClick(e)}>
              ???????????????
            </a>
          </li>
          <li>
            <a href="/lang" className="lang" onClick={(e) => onAnchorClick(e)}>
              Espa??ol
            </a>
          </li>
          <li>
            <a href="/lang" className="lang" onClick={(e) => onAnchorClick(e)}>
              Deutsch
            </a>
          </li>
          <li>
            <a href="/lang" className="lang" onClick={(e) => onAnchorClick(e)}>
              Italiano
            </a>
          </li>
          <li>
            <a href="/lang" className="lang" onClick={(e) => onAnchorClick(e)}>
              Fran??ais (France)
            </a>
          </li>
          <li>
            <a href="/lang" className="lang" onClick={(e) => onAnchorClick(e)}>
              Portugu??s (Brasil)
            </a>
          </li>
          <li>
            <a href="/lang" className="lang" onClick={(e) => onAnchorClick(e)}>
              ?????????
            </a>
          </li>
        </ul>
        <div className="options" onClick={() => onOptionClick()}>
          Options
        </div>
      </Footer>
      <Options className="options" id="item-options">
        <div className="overlay" onClick={() => onCloseClick()}></div>
        <div className="item-container">
          <div className="close-btn">
            <img src="/images/wrong.png" onClick={() => onCloseClick()} alt="close btn" />
          </div>
          <div className="items">
            <ul>
              <li>Sign Up</li>
              <li>Log in</li>
              <li>Messenger</li>
              <li>Facebook lite</li>
              <li>Watch</li>
              <li>Places</li>
              <li>Games</li>
              <li>Marketplace</li>
              <li>Facebook play</li>
              <li>Jobs</li>
              <li>Oculus</li>
              <li>Portal</li>
              <li>Instagram</li>
              <li>Bulletin</li>
              <li>Local</li>
              <li>Fundraisers</li>
              <li>Services</li>
              <li>Voting Information centre</li>
              <li>Groups</li>
              <li>About</li>
              <li>Create Ad</li>
              <li>Create page</li>
              <li>Developers</li>
              <li>Careers</li>
              <li>Privacy</li>
              <li>Cookies</li>
              <li>Adchoices</li>
              <li>Terms</li>
              <li>Help</li>
            </ul>
          </div>
          <div className="copyrights">&copy; Venura Warnasooriya</div>
        </div>
      </Options>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  height: 100vh;
  max-height: 100vh;
  width: 100vw;
  max-width: 100vw;
  background-color: var(--blueish-gray);
  overflow: hidden;
  position: relative;

  .background {
    position: absolute;
    width: 80%;
    height: 100%;
    background-image: url("/images/login-cover.jpg");
    background-position: center;
    background-size: cover;
    object-fit: cover;
    background-repeat: no-repeat;
    background-color: var(--facebook-blue);
    background-blend-mode: multiply;
  }

  .overlay {
    position: absolute;
    width: 80%;
    height: 100%;
    background-color: var(--facebook-blue);
    opacity: 0.8;
  }

  .login-container {
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: space-between;
    top: 50%;
    transform: translateY(-60%);

    .content {
      display: flex;
      align-items: center;
      position: relative;
      left: 5%;

      .logo {
        img {
          width: 100px;
        }
      }

      .brand {
        cursor: default;
        position: relative;

        .name {
          font-size: 4rem;
          font-weight: 800;
          color: var(--white);
          position: relative;
          top: 7px;
        }

        .desc {
          width: 450px;
          font-size: var(--font-size-n);
          font-weight: 600;
          color: var(--white);
          position: relative;
          top: 5px;
        }
      }
    }

    .loginBox {
      width: 400px;
      background-color: var(--white);
      border-radius: var(--border-radius-s);
      box-shadow: 0 1px 9px 0 darkgray;
      transform: translateX(-27%);
      padding: 20px;
      display: flex;
      flex-direction: column;

      .password-container{
        width: 100%;
        position:relative;

        img{
          width: 25px;
          height: 25px;
          position:absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-30%);
          cursor:pointer;
          opacity: 0.5;
        }

        input{
          padding-right: 50px;
        }
      }

      .input {
        padding: 20px;
        width: 100%;
        outline: none;
        border: none;
        background-color: var(--light-gray);
        border-radius: var(--border-radius-s);
        margin-top: 15px;
        font-size: var(--font-size-n);

        &::placeholder {
          color: var(--normal-gray);
          font-weight: 700;
          font-size: var(--font-size-n);
        }

        &::-ms-reveal,
        &::-ms-clear{
          display:none;
        }
      }

      .btn {
        padding: 20px;
        border: none;
        outline: none;
        margin-top: 15px;
        border-radius: var(--border-radius-s);
        font-size: var(--font-size-n);
        font-weight: 700;
        color: var(--white);
        cursor:pointer;
        transition: all 0.3s ease;

        &.login {
          background-color: var(--facebook-blue);
          
          &:hover{
            background-color: var(--facebook-blue-hover);
          }
        }

        &.create{
          background-color var(--green);

          &:hover{
            background-color: var(--green-hover)
          }
        }
      }

      #incorrectPassword{
        display:none;

        &.activated{
          display:block;
          font-size: 0.7rem;
          text-align:center;
          color: var(--light-red);
          font-weight: 700;
          margin-top: 10px;
        }
      }

      .forget-pwd{
        font-size: var(--font-size-s);
        font-weight: 600;
        cursor:pointer;
        transition: all 0.3s ease;
        text-align:center;
        margin-top: 15px;

        &:hover{
          text-decoration: underline;
        }
      }

      .seperator{
        width: 300px;
        background-color: var(--dark-blue);
        border-bottom: 0.5px solid var(--light-gray);
        margin-top: 20px;
        position:relative;
        left: 50%;
        transform: translateX(-50%);
      }

      .create-page{
        display:flex;
        align-items:center;
        column-gap: 5px;
        justify-content:center;
        margin-top: 15px;

        img{
          width: 15px;
        }

        p{
          font-size: var(--font-size-s);

          span{
            font-weight: 700;
            cursor:pointer;

            &:hover{
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
`;

const Footer = styled.div`
  position: absolute;
  bottom: 35px;
  display: flex;
  justify-content: space-between;
  width: 100vw;

  ul {
    position: relative;
    left: 7%;
    display: flex;
    list-style: none;
    column-gap: 15px;

    li {
      a {
        color: var(--white);
        font-size: var(--font-size-s);

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .options {
    position: relative;
    right: 3%;
    font-size: var(--font-size-s);
    font-weight: 700;
    color: var(--dark-blue);
    cursor: pointer;
  }
`;

const Options = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  left: 0;
  visibility: hidden;

  &.active {
    visibility: visible;

    .overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(3px);
      background-color: rgba(0, 0, 0, 0.2);
    }

    .item-container {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: var(--white);
      box-shadow: 0 3px 6px 0 var(--dark-gray);
      overflow-y: auto;
      padding: 15px;
      animation: slideIn 0.3s ease-in-out forwards;

      &::-webkit-scrollbar {
        width: 5px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: var(--normal-gray);
        border-radius: 50px;
      }

      .close-btn {
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        img {
          width: 25px;
          height: 25px;
          cursor: pointer;
        }
      }

      .items {
        ul {
          list-style: none;

          li {
            margin: 5px 0px;
            color: var(--dark-gray);
            cursor: pointer;
            padding: 5px 15px;
            transition: backgroundColor 0.3s ease;

            &:hover {
              background-color: var(--light-gray);
            }
          }
        }
      }

      .copyrights {
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--font-size-s);
        color: var(--facebook-blue);
        font-weight: 700;
        cursor: default;
      }
    }

    @keyframes slideIn {
      0% {
        left: 100%;
      }

      100% {
        left: 80%;
      }
    }
  }
`;
