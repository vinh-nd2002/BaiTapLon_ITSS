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
  Register,
} from "./pages/public";
import path from "./utils/path";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "./stores/category/categoryAction";
import {
  getProducts,
  getProductsBestSeller,
  getProductsLatest,
} from "./stores/product/productAction";
import {
  AdminLayout,
  CreateShop,
  ManageShop,
  ManageCustomer,
  AdminDashBoard,
} from "./pages/admin";
import { Profile, UserLayout } from "./pages/customer";
import { Modal } from "./components";
import {
  ShopDashBoard,
  ManageProduct,
  ManageCoupon,
  ManageOrder,
  ShopLayout,
  CreateProduct,
} from "./pages/shop";

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
          <Route path={path.ADMIN_DASHBOARD} element={<AdminDashBoard />} />
          <Route path={path.CREATE_SHOP} element={<CreateShop />} />
          <Route path={path.MANAGE_SHOPS} element={<ManageShop />} />
          <Route path={path.MANAGE_USERS} element={<ManageCustomer />} />
        </Route>
        <Route path={path.SHOP} element={<ShopLayout />}>
          <Route path={path.SHOP_DASHBOARD} element={<ShopDashBoard />} />
          <Route path={path.CREATE_PRODUCT} element={<CreateProduct />} />
          <Route path={path.MANAGE_PRODUCTS} element={<ManageProduct />} />
          <Route path={path.MANAGE_COUPONS} element={<ManageCoupon />} />
          <Route path={path.MANAGE_ORDERS} element={<ManageOrder />} />
        </Route>
        {/* Customer */}
        <Route path={path.USER} element={<UserLayout />}>
          <Route path={path.PROFILE} element={<Profile />} />
        </Route>

        <Route path={path.LOGIN} element={<Login />}></Route>
        <Route path={path.REGISTER} element={<Register />}></Route>
        <Route path={path.ALL} element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
