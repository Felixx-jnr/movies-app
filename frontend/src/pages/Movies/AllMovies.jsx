import { useState } from "react";
import { useGetAllMoviesQuery } from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";
import MovieCard from "./MovieCard";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import banner from "../../assets/banner.jpg";
import {
  setMoviesFilter,
  setFilteredMovies,
  setMovieYears,
  setUniqueYears,
} from "../../redux/features/movies/moviesSlice";

const AllMovies = () => {
  const dispatch = useDispatch();
  const { data } = useGetAllMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: newMovies } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  const [selectedOption, setSelectedOption] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const { moviesFilter, filteredMovies } = useSelector((state) => state.movies);

  const movieYears = data?.map((movie) => movie.year);
  const uniqueYears = Array.from(new Set(movieYears));

  useEffect(() => {
    dispatch(setFilteredMovies(data || []));
    dispatch(setMovieYears(movieYears));
    dispatch(setUniqueYears(uniqueYears));
  }, [data, dispatch]);

  const handleSearchChange = (e) => {
    dispatch(setMoviesFilter({ searchTerm: e.target.value }));

    const filteredMovies = data.filter((movie) =>
      movie.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    dispatch(setFilteredMovies(filteredMovies));
  };

  const handleGenreClick = (genreId) => {
    dispatch(setMoviesFilter({ selectedYear: "all" }));
    setSelectedOption("all");
    setSelectedGenre(genreId);

    if (genreId === "all") {
      dispatch(setFilteredMovies(data));
    } else {
      const filterByGenre = data.filter((movie) => movie.genre === genreId);
      dispatch(setFilteredMovies(filterByGenre));
    }
  };

  //YEAR SELECT
  const handleYearChange = (year) => {
    setSelectedGenre("all");
    setSelectedOption("all");

    if (year === "all") {
      // If "All Movies" option is selected, reset the selected year filter
      dispatch(setFilteredMovies(data));
      dispatch(setMoviesFilter({ selectedYear: year }));
    } else {
      const filterByYear = data.filter(
        (movie) => movie.year === parseInt(year, 10)
      );
      dispatch(setFilteredMovies(filterByYear));
      // Update the selectedYear filter
      dispatch(setMoviesFilter({ selectedYear: year }));
    }
  };

  const handleSortChange = (sortOption) => {
    setSelectedGenre("all");
    dispatch(setMoviesFilter({ selectedYear: "all" }));

    switch (sortOption) {
      case "all":
        dispatch(setFilteredMovies(data));
        break;
      case "new":
        dispatch(setFilteredMovies(newMovies));
        break;
      case "top":
        dispatch(setFilteredMovies(topMovies));
        break;
      case "random":
        dispatch(setFilteredMovies(randomMovies));
        break;

      default:
        dispatch(setFilteredMovies([]));
        break;
    }
    setSelectedOption(sortOption);
  };

  return (
    <div className=" max sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 -translate-y-[5rem] mx-auto">
      <>
        <section>
          <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-repeat "
            style={{
              backgroundImage: `url(${banner})`,
              filter: "brightness(20%) blur(15px)",
            }}
          />
          <div
            className="relative h-[30rem] max-w-[100%] px-0 mb-10 flex items-center justify-center bg-cover mx-auto"
            style={{ backgroundImage: `url(${banner})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black opacity-60"></div>

            <div className="relative z-10 text-center text-white mt-[10rem]">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-4">
                The Movies Hub
              </h1>
              <p className="text-2xl">
                Cinematic Odyssey: Unveiling the Magic of Movies
              </p>
            </div>

            <section className=" w-[70%] text-center inline-block absolute mx-10 -bottom-[5rem]">
              <input
                type="text"
                className=" max-sm:w-[100%] w-[70%] py-2 max-sm:p-1 border px-1 outline-none rounded"
                placeholder="Search Movie"
                value={moviesFilter.searchTerm}
                onChange={handleSearchChange}
              />
              <section className="mt-3">
                <select
                  className="border w-[15%] p-2 max-sm:p-1 rounded text-black"
                  onChange={(e) => handleGenreClick(e.target.value)}
                  value={selectedGenre}
                >
                  <option value="all">All Genres</option>

                  {genres?.map((genre) => (
                    <option
                      key={genre._id}
                      value={genre._id}
                    >
                      {genre.name}
                    </option>
                  ))}
                </select>

                <select
                  className="border p-2 max-sm:p-1 rounded ml-4 text-black w-[15%]"
                  value={moviesFilter.selectedYear}
                  onChange={(e) => handleYearChange(e.target.value)}
                >
                  <option value="all">All Year</option>

                  {uniqueYears.map((year) => (
                    <option
                      key={year}
                      value={year}
                    >
                      {year}
                    </option>
                  ))}
                </select>

                <select
                  className="border w-[15%] p-2 max-sm:p-1 rounded ml-4 text-black"
                  value={selectedOption}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="new">New Movies</option>
                  <option value="top">Top Movies</option>
                  <option value="random">Random Movies</option>
                </select>
              </section>
            </section>
          </div>{" "}
          <section className="max-w-[60%] sm:max-w-[100%] mt-[6rem] w-[95%] grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 mx-auto">
            {filteredMovies?.map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
                className=""
              />
            ))}
          </section>
        </section>
      </>
    </div>
  );
};

export default AllMovies;
