import { useState } from "react";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";

import { useFetchGenresQuery } from "../../redux/api/genre";
import SliderUtil from "../../components/SliderUtil";

const MoviesContainerPage = () => {
  const { data } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
  };

  const filteredMovies = data?.filter(
    (movie) => selectedGenre === null || movie.genre === selectedGenre
  );

  return (
    <div className="">
      <section className="flex flex-col justify-center items-center mx-auto max-w-[95%]">
        <div className="mb-3 max-w-[100%] mx-10">
          <h1 className="mb-2 mt-10 text-center font-bold text-red-500 text-4xl">
            Choose Movie
          </h1>

          <nav className=" max-w-[80%] mx-auto flex flex-wrap justify-center mt-5">
            <button
              className={`transition duration-300 ease-in-out hover:bg-red-500 block p-2 rounded mb-[1rem] text-lg 
              }`}
              onClick={() => setSelectedGenre(null)}
            >
              {" "}
              All Genres
            </button>

            {genres?.map((g) => (
              <button
                key={g._id}
                className={`transition duration-300 ease-in-out hover:bg-red-500 block p-2 rounded mb-[1rem] text-lg ${
                  selectedGenre === g._id ? "bg-red-700" : ""
                }`}
                onClick={() => handleGenreClick(g._id)}
              >
                {g.name}
              </button>
            ))}
          </nav>

          <SliderUtil data={filteredMovies} />
        </div>

        <div className=" mb-2 max-w-[100%] mx-10">
          <h1 className="mb-5 mt-5 text-center font-bold text-red-500 text-4xl">
            Top Movies
          </h1>
          <SliderUtil data={topMovies} />
        </div>

        <div className=" mb-2 max-w-[100%] mx-10">
          <h1 className="mb-5 mt-5 text-center font-bold text-red-500 text-4xl">
            Choose For You
          </h1>
          <SliderUtil data={randomMovies} />
        </div>
      </section>
    </div>
  );
};

export default MoviesContainerPage;
