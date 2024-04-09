import { Link } from "react-router-dom";

const MovieTabs = ({ userInfo, submitHandler, comment, setComment, movie }) => {
  return (
    <div>
      <section className=" max-w-[90%] w-[80%] my-10 mx-auto">
        {userInfo ? (
          <form onSubmit={submitHandler}>
            <div>
              <label
                htmlFor="comment"
                className="block text-xl mb-3"
              >
                Write Your Review:
              </label>

              <textarea
                id="comment"
                rows="3"
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className=" px-2 py-2 border w-[90%] rounded-lg text-black"
              ></textarea>
            </div>

            <button
              type="submit"
              className="text-center bg-red-500 text-white mt-2 py-2 px-2 rounded-lg"
            >
              Submit
            </button>
          </form>
        ) : (
          <p>
            You have to{" "}
            <Link
              className="text-red-500"
              to="/login"
            >
              Log in
            </Link>{" "}
            to write a review
          </p>
        )}
      </section>

      <section className="mt-[3rem]">
        <div>{movie?.reviews.length === 0 && <p>No Reviews</p>}</div>

        <div>
          {movie?.reviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#1A1A1A] p-4 rounded-lg w-1050%] my-[2rem]"
            >
              <div className="flex justify-between">
                <strong className="text-[#B0B0B0]">{review.name}</strong>
                <p className="text-[#B0B0B0]">
                  {review.createdAt.substring(0, 10)}
                </p>
              </div>

              <p className="my-4">{review.comment}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MovieTabs;
