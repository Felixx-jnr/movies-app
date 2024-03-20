import { useState, useRef, useEffect } from "react";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { MdOutlineLocalMovies } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/users";
import { logout } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdown, setDropdown] = useState(null);
  const dropdownRef = useRef(true);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
      toast.success("Logged out");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" fixed left-0 top-[40%]   bg-[#d64040] border rounded z-10 ml-2 p-1">
      <section className="justify-center align-middle items-center">
        {/* Section 1 */}
        <div className="">
          <Link to="/">
            <AiOutlineHome
              className="mb-4"
              size={20}
            />
            <span className="hidden nav-item-name mt-[3rem]">Home</span>
          </Link>

          <Link
            to="movies"
            className=""
          >
            <MdOutlineLocalMovies
              className="mb-4"
              size={20}
            />
            <span className="hidden nav-item-name mt-[3rem]">SHOP</span>
          </Link>
        </div>

        {/* section 2 */}

        <div ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="text-gray-800 focus:outline-none"
          >
            {userInfo ? <span className="text-white text-1xl "></span> : <></>}

            {userInfo && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 ${
                  dropdown ? "transform rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={dropdown ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                />
              </svg>
            )}
          </button>

          {dropdown && userInfo && (
            <ul
              className={`absolute transition-all duration-300 left-16 mt-2 mr-14 w-[10rem] space-y-2 bg-red-200 text-gray-600 ${
                !userInfo.isAdmin ? "-top-20" : "-top-24"
              }`}
            >
              {userInfo.isAdmin && (
                <>
                  <li>
                    <Link
                      to="/admin/movies/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                  </li>
                </>
              )}

              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>
              </li>

              <li>
                <button
                  onClick={logoutHandler}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}

          {!userInfo && (
            <ul className="">
              <li>
                <Link
                  to="/login"
                  className=""
                >
                  <AiOutlineLogin
                    className="mb-4"
                    size={20}
                  />
                  <span className="hidden nav-item-name">LOGIN</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className=""
                >
                  <AiOutlineUserAdd size={20} />
                  <span className="hidden nav-item-name">REGISTER</span>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default Navigation;
