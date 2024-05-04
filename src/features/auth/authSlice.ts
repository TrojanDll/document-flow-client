import { createSelector, createSlice } from "@reduxjs/toolkit";

interface IauthSliceState {
  accessToken: string;
  refreshToken: string;
}

const authSlice = createSlice({
  name: "auth",
  initialState: <IauthSliceState>{ accessToken: "", refreshToken: "" },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, refreshToken } = action.payload.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      // console.log("refreshToken", refreshToken);
      // console.log(`accessToken: ${accessToken}`);
      // console.log(`refreshToken ${refreshToken}`);
    },
    // logOut: (state, action) => {
    //   state.user = null;
    //   state.token = null;
    // },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;

// export const selectCurrentAccessToken = (state: any) => state.auth.accessToken;
// export const selectCurrentRefreshToken = (state: any) => state.auth.refreshToken;
