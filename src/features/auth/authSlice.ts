import { createSlice } from "@reduxjs/toolkit";

interface IauthSliceState {
  accessToken: string;
  refreshToken: string;
}

const authSlice = createSlice({
  name: "auth",
  initialState: <IauthSliceState>{ accessToken: "", refreshToken: "" },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    // logOut: (state, action) => {
    //   state.user = null;
    //   state.token = null;
    // },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentAccessToken = (state: IauthSliceState) => state.accessToken;
export const selectCurrentRefreshToken = (state: IauthSliceState) => state.refreshToken;
