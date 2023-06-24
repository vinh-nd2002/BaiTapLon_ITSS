import axios from "./../axios";

export const getProducts = async (params) =>
  axios({
    url: "/products/",
    method: "get",
    params,
  });
