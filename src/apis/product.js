import axios from "./axios";

export const getProducts = async (params) =>
  axios({
    url: "/products/",
    method: "get",
    params: params || null,
  });

export const getProductsBestSeller = async (params) =>
  axios({
    url: "/products/best-sellers",
    method: "get",
    params: params || null,
  });

export const getProductsLatest = async (params) =>
  axios({
    url: "/products/latest",
    method: "get",
    params: params || null,
  });

export const getProductById = async (pid) =>
  axios({
    url: `/products/${pid}`,
    method: "get",
  });

export const apiCreateProduct = async (body) =>
  axios({
    url: "/products",
    method: "post",
    data: body,
  });

export const apiDeleteProductById = async (pid) =>
  axios({
    url: `/products/${pid}`,
    method: "delete",
  });
