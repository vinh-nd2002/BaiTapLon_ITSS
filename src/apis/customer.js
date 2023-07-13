import axios from "./axios";

export const apiGetAllCustomers = (params) =>
  axios({
    url: "/customers",
    method: "GET",
    params: params || null,
  });

export const apiDeleteCustomer = (id) =>
  axios({
    url: `/customers/${id}`,
    method: "DELETE",
  });

export const apiUpdateCustomer = (id, body) =>
  axios({
    url: `/customers/${id}`,
    method: "PUT",
    data: body,
  });
