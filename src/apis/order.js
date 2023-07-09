import axios from "./axios";

export const apiCreateOrder = (body) =>
  axios({
    url: "/orders",
    method: "POST",
    data: body,
  });
