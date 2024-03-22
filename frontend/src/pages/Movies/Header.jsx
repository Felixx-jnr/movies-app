import SliderUtil from "../../components/SliderUtil";
import Slideshow from "../../components/Slideshow";
import { useGetNewMoviesQuery } from "../../redux/api/movies";
import { Link } from "react-router-dom";

const Header = () => {
  const { data } = useGetNewMoviesQuery();

  return (
    <div className="">
      <nav className=" flex mx-0 text-right">
        <Link
          to="/"
          className=" transition duration-300 ease-in-out p-3 hover:bg-red-400 block rounded text-2xl"
        >
          Home
        </Link>
        <Link
          to="/movies"
          className="transition duration-300 ease-in-out p-3 hover:bg-red-400  block rounded text-2xl"
        >
          Browse Movies
        </Link>
      </nav>

      {/* <div>
        <h1>Video Slideshow</h1>
        <Slideshow />
      </div> */}

      <div className=" w-[1450px] ">
        <Slideshow />
      </div>
    </div>
  );
};

export default Header;
