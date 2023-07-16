import axios from "./axios";

export const apiCreateOrder = (body) =>
  axios({
    url: "/orders",
    method: "POST",
    data: body,
  });

export const apiGetOrders = () =>
  axios({
    url: "/orders",
    method: "GET",
  });

  export const apiAcceptOrder = (id) =>
  axios({
    url: `/orders/${id}`,
    method: "PUT",
  });
