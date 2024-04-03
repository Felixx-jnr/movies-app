import { useState, useEffect } from "react";

import picOne from "../assets/1.jpg";
import picTwo from "../assets/2.jpg";
import picThree from "../assets/3.jpg";
import picFour from "../assets/4.jpg";
import picFive from "../assets/5.jpg";
import picSix from "../assets/6.jpg";
import picSeven from "../assets/7.jpg";

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [picOne, picTwo, picThree, picFour, picFive, picSix, picSeven];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className=" h-full w-full">
      <img
        className="w-[100%] h-[500px] object-cover transition duration-300 ease-in-out"
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
      />
    </div>
  );
};

export default ImageSlider;
