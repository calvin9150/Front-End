import { createSlice } from "@reduxjs/toolkit";
import { getMyPosts, getMyPolls, getProfileNick } from "../actions/profile";

export const initialState = {
  myPosts: [],
  myPolls: [],
  nickname: null,
  getMyPostsLoading: false,
  getMyPostsDone: false,
  getMyPostsError: null,
  getMyPollsLoading: false,
  getMyPollsDone: false,
  getMyPollsError: null,
  getProfileNickLoading: false,
  getProfileNickDone: false,
  getProfileNickError: null,
};
const profileSlice = createSlice({
  name: "main",
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      // getMyPosts
      .addCase(getMyPosts.pending, state => {
        state.getMyPostsLoading = true;
        state.getMyPostsDone = false;
        state.getMyPostsError = null;
      })
      .addCase(getMyPosts.fulfilled, (state, action) => {
        state.getMyPostsLoading = false;
        state.getMyPostsDone = true;
        state.myPosts = action.payload.posts;
      })
      .addCase(getMyPosts.rejected, (state, action) => {
        state.getMyPostsLoading = false;
        state.getMyPostsError = action.payload;
      })
      // getMyPolls
      .addCase(getMyPolls.pending, state => {
        state.getMyPollsLoading = true;
        state.getMyPollsDone = false;
        state.getMyPollsError = null;
      })
      .addCase(getMyPolls.fulfilled, (state, action) => {
        state.getMyPollsLoading = false;
        state.getMyPollsDone = true;
        state.myPolls = action.payload.posts;
      })
      .addCase(getMyPolls.rejected, (state, action) => {
        state.getMyPollsLoading = false;
        state.getMyPollsError = action.payload;
      })
      // getProfileNick
      .addCase(getProfileNick.pending, state => {
        state.getProfileNickLoading = true;
        state.getProfileNickDone = false;
        state.getProfileNickError = null;
      })
      .addCase(getProfileNick.fulfilled, (state, action) => {
        state.getProfileNickLoading = false;
        state.getProfileNickDone = true;
        state.nickname = action.payload.nickname;
      })
      .addCase(getProfileNick.rejected, (state, action) => {
        state.getProfileNickLoading = false;
        state.getProfileNickDone = false;
        state.getProfileNickError = action.payload;
      }),
});

export default profileSlice;
