import SliderUtil from "../../components/SliderUtil";
import { useGetNewMoviesQuery } from "../../redux/api/movies";
import { Link } from "react-router-dom";

const Header = () => {
  const { data } = useGetNewMoviesQuery();

  return (
    <div className="flex max-w-[100%] gap-0 mx-0 my-0 justify-between items-center mt-3">
      <nav className=" mx-0">
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

      <div className="md:w-[85%] ">
        <SliderUtil data={data} />
      </div>
    </div>
  );
};

export default Header;
