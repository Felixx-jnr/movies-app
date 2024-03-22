import React, { useState } from "react";
import ReactPlayer from "react-player";
import videoOne from "../assets/1.mp4";
import videoTwo from "../assets/2.mp4";
import videoThree from "../assets/3.mp4";

const videos = [videoOne, videoTwo, videoThree];

const Slideshow = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleNext = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const handlePrev = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
  };

  const handleEnded = () => {
    handleNext();
  };

  return (
    <ReactPlayer
      width="100%"
      height="1000px"
      url={videos[currentVideoIndex]}
      playing
      onEnded={handleNext}
      muted
    />
  );
};

export default Slideshow;
