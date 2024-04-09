import SecondaryCard from "./SecondaryCard";
import VideoCard from "./VideoCard";

import {
  useGetTopMoviesQuery,
  useGetAllMoviesQuery,
} from "../../../../redux/api/movies";
import { useGetUsersQuery } from "../../../../redux/api/users";

const Main = () => {
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: visitors } = useGetUsersQuery();
  const { data: allMovies } = useGetAllMoviesQuery();

  const totalCommentsLength = allMovies
    ?.map((m) => m.numReviews)
    .filter((length) => typeof length === "number" && !isNaN(length));

  const sumOfCommentsLength = totalCommentsLength?.reduce(
    (acc, length) => acc + length,
    0
  );

  return (
    <div className=" mx-auto max-w-[98%]">
      <section className="mx-auto max-w-[98%] ">
        <div className="text-center">
          <div className="flex max-sm:block justify-center">
            <SecondaryCard
              pill="Users"
              content={visitors?.length}
              gradient="from-red-500 to-red-200"
            />
            <SecondaryCard
              className="text-center justify-center"
              pill="Comments"
              content={sumOfCommentsLength}
              gradient="from-red-500 to-red-300"
            />
            <SecondaryCard
              pill="Movies"
              content={allMovies?.length}
              gradient="from-red-500 to-red-200"
            />
          </div>

          <div className=" flex text-white mt-10 font-semibold max-w-[100%]">
            <p className="text-2xl sm:text-2xl md:text-2xl lg:text-2xl">
              Top Content
            </p>
            <p className="ml-auto text-2xl sm:text-2xl md:text-2xl lg:text-2xl">
              Comments
            </p>
          </div>

          {topMovies?.map((movie) => (
            <VideoCard
              key={movie._id}
              image={movie.image}
              title={movie.name}
              date={movie.year}
              comments={movie.numReviews}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Main;
