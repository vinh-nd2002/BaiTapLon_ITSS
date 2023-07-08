import axios from "./axios";

export const getCategories = () =>
  axios({
    url: "/categories",
    method: "GET",
  });

export const getCategoryWithProducts = () =>{
  
}
