import axios from "./axios";

export const apiLogin = (data) =>
  axios({
    url: "/login",
    method: "POST",
    data,
  });

export const apiRegister = (data) =>
  axios({
    url: "/register",
    method: "POST",
    data,
  });

export const apiGetCurrent = () =>
  axios({
    url: "/current",
    method: "GET",
  });
