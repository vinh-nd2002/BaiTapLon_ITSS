import axios from "./axios";

export const apiCreateDelivery = (body) =>
  axios({
    url: "/delivery-info",
    method: "POST",
    data: body,
  });
