import axios from "./axios";

export const getShops = () =>
  axios({
    url: "/shops",
    method: "GET",
  });

export const getShopsTop = () =>
  axios({
    url: "/shops/top",
    method: "GET",
  });
