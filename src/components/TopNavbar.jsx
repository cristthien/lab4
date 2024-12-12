import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTv, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

const TopNavbar = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false); // Track search visibility

  // When search input changes, call onSearch
  useEffect(() => {
    if (searchInput === "") {
      onSearch(""); // If the search input is empty, reset search results
    }
  }, [searchInput, onSearch]);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      if (onSearch) {
        onSearch(searchInput); // Call onSearch with the search input
      }
    }
  };

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
  };

  const closeSearch = () => {
    setIsSearchActive(false); // Hide search bar
    setSearchInput(""); // Clear the search input immediately when closing
  };

  return (
    <div className="top-navbar">
      {/* faTv icon only displays when the search bar is hidden */}
      {!isSearchActive && <FontAwesomeIcon icon={faTv} className="icon" />}

      {!isSearchActive && (
        <h2>
          Following | <span>For You</span>
        </h2>
      )}

      {/* Search icon, visible when the search bar is hidden */}
      {!isSearchActive && (
        <div className="search-icon" onClick={toggleSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </div>
      )}

      {/* Search input, visible when the search bar is toggled */}
      {isSearchActive && (
        <div className="search-container">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            value={searchInput}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyPress}
            placeholder="Search"
            className="search-input"
          />
          <FontAwesomeIcon
            icon={faTimes}
            className="close-icon"
            onClick={closeSearch} // Close search bar and clear the search input
          />
        </div>
      )}
    </div>
  );
};

export default TopNavbar;
