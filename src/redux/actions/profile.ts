import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../shared/api";
import { history } from "../configureStore";

export const getMyPosts = createAsyncThunk(
  "/profiles/:user_id/posts",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/profiles/${id}/posts`);
      return response.data;
    } catch (err: unknown) {
      alert("로그인 후 접속이 가능합니다");
      history.push("/login");
      return rejectWithValue(err);
    }
  },
);

export const getMyPolls = createAsyncThunk(
  "/profiles/:user_id/polls",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/profiles/${id}/polls`);
      return response.data;
    } catch (err: unknown) {
      return rejectWithValue(err);
    }
  },
);
