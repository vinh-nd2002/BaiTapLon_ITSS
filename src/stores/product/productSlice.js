import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./productAction";

export const appSlice = createSlice({
  name: "product",
  initialState: {
    isLoading: false,
    products: null,
    bestSellers: null,
    lastTests: null,
    errorMessage: "",
  },
  reducers: {},
  // Code logic xử lý async action
  extraReducers: (builder) => {
    builder.addCase(actions.getProducts.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actions.getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload.data;
    });

    builder.addCase(actions.getProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });

    builder.addCase(actions.getProductsBestSeller.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(
      actions.getProductsBestSeller.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.bestSellers = action.payload.data;
      }
    );

    builder.addCase(actions.getProductsBestSeller.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });

    builder.addCase(actions.getProductsLatest.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actions.getProductsLatest.fulfilled, (state, action) => {
      state.isLoading = false;
      state.lastTests = action.payload.data;
    });

    builder.addCase(actions.getProductsLatest.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });
  },
});

export const { getProducts, getProductsLatest, getProductsBestSeller } =
  appSlice.actions;

export default appSlice.reducer;
