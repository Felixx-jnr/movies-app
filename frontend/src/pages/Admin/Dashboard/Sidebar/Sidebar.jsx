import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className=" mt-5 ">
      <aside className="">
        <ul className="text-center">
          <li className="inline-block m-2 p-1 text-lg bg-gradient-to-b from-red-500 to-red-400 rounded-full">
            <Link
              to="/admin/movies/dashboard"
              className=" p-1 mb-3 "
            >
              Dashboard
            </Link>
          </li>
          <li className="inline-block m-2 border-none bg-neutral-700 p-1 mx-2 text-lg hover:bg-gradient-to-b from-red-500 to-red-400 rounded-full">
            <Link
              to="/admin/movies/create"
              className=" mx-0 p-1 mb-3"
            >
              Create Movie
            </Link>
          </li>
          <li className="inline-block m-2 text-lg border-none bg-neutral-700 p-1 hover:bg-gradient-to-b from-red-500 to-red-400 rounded-full">
            <Link
              to="/admin/movies/genre"
              className=" p-1 mb-3"
            >
              Create Genre
            </Link>
          </li>
          <li className="inline-block m-2 text-lg border-none p-1 bg-neutral-700 hover:bg-gradient-to-b from-red-500 to-red-400 rounded-full">
            <Link
              to="/admin/movies-list"
              className="p-1 mb-3"
            >
              Update Movie
            </Link>
          </li>
          <li className="inline-block m-2 text-lg border-none p-1 bg-neutral-700 hover:bg-gradient-to-b from-red-500 to-red-400 rounded-full">
            <Link
              to="/admin/movies/comments"
              className="p-1 mb-3"
            >
              Comments
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
