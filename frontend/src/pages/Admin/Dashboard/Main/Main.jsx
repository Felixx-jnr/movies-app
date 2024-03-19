import SecondaryCard from "./SecondaryCard";
import VideoCard from "./VideoCard";
import RealTimeCard from "./RealTimeCard";

import {
  useGetTopMoviesQuery,
  useGetAllMoviesQuery,
} from "../../../../redux/api/movies";
import { useGetUsersQuery } from "../../../../redux/api/users";

const Main = () => {
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: visitors } = useGetUsersQuery();
  const { data: allMovies } = useGetAllMoviesQuery();

  const totalCommentsLength = allMovies?.map((m) => m.numReviews);
  const sumOfCommentsLength = totalCommentsLength?.reduce(
    (acc, length) => acc + length,
    0
  );

  return (
    <div className="max-w-[90%]">
      <section className="justify-around ">
        <div className="">
          <div className="flex -translate-x-4 ml-72 ">
            <SecondaryCard
              pill="Users"
              content={visitors?.length}
              info="20.2k more then usual"
              gradient="from-red-500 to-red-200"
            />
            <SecondaryCard
              pill="Comments"
              content={sumOfCommentsLength}
              info="742.8 more then usual"
              gradient="from-red-500 to-red-300"
            />
            <SecondaryCard
              pill="Movies"
              content={allMovies?.length}
              info="372+ more then usual"
              gradient="from-red-500 to-red-200"
            />
          </div>
          <div className=" flex text-4xl text-white mt-10 font-semibold max-w-[50%] mx-auto">
            <p>Top Content</p>
            <p className="ml-auto">Comments</p>
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

        <div>
          <RealTimeCard />
        </div>
      </section>
    </div>
  );
};

export default Main;
