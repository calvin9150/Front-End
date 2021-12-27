import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getMainData } from "../actions/main";

export type MainPost = {
  either: [];
  multi: [];
  attendNum: number;
  postingNum: number;
  eitherNum: number;
  multiNum: number;
};

export type InitialState = {
  mainPosts: MainPost[];
  mainDataLoading: boolean;
  mainDataDone: boolean;
  mainDataError: null | string;
};

export const initialState: InitialState = {
  mainPosts: [],
  mainDataLoading: false,
  mainDataDone: false,
  mainDataError: null,
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      // getMainData
      .addCase(getMainData.pending, state => {
        state.mainDataLoading = true;
        state.mainDataDone = false;
        state.mainDataError = null;
      })
      .addCase(getMainData.fulfilled, (state, action: PayloadAction<any>) => {
        state.mainDataLoading = false;
        state.mainDataDone = true;
        state.mainPosts = action.payload;
      })
      .addCase(getMainData.rejected, (state, action: PayloadAction<any>) => {
        state.mainDataLoading = false;
        state.mainDataError = action.payload;
      }),
});

export default mainSlice;
