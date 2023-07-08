import axios from "./axios";

export const getShops = () =>
  axios({
    url: "/shops",
    method: "GET",
  });


