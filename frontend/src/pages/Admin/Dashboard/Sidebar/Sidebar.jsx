import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className=" mt-5 ">
      <aside className="">
        <ul className="text-center">
          <li className="inline-block mx-2 text-lg bg-gradient-to-b from-red-500 to-red-400 rounded-full">
            <Link
              to="/admin/movies/dashboard"
              className=" p-1 mb-3 hover:bg-gradient-to-b from-red-300 to-red-100 rounded-full"
            >
              Dashboard
            </Link>
          </li>
          <li className="inline-block border  mx-2 text-lg hover:bg-gradient-to-b from-red-500 to-red-400 rounded-full">
            <Link
              to="/admin/movies/create"
              className=" mx-0 p-1 mb-3"
            >
              Create Movie
            </Link>
          </li>
          <li className="inline-block mx-2 text-lg hover:bg-gradient-to-b from-red-500 to-red-400 rounded-full">
            <Link
              to="/admin/movies/genre"
              className=" p-1 mb-3"
            >
              Create Genre
            </Link>
          </li>
          <li className="inline-block mx-2 text-lg hover:bg-gradient-to-b from-red-500 to-red-400 rounded-full">
            <Link
              to="/admin/movies-list"
              className="p-1 mb-3"
            >
              Update Movie
            </Link>
          </li>
          <li className="inline-block mx-2 text-lg hover:bg-gradient-to-b from-red-500 to-red-400 rounded-full">
            <Link
              to="/admin/movies/comments"
              className=" inline p-1 mb-3"
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
