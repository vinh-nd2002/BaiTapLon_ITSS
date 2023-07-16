const path = {
  PUBLIC: "/",
  HOME: "",
  ALL: "*",
  LOGIN: "login",
  REGISTER: "register",
  PRODUCTS: "san-pham/:category",
  OUR_SERVICES: "services",
  FAQS: "faqs",
  BLOGS: "blogs",
  DETAIL_PRODUCT__CATEGORY__PID__TITLE: "san-pham/:category/:pid/:slug",
  DETAIL_PRODUCT: "san-pham",
  CART: "gio-hang",

  // ADMIN
  ADMIN: "admin",
  ADMIN_DASHBOARD: "admin-dashboard",
  MANAGE_USERS: "manage-users",
  MANAGE_SHOPS: "manage-shops",
  CREATE_SHOP: "create-shop",

  //SHOP
  SHOP: "shop",
  SHOP_DASHBOARD: "shop-dashboard",
  CREATE_PRODUCT: "create-product",
  MANAGE_PRODUCTS: "manage-products",
  MANAGE_COUPONS: "manage-coupons",
  MANAGE_ORDERS: "manage-orders",

  // USER
  PROFILE: "profile",
  USER: "user",
};

export default path;
