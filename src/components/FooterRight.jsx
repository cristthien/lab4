import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faCircleCheck,
  faHeart,
  faCommentDots,
  faBookmark,
  faShare,
  faVolumeMute,
  faVolumeUp,
  faTimes,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faThreads,
} from "@fortawesome/free-brands-svg-icons";
import "./FooterRight.css";

function FooterRight({
  likes,
  comments,
  saves,
  shares,
  profilePic,
  onAvatarChange,
  videoRef,
  videoUrl,
}) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [userAddIcon, setUserAddIcon] = useState(faCirclePlus);
  const [muted, setMuted] = useState(false);
  const [isSharePopupVisible, setIsSharePopupVisible] = useState(false);

  const handleUserAddClick = () => {
    setUserAddIcon(faCircleCheck);
    setTimeout(() => {
      setUserAddIcon(faCirclePlus); // Reset to original icon
    }, 3000);
  };

  const unmuteToggle = () => {
    setMuted((prevMuted) => {
      const newMuted = !prevMuted;
      if (videoRef?.current) {
        videoRef.current.muted = newMuted;
      }
      return newMuted;
    });
  };

  const parseLikesCount = (count) => {
    if (typeof count === "string") {
      if (count.endsWith("K")) {
        return parseFloat(count) * 1000;
      }
      return parseInt(count, 10) || 0; // Fallback to 0
    }
    return typeof count === "number" ? count : 0;
  };

  const formatLikesCount = (count) => {
    return count >= 10000 ? (count / 1000).toFixed(1) + "K" : count;
  };

  const handleSaveButton = () => {
    setSaved((previous) => {
      if (!previous) {
        navigator.clipboard
          .writeText(videoUrl)
          .then(() => {
            alert("Link is copied!");
          })
          .catch((err) => {
            console.error("Failed", err);
          });
      }
      return !previous;
    });
  };

  const handleLikeClick = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  const handleShareClick = () => {
    setIsSharePopupVisible(true);
  };

  const closeSharePopup = () => {
    setIsSharePopupVisible(false);
  };

  return (
    <div className="footer-right">
      <div className="sidebar-icon">
        {profilePic && (
          <img
            src={profilePic}
            className="userprofile"
            alt="Profile"
            style={{ width: "35px", height: "35px", color: "#616161" }}
            onClick={() => document.getElementById("avatar-input").click()}
          />
        )}
        <input
          type="file"
          accept="image/*"
          id="avatar-input"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = () => {
                onAvatarChange(reader.result);
              };
              reader.readAsDataURL(file);
            }
          }}
        />
        <FontAwesomeIcon
          icon={userAddIcon}
          className="userId"
          style={{ width: "15px", height: "15px", color: "#FF0000" }}
          onClick={handleUserAddClick}
        />
      </div>
      <div className="sidebar-icon">
        <FontAwesomeIcon
          icon={faHeart}
          style={{
            width: "35px",
            height: "35px",
            color: liked ? "#FF0000" : "white",
          }}
          onClick={handleLikeClick}
        />
        <p>{formatLikesCount(parseLikesCount(likes) + (liked ? 1 : 0))}</p>
      </div>
      <div className="sidebar-icon">
        <FontAwesomeIcon
          icon={faCommentDots}
          style={{ width: "25px", height: "25px", color: "white" }}
        />
        <p>{comments}</p>
      </div>
      <div className="sidebar-icon">
        <FontAwesomeIcon
          icon={faBookmark}
          style={{
            width: "25px",
            height: "25px",
            color: saved ? "#ffc107" : "white",
          }}
          onClick={handleSaveButton}
        />
        <p>{saved ? saves + 1 : saves}</p>
      </div>
      <div className="sidebar-icon">
        <FontAwesomeIcon
          icon={faShare}
          style={{ width: "25px", height: "25px", color: "white" }}
          onClick={handleShareClick}
        />
        <p>{shares}</p>
      </div>
      <div className="sidebar-icon">
        <FontAwesomeIcon
          icon={muted ? faVolumeMute : faVolumeUp}
          style={{ width: "25px", height: "25px", color: "white" }}
          onClick={unmuteToggle}
        />
        <p>{muted ? "Mute" : "Unmute"}</p>
      </div>
      <div className="sidebar-icon record">
        <img
          src="https://static.thenounproject.com/png/934821-200.png"
          alt="Record Icon"
          style={{ width: "25px", height: "25px" }}
        />
      </div>
      {isSharePopupVisible && (
        <div className="share-popup">
          <div className="share-popup-header">
            <FontAwesomeIcon
              icon={faTimes}
              className="close-popup"
              onClick={closeSharePopup}
            />
          </div>
          <div className="share-options">
            <button className="share-option">
              <FontAwesomeIcon icon={faFacebook} className="share-icon" />{" "}
              Facebook
            </button>
            <button className="share-option">
              <FontAwesomeIcon icon={faMessage} className="share-icon" />{" "}
              Message
            </button>
            <button className="share-option">
              <FontAwesomeIcon icon={faInstagram} className="share-icon" />{" "}
              Instagram
            </button>
            <button className="share-option">
              <FontAwesomeIcon icon={faThreads} className="share-icon" /> Thread
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FooterRight;
