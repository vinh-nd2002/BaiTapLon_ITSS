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
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "./stores/category/categoryAction";
import {
  getProducts,
  getProductsBestSeller,
  getProductsLatest,
} from "./stores/product/productAction";
import { AdminLayout, CreateShop, DashBoard, ManageShop, ManageCustomer } from "./pages/admin";
import { Profile, UserLayout } from "./pages/customer";
import { Modal } from "./components";
function App() {
  const dispatch = useDispatch();
  const { isShowModal, modalChildren } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
    dispatch(getProductsBestSeller());
    dispatch(getProductsLatest());
  }, [dispatch]);

  return (
    <div className="relative font-main ">
      {isShowModal && <Modal>{modalChildren}</Modal>}
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
        {/* Admin */}
        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={path.DASHBOARD} element={<DashBoard />} />
          <Route path={path.CREATE_SHOP} element={<CreateShop />} />
          <Route path={path.MANAGE_SHOPS} element={<ManageShop />} />
          <Route path={path.MANAGE_USERS} element={<ManageCustomer />} />
        </Route>
        {/* Customer */}
        <Route path={path.USER} element={<UserLayout />}>
          <Route path={path.PROFILE} element={<Profile />} />
        </Route>

        <Route path={path.LOGIN} element={<Login />}></Route>
        <Route path={path.ALL} element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
