import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import VideoCard from "./components/VideoCard";
import BottomNavbar from "./components/BottomNavbar";
import TopNavbar from "./components/TopNavbar";
import ProfileHeader from "./components/ProfileHeader";
import VideoGrid from "./components/VideoGrid";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// This array holds information about different videos
const videoUrls = [
  {
    url: require("./videos/video1.mp4"),
    profilePic: "https://example.com/new-profile-pic1.jpg",
    username: "csjackie",
    description: "Lol nvm #compsci #chatgpt #ai #openai #techtok",
    song: "Original sound - Famed Flames",
    likes: 430,
    comments: 13,
    saves: 23,
    shares: 1,
  },
  {
    url: require("./videos/video2.mp4"),
    profilePic: "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/eace3ee69abac57c39178451800db9d5~c5_100x100.jpeg?x-expires=1688479200&x-signature=wAkVmwL7lej15%2B16ypSWQOqTP8s%3D",
    username: "dailydotdev",
    description:
      "Every developer brain @francesco.ciulla #developerjokes #programming #programminghumor #programmingmemes",
    song: "tarawarolin wants you to know this isnt my sound - Chaplain J Rob",
    likes: "13.4K",
    comments: 3121,
    saves: 254,
    shares: 420,
  },
  {
    url: require("./videos/video3.mp4"),
    profilePic: "https://p77-sign-va.tiktokcdn.com/tos-maliva-avt-0068/4e6698b235eadcd5d989a665704daf68~c5_100x100.jpeg?x-expires=1688479200&x-signature=wkwHDKfNuIDqIVHNm29%2FRf40R3w%3D",
    username: "wojciechtrefon",
    description: "#programming #softwareengineer #vscode #programmerhumor #programmingmemes",
    song: "help so many people are using my sound - Ezra",
    likes: 5438,
    comments: 238,
    saves: 12,
    shares: 117,
  },
  {
    url: require("./videos/video4.mp4"),
    profilePic: "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/4bda52cf3ad31c728153859262c329db~c5_100x100.jpeg?x-expires=1688486400&x-signature=ssUbbCpZFJj6uj33D%2BgtcqxMvgQ%3D",
    username: "faruktutkus",
    description:
      "Wait for the end | Im RTX 4090 TI | #softwareengineer #softwareengineer #coding #codinglife #codingmemes ",
    song: "orijinal ses - Computer Science",
    likes: 9689,
    comments: 230,
    saves: 1037,
    shares: 967,
  },
];

function App() {
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filteredVideos, setFilteredVideos] = useState([]); // State để lưu video đã lọc
  const videoRefs = useRef([]);

  useEffect(() => {
    setVideos(videoUrls);
    setFilteredVideos(videoUrls); // Mặc định hiển thị tất cả video
  }, []);

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

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // We observe each video reference to trigger play/pause
    videoRefs.current.forEach((videoRef) => {
      observer.observe(videoRef);
    });

    // We disconnect the observer when the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, [videos]);

  // Hàm điều hướng video
  const changeVideo = (direction) => {
    if (direction === "prev" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === "next" && currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Hàm xử lý video ref
  const handleVideoRef = (index) => (ref) => {
    videoRefs.current[index] = ref;
  };

  // Hàm sao chép URL video
  const copyVideoUrl = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      alert("URL has been copied to clipboard!");
    }).catch((err) => {
      console.error("Failed to copy URL:", err);
    });
  };

  // Hàm tìm kiếm video theo hashtag
  const handleSearch = (hashtag) => {
    if (!hashtag) {
      setFilteredVideos(videos); // Nếu không có hashtag, hiển thị tất cả video
      return;
    }
    const filtered = videos.filter((video) =>
      video.description.includes(hashtag)
    );
    setFilteredVideos(filtered); // Cập nhật video đã lọc
  };

  return (
    <div className="app">
      <div className="container">
        <TopNavbar className="top-navbar" onSearch={handleSearch} />
        {/* Here we map over the filteredVideos array and create VideoCard components */}
        {filteredVideos.map((video, index) => (
          <VideoCard
            key={index}
            username={video.username}
            description={video.description}
            song={video.song}
            likes={video.likes}
            saves={video.saves}
            comments={video.comments}
            shares={video.shares}
            url={video.url}
            profilePic={video.profilePic}
            setVideoRef={handleVideoRef(index)}
            autoplay={index === 0}
            changeVideo={changeVideo} // Truyền hàm changeVideo vào VideoCard
            copyVideoUrl={copyVideoUrl} // Truyền hàm sao chép URL vào VideoCard
            videoUrl={video.url}
          />
        ))}
        <BottomNavbar className="bottom-navbar" />
      </div>



      <div className="app">
        <ProfileHeader />
        <VideoGrid />
      </div>
    </div>

    
  );
}

export default App;