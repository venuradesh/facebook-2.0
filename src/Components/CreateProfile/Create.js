import React from "react";
import styled from "styled-components";

const Create = () => {
  const onBackClick = () => {
    document.location.href = "/login";
  };

  return (
    <Container>
      <div className="back-button" onClick={() => onBackClick()}>
        <img src="/images/next.png" alt="back-btn" />
        <span>Back</span>
      </div>
      <SignUpContainer>
        <div className="header">
          <div className="title">Sign Up</div>
          <div className="sub">it's quick and easy.</div>
        </div>
        <BoxContainer>
          <div className="name-container">
            <input type="text" className="text-field" name="firstName" id="fname" placeholder="First Name" />
            <input type="text" className="text-field" name="firstName" id="fname" placeholder="Last Name" />
          </div>
          <input type="email" className="text-field" name="email" id="email" placeholder="Email" />
          <div className="mobile-password-container">
            <input type="text" className="text-field" name="phone-number" id="pnumber" placeholder="Phone number" />
            <input type="password" className="text-field" name="password" id="password" placeholder="New password" />
          </div>
          <DateGenderContainer>
            <div className="dob-container">
              <label for="dob">Date of birth</label>
              <input type="date" name="dob" id="dob" pattern="dd/mm/yyyy" />
            </div>
            <div className="gender-container">
              <label>Gender</label>
              <div className="radio-container">
                <input type="radio" name="gender" id="male" />
                <label htmlFor="gender">Male</label>
                <input type="radio" name="gender" id="female" />
                <label htmlFor="gender">Female</label>
                <input type="radio" name="gender" id="other" />
                <label htmlFor="gender">Other</label>
              </div>
            </div>
          </DateGenderContainer>
          <div className="policy-container">
            <p>
              By clicking Sign Up, you agree to our <span>Terms</span>, <span>Data Policy</span> and <span>Cookie Policy</span>. You may receive SMS notifications from us and can opt out at any time.
            </p>
          </div>
          <div className="btn-container">
            <input type="submit" value="Sign Up" />
          </div>
        </BoxContainer>
      </SignUpContainer>
    </Container>
  );
};

export default Create;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: relative;
  background-image: url("/images/login-cover.jpg");
  background-size: cover;
  background-position: center;
  z-index: 0;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    background-color: var(--facebook-blue);
    width: 100vw;
    height: 100vh;
    z-index: -1;
    opacity: 0.8;
  }

  .back-button {
    background-color: var(--white);
    height: 40px;
    width: 80px;
    border-radius: var(--border-radius-s);
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 20px;
    top: 20px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: var(--light-gray);
    }

    span {
      font-weight: 600;
    }

    img {
      width: 12px;
      height: 12px;
      transform: rotateZ(180deg);
      margin-right: 10px;
    }
  }
`;

const SignUpContainer = styled.div`
  width: 660px;
  height: 500px;
  padding: 15px;
  position: relative;
  top: 10%;

  .header {
    .title {
      font-size: 2.2rem;
      font-weight: 700;
      color: var(--white);
    }

    .sub {
      font-size: 0.8rem;
      color: var(--white);
      font-weight: 100;
      letter-spacing: 1px;
    }
  }
`;

const BoxContainer = styled.div`
  margin-top: 20px;
  background-color: var(--white);
  padding: 20px;
  padding-top: 40px;
  padding-bottom: 40px;
  border-radius: var(--border-radius-l);
  display: flex;
  flex-direction: column;
  row-gap: 15px;

  input {
    &::placeholder {
      color: var(--normal-gray);
    }
  }

  .text-field {
    padding: 15px;
    font-size: 1rem;
    flex: 1;
    border-radius: var(--border-radius-s);
    border: none;
    outline: none;
    background-color: var(--light-gray);
  }

  .name-container {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 15px;

    .text-field {
    }
  }

  .mobile-password-container {
    display: flex;
    column-gap: 15px;

    .text,
    .password {
      flex: 1;
    }
  }

  .policy-container {
    p {
      font-size: 0.8rem;
      color: var(--dark-gray);
      font-weight: 400;
      cursor: default;

      &::selection {
        background-color: transparent;
      }

      span {
        font-weight: 500;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }

        &::selection {
          background-color: transparent;
        }
      }
    }
  }

  .btn-container {
    input[type="submit"] {
      padding: 15px 50px;
      border-radius: var(--border-radius-s);
      border: none;
      outline: none;
      cursor: pointer;
      background-color: var(--green);
      color: var(--white);
      font-size: var(--font-size-l);
      font-weight: 700;

      &:hover {
        background-color: var(--green-hover);
      }
    }
  }
`;

const DateGenderContainer = styled.div`
  display: flex;
  column-gap: 15px;

  label {
    font-size: 1rem;
    font-weight: 600;
  }

  .dob-container {
    flex: 1;
    display: flex;
    flex-direction: column;

    input {
      padding: 15px;
      border: none;
      background-color: var(--light-gray);
      border-radius: var(--border-radius-s);
      margin-top: 8px;
      outline: none;
      color: var(--normal-gray);
      font-size: 1rem;
    }
  }

  .gender-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    row-gap: 25px;

    .radio-container {
      display: flex;
      column-gap: 10px;
      align-items: center;

      label {
        font-weight: 400;
      }

      input[type="radio"] {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        border: 2px solid var(--facebook-blue);
        border-radius: 50%;
        transition: all 0.1s ease;
        cursor: pointer;

        &:checked {
          border: 8px solid var(--facebook-blue);
        }
      }
    }
  }
`;
