import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "shop",
  initialState: {
    isLoading: false,
    shops: null,
    errorMessage: "",
  },
  reducers: {
    getAllShops: (state, action) => {
      state.shops = action.payload.data;
    },
    deleteShop: (state, action) => {
      state.shops = state.shops.filter(
        (shop) => +shop.id !== +action.payload.id
      );
    },
  },
});

export const {getAllShops, deleteShop} = appSlice.actions;

export default appSlice.reducer;
