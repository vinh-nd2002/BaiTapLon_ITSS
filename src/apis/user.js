import axios from "./axios";

export const apiLogin = (data) =>
  axios({
    url: "/login",
    method: "POST",
    data,
  });

export const apiRegisterCustomer = (data) =>
  axios({
    url: "/register-customer",
    method: "POST",
    data,
  });

export const apiRegisterShop = (data) =>
  axios({
    url: "/register-shop",
    method: "POST",
    data,
  });

export const apiGetCurrent = () =>
  axios({
    url: "/current",
    method: "GET",
  });
