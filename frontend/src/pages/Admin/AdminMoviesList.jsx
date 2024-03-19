import { Link } from "react-router-dom";
import { useGetAllMoviesQuery } from "../../redux/api/movies";

const AdminMoviesList = () => {
  const { data: movies } = useGetAllMoviesQuery();

  return (
    <div className="mx-auto w-[90%] max-w-[90%] py-0">
      <div>
        <div className="p-0">
          <div className="ml-[2rem] text-3xl font-bold h-12 text-red-500">
            ALL MOVIES ({movies?.length})
          </div>

          <div className="grid grid-cols-3 gap-3 items-center w-[100%]">
            {movies?.map((movie) => (
              <Link
                key={movie._id}
                to={`/admin/movies/update/${movie._id}`}
                className="block mb-4"
              >
                <div className="flex">
                  <div className=" rounded">
                    <img
                      src={movie.image}
                      alt={movie.name}
                      className="w-screen h-[20rem] object-cover"
                    />
                    <div className="border rounded border-gray-400">
                      <div className=" text-red-500 text-xl">{movie.name}</div>
                    </div>

                    <p className="overflow-hidden h-20 text-gray-700 text-base">
                      {movie.detail}
                    </p>

                    <div className="text-center mt-1 mb-[1rem]">
                      <p
                        to={`/admin/movies/update/${movie._id}`}
                        className="inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Update Movie
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMoviesList;
