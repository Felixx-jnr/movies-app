import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetSpecificMovieQuery,
  useAddMovieReviewMutation,
} from "../../redux/api/movies";
import MovieTabs from "./MovieTabs";

const MovieDetails = () => {
  const { id: movieId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { data: movie, refetch } = useGetSpecificMovieQuery(movieId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingMovieReview }] =
    useAddMovieReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        id: movieId,
        rating,
        comment,
      }).unwrap();

      refetch();

      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error.data || error.message);
    }

    setComment("");
  };

  return (
    <div className="max-w-[90%] mx-auto">
      <div>
        <Link
          to="/"
          className="text-white font-semibold hover:underline ml-[]"
        >
          Go Back
        </Link>
      </div>

      <div className="mt-2 max-w-[98%] mx-auto">
        <div className="flex gap-10 justify-center justify-items-center align-middle">
          <div className="">
            <img
              src={movie?.image}
              alt={movie?.name}
              className="w-[50rem] h-[30rem] rounded object-cover"
            />
          </div>

          <div className=" container px-3 mt-8">
            <section>
              <h2 className="text-5xl my-2 font-bold ">{movie?.name}</h2>
              <p className="my-4 text-[#B0B0B0]">{movie?.detail}</p>
            </section>

            <div className="">
              <p className="text-2xl font-semibold">
                Release Date: {movie?.year}
              </p>

              <div className="flex flex-wrap mt-2">
                {" "}
                {movie?.cast.map((c, index) => (
                  <ul
                    className="flex flex-wrap"
                    key={index}
                  >
                    <li className="mr-3"> {c}</li>
                  </ul>
                ))}
              </div>

              <div className="flex justify-center items-center mt-4">
                <button className=" px-2 py-2 mx-2 rounded-lg font-bold text- text-1xl bg-green-500">
                  Download Now
                </button>
                <button className=" px-2 py-2 mx-2 rounded-lg font-bold text- text-1xl bg-red-500">
                  Watch Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className=" mx-auto max-w-[98%]">
          <MovieTabs
            loadingMovieReview={loadingMovieReview}
            userInfo={userInfo}
            submitHandler={submitHandler}
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment={setComment}
            movie={movie}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
