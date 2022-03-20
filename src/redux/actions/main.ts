import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../shared/api";
import { MainPost } from "../reducers/mainSlice";

export const getMainData = createAsyncThunk(
  "/main",
  async (): Promise<MainPost> => {
    const response = await api.get("/");
    return response.data;
  },
);
