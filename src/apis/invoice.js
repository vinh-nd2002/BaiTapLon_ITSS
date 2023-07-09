import axios from "./axios";

export const checkout = (id) =>
  axios({
    url: `/invoices/${id}`,
    method: "PUT",
  });
