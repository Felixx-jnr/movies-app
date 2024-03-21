import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import banner from "../../assets/banner.jpg";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useLoginMutation } from "../../redux/api/users";
import { toast } from "react-toastify";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success(`Welcome`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }

    setPassword("");
    setEmail("");
  };

  return (
    <div className="max-w-[98%] mx-auto">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${banner})`,
          filter: "brightness(20%) blur(5px)",
        }}
      />

      <section className="relative max-w-[80%] md:w-[60%] mx-auto">
        <div className="mt-[5rem] max">
          <h1 className=" text-center text-4xl text-red-500 font-bold mb-4">
            LOG IN
          </h1>

          <form onSubmit={submitHandler}>
            <div className="my-[2rem ]">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                {" "}
                Email Address{" "}
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 border rounded w-full"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="my-[2rem]">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                {" "}
                Password
              </label>
              <input
                type="password"
                className="mt-1 p-2 border rounded w-full"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
            >
              {isLoading ? "Logging In ..." : "Log In"}
            </button>
            {isLoading && <Loader />}
          </form>

          <div className="mt-4">
            <p className="text-white">
              {" "}
              New Customer?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-red-500 hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
