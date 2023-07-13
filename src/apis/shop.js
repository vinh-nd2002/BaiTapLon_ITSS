import axios from "./axios";

export const apiGetAllShops = (params) =>
  axios({
    url: "/shops",
    method: "GET",
    params: params || null,
  });

export const getShopsTop = () =>
  axios({
    url: "/shops/top",
    method: "GET",
  });

  export const apiUpdateShop = (id, body) =>
  axios({
    url: `/shops/${id}`,
    method: "PUT",
    data: body,
  });

export const apiDeleteShop = (id) =>
  axios({
    url: `/shops/${id}`,
    method: "DELETE",
  });
