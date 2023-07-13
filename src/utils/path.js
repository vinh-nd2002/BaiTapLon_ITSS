const path = {
  PUBLIC: "/",
  HOME: "",
  ALL: "*",
  LOGIN: "login",
  PRODUCTS: "san-pham/:category",
  OUR_SERVICES: "services",
  FAQS: "faqs",
  BLOGS: "blogs",
  DETAIL_PRODUCT__CATEGORY__PID__TITLE: "san-pham/:category/:pid/:slug",
  DETAIL_PRODUCT: "san-pham",
  CART: "gio-hang",

  // Admin
  ADMIN: "admin",
  DASHBOARD: "dashboard",
  MANAGE_USERS: "manage-users",
  MANAGE_SHOPS: "manage-shops",
  MANAGE_PRODUCTS: "manage-products",
  CREATE_SHOP: "create-shop",

  // USER
  PROFILE: "profile",
  USER: "user",
};

export default path;
