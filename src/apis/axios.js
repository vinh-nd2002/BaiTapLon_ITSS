import axios from "axios";
import Swal from "sweetalert2";
const instance = axios.create({
  // baseURL: "http://localhost:5000/api/v1/",
  baseURL: "http://localhost:8000/api/v1",
});

instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("accessToken");
    if (token !== null && token !== undefined) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    } else return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error.response.data.message === "Unauthenticated.") {
      Swal.fire("Oops!", "Bạn đã hết thời gian truy cập!!!", "error");
      window.location.href = "/login";
    }
    return error.response.data;
  }
);

export default instance;
