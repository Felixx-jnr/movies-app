import axios from "axios";

const configureAxios = () => {
  // Get token from localStorage
  const token = localStorage.getItem("token");

  // If token exists, set it in request headers for all requests
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

export default configureAxios;
