import ImageSlider from "../../components/ImageSlider";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div>
      <nav className=" py-2 flex fixed w-full top-0 right-0 z-20 bg-red-500">
        <div>
          {userInfo ? (
            <Link
              to="/"
              className=" p-1 mx-2 capitalize bg-white text-red-500 font-semibold rounded text-1xl cursor-default"
            >
              Welcome {userInfo.username}
            </Link>
          ) : (
            ""
          )}
        </div>

        <div className="ml-auto">
          <Link
            to="/"
            className="hover:underline pb-2 p-1 font-semibold rounded text-1xl"
          >
            Home
          </Link>
          <Link
            to="/movies"
            className="mx-3 rounded font-semibold text-1xl hover:underline pb-2"
          >
            Movies
          </Link>
        </div>
      </nav>

      <div className="w-[100%]">
        <ImageSlider />
      </div>
    </div>
  );
};

export default Header;
