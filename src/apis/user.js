import axios from "./axios";

export const apiLogin = (data) =>
  axios({
    url: "/users/login",
    method: "POST",
    data,
  });

export const apiRegister = (data) =>
  axios({
    url: "/users/register",
    method: "POST",
    data,
  });

export const apiGetCurrent = () =>
  axios({
    url: "/users/current",
    method: "GET",
  });
