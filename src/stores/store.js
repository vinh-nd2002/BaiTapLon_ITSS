import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import userSlice from "./users/userSlice";
import categorySlice from "./category/categorySlice";

const commonConfig = {
  key: "user",
  storage,
};

const userConfig = {
  ...commonConfig,
  whitelist: ["isLoggedIn"],
};

export const store = configureStore({
  reducer: {
    category: categorySlice,
    user: persistReducer(userConfig, userSlice),
  },
});

export const persistor = persistStore(store);
