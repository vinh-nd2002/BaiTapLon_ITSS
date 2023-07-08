import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import userSlice from "./users/userSlice";
import categorySlice from "./category/categorySlice";
import cartSlice from "./cart/cartSlice";
import productSlice from "./product/productSlice";

const commonConfig = {
  key: "user",
  storage,
};

const userConfig = {
  ...commonConfig,
  whitelist: ["isLoggedIn", "accessToken", "current"],
};

export const store = configureStore({
  reducer: {
    category: categorySlice,
    cart: cartSlice,
    product: productSlice,
    user: persistReducer(userConfig, userSlice),
  },
});

export const persistor = persistStore(store);
