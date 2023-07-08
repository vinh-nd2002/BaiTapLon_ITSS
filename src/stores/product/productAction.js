import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../apis";

export const getProducts = createAsyncThunk(
  "app/getProducts",
  async (data, { rejectWithValue }) => {
    const response = await api.getProducts();
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);

export const getProductsBestSeller = createAsyncThunk(
  "app/getProductsBestSeller",
  async (data, { rejectWithValue }) => {
    const response = await api.getProductsBestSeller();
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);

export const getProductsLatest = createAsyncThunk(
  "app/getProductsLatest",
  async (data, { rejectWithValue }) => {
    const response = await api.getProductsLatest();
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);
