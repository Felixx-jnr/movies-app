import ImageSlider from "../../components/ImageSlider";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <nav className=" py-2 text-right fixed block w-full top-0 right-0 z-20 bg-red-500">
        <Link
          to="/"
          className="transition duration-300 ease-in-out p-1 mx-4 bg-white text-red-500 font-semibold rounded text-1xl"
        >
          Home
        </Link>
        <Link
          to="/movies"
          className="transition duration-300 p-1 mx-3 rounded font-semibold text-1xl "
        >
          Browse Movies
        </Link>
      </nav>

      <div className="">
        <ImageSlider />
      </div>
    </div>
  );
};

export default Header;
