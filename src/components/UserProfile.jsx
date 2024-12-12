import React from "react";
import "./UserProfile.css"; // Import file CSS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function UserProfile({
  username,
  followers,
  following,
  likes,
  profilePic,
  onFollow,
  onMessage,
  contactInfo,
  videos = [],
}) {
  return (
    <div className="user-profile">
      <div className="iconwwrapper">
        <FontAwesomeIcon icon={faArrowLeft} className="back-arrow" />
      </div>
      <div className="profile-header">
        <img src={profilePic} alt="Profile" className="profile-pic" />
        <h3>{username}</h3>
      </div>
      <div className="profile-stats">
        <div className="stat">
          <span className="stat-number">{followers}</span>
          <span className="stat-label">Followers</span>
        </div>
        <div className="stat">
          <span className="stat-number">{following}</span>
          <span className="stat-label">Following</span>
        </div>
        <div className="stat">
          <span className="stat-number">{likes}</span>
          <span className="stat-label">Likes</span>
        </div>
      </div>
      <div className="profile-actions">
        <button className="follow-btn" onClick={onFollow}>
          Follow
        </button>
        <button className="message-btn" onClick={onMessage}>
          Message
        </button>
      </div>
      <div className="contact-info">
        <h4>Contact Information</h4>
        <p>{contactInfo}</p>
      </div>
      <div className="user-videos">
        <h4>Videos</h4>
        <div className="videos-grid">
          {videos.map((video, index) => (
            <video
              key={index}
              src={video.url}
              controls
              className="video-item"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
