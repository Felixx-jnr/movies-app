import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieCard from "../pages/Movies/MovieCard";

const SliderUtil = ({ data }) => {
  const [slidesToShow, setSlidesToShow] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 700) {
        setSlidesToShow(2);
      } else if (window.innerWidth < 930) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(4);
      }
    };

    // Call handleResize initially and add resize event listener
    handleResize();
    window.addEventListener("resize", handleResize);

    // Clean up by removing the resize event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [slidesToShow]); // Include slidesToShow as a dependency

  const settings = {
    infinite: data?.length > slidesToShow,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    rtl: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  // const sliderData =
  //   data?.length === 1 ? [data[0], data[0], data[0], data[0]] : data;

  return (
    <div>
      <Slider {...settings}>
        {data?.map((movie) => (
          <div key={movie._id}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderUtil;
