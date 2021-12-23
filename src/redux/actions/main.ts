import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../shared/api";

export const getMainData = createAsyncThunk(
  "/main",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get("/");
      return response.data;
    } catch (err: unknown) {
      return rejectWithValue(err);
    }
  },
);
