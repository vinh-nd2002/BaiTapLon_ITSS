import axios from "axios";
const instance = axios.create({
  // baseURL: "http://localhost:5000/api/v1/",
  baseURL: "http://localhost:8000/api/",
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // let localStorageData = localStorage.getItem("persist:user");

    // if (localStorageData && typeof localStorageData === "string") {
    //   localStorageData = JSON.parse(localStorageData);
    //   console.log("localStorageData", localStorageData);
    //   const accessToken = JSON.parse(localStorageData?.accessToken);
    //   console.log("accessToken", accessToken);
    //   config.headers = { authorization: `Bearer ${accessToken}` };
    const token = localStorage.getItem("accessToken");
    if (token !== null && token !== undefined) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    } else return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error.response.data;
  }
);

export default instance;
