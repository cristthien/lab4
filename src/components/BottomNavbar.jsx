import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUserFriends,
  faPlus,
  faInbox,
  fa7,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

function BottomNavbar() {
  return (
    <div className="bottom-navbar">
      <div className="nav-item">
        <FontAwesomeIcon
          icon={faHouse}
          className="icon active"
        ></FontAwesomeIcon>
        <span className="item-name active"> Home</span>
      </div>
      <div className="nav-item">
        <FontAwesomeIcon
          icon={faUserFriends}
          className="icon"
        ></FontAwesomeIcon>
        <span className="item-name"> Friend</span>
      </div>
      <div className="nav-item">
        <FontAwesomeIcon icon={faPlus} className="icon plus"></FontAwesomeIcon>
        <span className="item-name"> Create</span>
      </div>
      <div className="nav-item">
        <FontAwesomeIcon icon={fa7} className="notification"></FontAwesomeIcon>
        <FontAwesomeIcon icon={faInbox} className="icon"></FontAwesomeIcon>
        <span className="item-name">Inbox</span>
      </div>
      <div className="nav-item">
        <FontAwesomeIcon icon={faUser} className="icon"></FontAwesomeIcon>
        <span className="item-name">Profile</span>
      </div>
    </div>
  );
}

export default BottomNavbar;
