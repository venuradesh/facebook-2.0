import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import CloseIcon from "@mui/icons-material/Close";

function PostSender() {
  const container = useRef(null);
  const UploadPhoto = useRef(null);
  // const [previewPhotos, setPreviewPhoto] = useState([]);

  const onCloseClick = () => {
    container.current.classList.remove("active");
  };

  const onPhotoClick = () => {
    document.getElementById("photo-click").click();
  };

  const onChangePhoto = (e) => {
    const files = e.target.files;
    const path = UploadPhoto.current.value;
    console.log(path);
    if (files) {
      for (let i = 0; i < files.length; i++) {
        console.log(files[i]);
      }
    }
  };

  useEffect(() => {
    container.current.addEventListener("click", () => {
      container.current.classList.add("active");
    });
  }, []);

  return (
    <Container ref={container}>
      <div className="text-area">
        <textarea name="text" id="text" cols="30" rows="1" placeholder="What's on your mid, Venura?"></textarea>
        <div className="close" onClick={() => onCloseClick()}>
          <CloseIcon className="close-btn" />
        </div>
      </div>
      <div className="preview">
        <img src="" alt="photo-preview" />
      </div>
      <div className="items">
        <div className="live-item">
          <OnlinePredictionIcon className="live-icon icon" />
          <span>Live video</span>
        </div>
        <div className="photo-item" onClick={() => onPhotoClick()}>
          <input
            type="file"
            multiple="multiple"
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) => {
              onChangePhoto(e);
            }}
            ref={UploadPhoto}
            name="photo"
            id="photo-click"
          />
          <button id="photo">
            <InsertPhotoIcon className="photo-icon icon" />
            <span>Photo / Video</span>
          </button>
        </div>
        <div className="feeling-item">
          <EmojiEmotionsIcon className="feeling-icon icon" />
          <span>Feeling / Activity</span>
        </div>
        <div className="seperator"></div>
        <div className="room-item">
          <VideoCallIcon className="room-icon icon" />
          <span>Create a Room</span>
        </div>
      </div>
    </Container>
  );
}

export default PostSender;

const Container = styled.div`
  width: 100%;
  height: max-content;
  padding: 15px;
  background-color: var(--white);
  border-radius: var(--border-radius-s);
  display: flex;
  align-items: center;
  box-shadow: 0 3px 6px 0 var(--normal-gray);
  margin-bottom: 15px;

  &.active {
    display: block;

    .text-area {
      display: flex;
      position: relative;

      .close {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        margin-left: 20px;
        cursor: pointer;
        position: absolute;
        right: 0;
        background-color: var(--normal-gray);
        border-radius: 50%;

        .close-btn {
          font-size: 1rem;
          color: var(--dark-blue);
        }
      }

      textarea {
        height: 100px;
        padding-top: 30px;
      }
    }

    .items {
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: center;

      .live-item,
      .photo-item,
      .feeling-item,
      .room-item {
        width: 200px;
        display: flex;
        align-items: center;
        justify-content: center;

        #photo {
          display: flex;
          align-items: center;
          font-size: var(--font-size-s);
        }

        span {
          display: block;
          font-size: var(--font-size-s);
          font-weight: 600;
          margin-left: 5px;
        }
      }
      .live-item:hover {
        color: red;
      }

      .seperator {
        display: none;
      }
    }
  }

  .preview {
    display: none;
  }

  .text-area {
    flex: 1;

    .close {
      display: none;
    }

    textarea {
      width: 100%;
      padding: 15px;
      border-radius: var(--border-radius-s);
      border: none;
      background-color: var(--light-gray);
      outline: none;
      font-size: var(--font-size-n);
      color: var(--dark-blue);
      resize: none;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;

      &::-webkit-scrollbar {
        width: 0px;
      }

      &::placeholder {
        color: var(--normal-gray);
        font-size: var(--font-size-n);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
      }
    }
  }

  .items {
    display: flex;
    align-items: center;

    .icon {
      color: var(--dark-blue);
      font-size: 1.8rem;
    }

    .live-item,
    .photo-item,
    .feeling-item,
    .room-item {
      cursor: pointer;
      margin: 0 8px;

      span {
        display: none;
      }
    }

    .live-item {
      margin-left: 12px;
    }

    .live-item:hover {
      color: red;

      .live-icon {
        color: red;
      }
    }

    .live-icon {
      &:hover {
        color: red;
      }
    }

    .photo-item:hover {
      button {
        .photo-icon {
          color: #1ff05a;
        }

        span {
          color: #1ff05a;
        }
      }
    }

    .feeling-item:hover {
      color: #ffd817;

      .feeling-icon {
        color: #ffd817;
      }
    }

    .room-item {
      .room-icon {
        font-size: 2rem;
      }

      &:hover {
        color: #923b77;

        .room-icon {
          color: #923b77;
        }
      }
    }

    .photo-item {
      input {
        display: none;
      }

      button {
        background: none;
        border: none;
        cursor: pointer;
      }
    }

    .seperator {
      width: 1px;
      height: 40px;
      background-color: var(--light-gray);
      margin: 0 3px;
    }
  }
`;