import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="inline-flex mt-5 ml-12 ">
      <aside className=" text-whiten flex-shrink-0 ">
        <ul className=" py-4 inline">
          <li className="text-lg bg-gradient-to-b from-red-500 to-red-400 rounded-full">
            <Link
              to="/admin/movies/dashboard"
              className="block p-1 mb-3 hover:bg-gradient-to-b from-red-300 to-red-100 rounded-full"
            >
              Dashboard
            </Link>
          </li>
          <li className="text-lg hover:bg-gradient-to-b from-red-500 to-red-400 rounded-full">
            <Link
              to="/admin/movies/create"
              className="block mx-0 p-1 mb-3"
            >
              Create Movie
            </Link>
          </li>
          <li className="text-lg hover:bg-gradient-to-b from-red-500 to-red-400 rounded-full">
            <Link
              to="/admin/movies/genre"
              className="block p-1 mb-3"
            >
              Create Genre
            </Link>
          </li>
          <li className="text-lg hover:bg-gradient-to-b from-red-500 to-red-400 rounded-full">
            <Link
              to="/admin/movies-list"
              className="block p-1 mb-3"
            >
              Update Movie
            </Link>
          </li>
          <li className="text-lg hover:bg-gradient-to-b from-red-500 to-red-400 rounded-full">
            <Link
              to="/admin/movies/comments"
              className="block p-1 mb-3"
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
