import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div
      key={movie._id}
      className="relative group w-[100%]"
    >
      <Link
        to={`/movies/${movie._id}`}
        className="w-[100%] mx-0 px-0"
      >
        <img
          src={movie.image}
          alt={movie.name}
          className="w-[95%] h-[15rem] my-3 mx-3 object-cover rounded transition duration-300 ease-in-out transform group-hover:opacity-50"
        />
      </Link>

      <p className="absolute left-[2rem] right-0 bottom-5 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">
        {movie.name}
      </p>
    </div>
  );
};

export default MovieCard;
