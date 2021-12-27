import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../shared/api";
import { history } from "../configureStore";

export const login = createAsyncThunk(
  "/users/login",
  async (data: { userId: string; pw: string }, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/login", data);
      history.push("/");
      return response.data;
    } catch (err: unknown) {
      return rejectWithValue(err);
    }
  },
);

export const signup = createAsyncThunk(
  "/users/signup",
  async (
    data: {
      userId: string;
      nickname: string;
      pw: string;
      confirmPw: string;
      ageGroup: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await api.post("/users/signup", data);
      alert("회원가입이 되었습니다");
      history.push("/login");
      return response.data;
    } catch (err: unknown) {
      return rejectWithValue(err);
    }
  },
);

export const checkIdDup = createAsyncThunk(
  "/users/signup/id",
  async (data: { userId: string }, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/signup/id", data);
      return response.data;
    } catch (err: unknown) {
      return rejectWithValue(err);
    }
  },
);

export const checkNickDup = createAsyncThunk(
  "/users/signup/nick",
  async (data: { nickname: string }, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/signup/nick", data);
      return response.data;
    } catch (err: unknown) {
      return rejectWithValue(err);
    }
  },
);

export const updateNick = createAsyncThunk(
  "/profiles/updateNick",
  async (nickname: string | null, { rejectWithValue }) => {
    try {
      const response = await api.patch("/profiles/nick", { nickname });
      return response.data;
    } catch (err: unknown) {
      return rejectWithValue(err);
    }
  },
);

export const getProfileNick = createAsyncThunk(
  "/profiles/getnick",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/profiles/${id}`);
      return response.data;
    } catch (err: unknown) {
      return rejectWithValue(err);
    }
  },
);
