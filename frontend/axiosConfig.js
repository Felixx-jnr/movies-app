const axios = require("axios");

const configureAxios = (token) => {
  // If token exists, set it in request headers for all requests
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

module.exports = configureAxios;
