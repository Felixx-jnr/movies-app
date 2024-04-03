import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === "production") disableReactDevTools();

//RESTRICTED
import Home from "./pages/Home";
import Profile from "./pages/User/Profile";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import PrivateRoute from "./pages/Auth/PrivateRoute.jsx";

//AUTH
import AdminRoute from "./pages/Admin/AdminRoute.jsx";
import GenreList from "./pages/Admin/GenreList.jsx";
import CreateMovie from "./pages/Admin/CreateMovie.jsx";
import AdminMoviesList from "./pages/Admin/AdminMoviesList.jsx";
import UpdateMovie from "./pages/Admin/UpdateMovie.jsx";
import AllMovies from "./pages/Movies/AllMovies.jsx";
import MovieDetails from "./pages/Movies/MovieDetails.jsx";
import AllComments from "./pages/Admin/AllComment.jsx";
import AdminDashboard from "./pages/Admin/Dashboard/AdminDashboard.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}

        <Route
          path="/"
          element={<App />}
        >
          <Route
            index
            element={<Home />}
          />

          <Route
            path="/movies"
            element={<AllMovies />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/movies/:id"
            element={<MovieDetails />}
          />

          {/* PRIVATE ROUTES */}
          <Route
            path=""
            element={<PrivateRoute />}
          >
            <Route
              path="/profile"
              element={<Profile />}
            />
          </Route>

          {/* ADMIN ROUTES */}
          <Route
            path=""
            element={<AdminRoute />}
          >
            <Route
              path="/admin/movies/genre"
              element={<GenreList />}
            />

            <Route
              path="/admin/movies/create"
              element={<CreateMovie />}
            />

            <Route
              path="/admin/movies-list"
              element={<AdminMoviesList />}
            />

            <Route
              path="/admin/movies/update/:id"
              element={<UpdateMovie />}
            />

            <Route
              path="/admin/movies/comments"
              element={<AllComments />}
            />

            <Route
              path="/admin/movies/dashboard"
              element={<AdminDashboard />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
