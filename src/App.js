import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import VideoCard from "./components/VideoCard";
import BottomNavbar from "./components/BottomNavbar";
import TopNavbar from "./components/TopNavbar";
import UserProfile from "./components/UserProfile"; // Import UserProfile component
import { useSwipeable } from "react-swipeable"; // Import thư viện react-swipeable

// This array holds information about different videos
const videoUrls = [
  {
    url: require("./videos/video1.mp4"),
    username: "csjackie",
    description: "Lol nvm #compsci #chatgpt #ai #openai #techtok",
    song: "Original sound - Famed Flames",
    likes: 430,
    comments: 13,
    saves: 23,
    shares: 1,
    followers: 1000,
    following: 200,
    videos: [
      { url: require("./videos/video1.mp4") },
      { url: require("./videos/video2.mp4") },
    ],
  },
  {
    url: require("./videos/video2.mp4"),
    username: "dailydotdev",
    description:
      "Every developer brain @francesco.ciulla #developerjokes #programming #programminghumor #programmingmemes",
    song: "tarawarolin wants you to know this isnt my sound - Chaplain J Rob",
    likes: "13.4K",
    comments: 3121,
    saves: 254,
    shares: 420,
    followers: 5000,
    following: 300,
    videos: [
      { url: require("./videos/video3.mp4") },
      { url: require("./videos/video4.mp4") },
    ],
  },
  {
    url: require("./videos/video3.mp4"),
    username: "wojciechtrefon",
    description:
      "#programming #softwareengineer #vscode #programmerhumor #programmingmemes",
    song: "help so many people are using my sound - Ezra",
    likes: 5438,
    comments: 238,
    saves: 12,
    shares: 117,
    followers: 2000,
    following: 150,
    videos: [
      { url: require("./videos/video1.mp4") },
      { url: require("./videos/video2.mp4") },
    ],
  },
  {
    url: require("./videos/video4.mp4"),
    username: "faruktutkus",
    description:
      "Wait for the end | Im RTX 4090 TI | #softwareengineer #softwareengineer #coding #codinglife #codingmemes ",
    song: "orijinal ses - Computer Science",
    likes: 9689,
    comments: 230,
    saves: 1037,
    shares: 967,
    followers: 8000,
    following: 400,
    videos: [
      { url: require("./videos/video3.mp4") },
      { url: require("./videos/video4.mp4") },
    ],
  },
];

function App() {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [index, setindex] = useState(0);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const videoRefs = useRef([]);
  const [profilePic, setProfilePic] = useState(
    "https://www.cayxanhdep.vn/uploads/products/1_Co_Tham_Nhung_Nhat.jpg"
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        setShowUserProfile(true);
      } else if (event.key === "ArrowLeft") {
        setShowUserProfile(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    setVideos(videoUrls);
  }, []);

  const handleAvatarUpdate = (newAvatar) => {
    setProfilePic(newAvatar); // Update the global avatar state
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.8, // Adjust this value to change the scroll trigger point
    };

    // This function handles the intersection of videos
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const videoElement = entry.target;
          videoElement.play();
        } else {
          const videoElement = entry.target;
          videoElement.pause();
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    // We observe each video reference to trigger play/pause
    videoRefs.current.forEach((videoRef) => {
      observer.observe(videoRef);
    });

    // We disconnect the observer when the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, [videos]);

  // This function handles the reference of each video
  const handleVideoRef = (index) => (ref) => {
    videoRefs.current[index] = ref;
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
  };

  // Filter videos based on the search query
  const selectedVideo = videos.filter(
    (video) =>
      video.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle swipe event to switch user profiles
  const handlers = useSwipeable({
    onSwipedLeft: () => setShowUserProfile(true), // Swipe left opens the profile
    onSwipedRight: () => setShowUserProfile(false), // Swipe right closes the profile
    onSwipedUp: () => {
      const container = document.getElementById("primaryView");
      container.scrollBy({
        top: container.clientHeight * 0.8, // Cuộn 80% chiều cao của container
        behavior: "smooth", // Cuộn mượt mà
      });
    }, // Swipe up logs "up"
    onSwipedDown: () => {
      const container = document.getElementById("primaryView");
      container.scrollBy({
        top: -container.clientHeight * 0.8, // Cuộn 80% chiều cao của container
        behavior: "smooth", // Cuộn mượt mà
      });
    }, // Swipe down logs "down"
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
    onTouchStart: (e) => {
      const startX = e.touches[0].clientX;
      const startY = e.touches[0].clientY;
      const handleTouchMove = (moveEvent) => {
        const moveX = moveEvent.touches[0].clientX;
        const moveY = moveEvent.touches[0].clientY;

        // Prevent vertical scroll only when it's a vertical move (up/down)
        if (Math.abs(moveX - startX) < Math.abs(moveY - startY)) {
          // Disable vertical scroll
          moveEvent.preventDefault();
        }
      };

      // Bind touch move handler
      e.target.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
    },
  });

  return (
    <div className="app" {...handlers}>
      <div className="container" id="primaryView">
        {!showUserProfile && (
          <TopNavbar onSearch={handleSearch} className="top-navbar" />
        )}
        {!showUserProfile && (
          <input
            type="text"
            placeholder="Search videos..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-bar"
          />
        )}
        {/* Toggle between video cards and user profile */}
        {showUserProfile
          ? selectedVideo[index] && (
              <UserProfile
                username={selectedVideo[index].username}
                followers={selectedVideo[index].followers || 0}
                following={selectedVideo[index].following || 0}
                likes={selectedVideo[index].likes}
                profilePic={profilePic}
                onFollow={() => console.log("Follow")}
                onMessage={() => console.log("Message")}
                contactInfo="Email: user@example.com"
                videos={selectedVideo[index].videos || []}
              />
            )
          : selectedVideo.map((video, i) => (
              <VideoCard
                key={i}
                username={video.username}
                description={video.description}
                song={video.song}
                likes={video.likes}
                saves={video.saves}
                comments={video.comments}
                shares={video.shares}
                url={video.url}
                profilePic={profilePic}
                setVideoRef={handleVideoRef(index)}
                autoplay={i === index}
                onAvatarUpdate={handleAvatarUpdate}
                onVideoClick={() => setindex(index)}
              />
            ))}
        {!showUserProfile && <BottomNavbar className="bottom-navbar" />}
      </div>
    </div>
  );
}

export default App;
