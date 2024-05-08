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

      const { accessToken, refreshToken, role } = action.payload.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("role", role);
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    logOut: () => {
      localStorage.setItem("accessToken", "");
      localStorage.setItem("refreshToken", "");
      localStorage.setItem("role", "");
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
