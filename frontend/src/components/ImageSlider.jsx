import { useState, useEffect } from "react";

import picOne from "../assets/1.jpg";
import picTwo from "../assets/2.jpg";
import picThree from "../assets/3.jpg";

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [picOne, picTwo, picThree];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="h-full w-full transition duration-300 ease-in-out">
      <img
        className="w-[100%] h-[500px] object-cover transition duration-300 ease-in-out"
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
      />
    </div>
  );
};

export default ImageSlider;
