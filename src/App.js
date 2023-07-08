import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Login,
  Home,
  Public,
  Blogs,
  FAQs,
  DetailProduct,
  Services,
  Products,
  Cart,
} from "./pages/public";
import path from "./utils/path";
import { useDispatch } from "react-redux";
import { getCategories } from "./stores/category/categoryAction";
import {
  getProducts,
  getProductsBestSeller,
  getProductsLatest,
} from "./stores/product/productAction";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
    dispatch(getProductsBestSeller());
    dispatch(getProductsLatest());
  }, [dispatch]);

  return (
    <div className="min-h-screen font-main">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />}></Route>
          <Route path={path.BLOGS} element={<Blogs />}></Route>
          <Route path={path.FAQS} element={<FAQs />}></Route>
          <Route
            path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE}
            element={<DetailProduct />}
          ></Route>
          <Route path={path.OUR_SERVICES} element={<Services />}></Route>
          <Route path={path.PRODUCTS} element={<Products />}></Route>
          <Route path={path.CART} element={<Cart />}></Route>
        </Route>
        <Route path={path.LOGIN} element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
