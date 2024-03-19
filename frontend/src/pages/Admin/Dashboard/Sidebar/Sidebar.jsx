import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="mt-5">
      <aside className=" inline-flex text-whiten w-40 flex-shrink-0">
        <ul className=" py-4 ">
          <li className="text-lg bg-gradient-to-b from-red-500 to-red-100 rounded-full">
            <Link
              to="/admin/movies/dashboard"
              className="block p-2 mb-10"
            >
              Dashboard
            </Link>
          </li>
          <li className="text-lg -translate-x-6 hover:bg-gradient-to-b from-red-500 to-red-400 rounded-full">
            <Link
              to="/admin/movies/create"
              className="block p-2 ml-5 mb-10"
            >
              Create Movie
            </Link>
          </li>
          <li className="text-lg -translate-x-6 hover:bg-gradient-to-b from-red-500 to-red-400 rounded-full">
            <Link
              to="/admin/movies/genre"
              className="block p-2 ml-5 mb-10"
            >
              Create Genre
            </Link>
          </li>
          <li className="text-lg -translate-x-6 hover:bg-gradient-to-b from-red-500 to-red-400 rounded-full">
            <Link
              to="/admin/movies-list"
              className="block p-2 ml-5 mb-10"
            >
              Update Movie
            </Link>
          </li>
          <li className="text-lg -translate-x-6 hover:bg-gradient-to-b from-red-500 to-red-400 rounded-full">
            <Link
              to="/admin/movies/comments"
              className="block p-2 ml-5 mb-10"
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
