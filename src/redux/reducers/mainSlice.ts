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
  mainPost: MainPost;
  mainDataLoading: boolean;
  mainDataDone: boolean;
  mainDataError: null | string;
};

export const initialState: InitialState = {
  mainPost: {
    either: [],
    multi: [],
    attendNum: 0,
    postingNum: 0,
    eitherNum: 0,
    multiNum: 0,
  },
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
      .addCase(getMainData.pending, (state: InitialState) => {
        state.mainDataLoading = true;
        state.mainDataDone = false;
        state.mainDataError = null;
      })
      .addCase(
        getMainData.fulfilled,
        (state: InitialState, action: PayloadAction<MainPost>) => {
          state.mainDataLoading = false;
          state.mainDataDone = true;
          state.mainPost = action.payload;
        },
      )
      .addCase(getMainData.rejected, (state: InitialState, action) => {
        state.mainDataLoading = false;
        state.mainDataError = action.error.message || "error";
      }),
});

export default mainSlice;
