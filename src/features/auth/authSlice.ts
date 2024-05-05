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
      console.log(action.payload);

      const { accessToken, refreshToken } = action.payload.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    logOut: () => {
      localStorage.setItem("accessToken", "");
      localStorage.setItem("refreshToken", "");
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
