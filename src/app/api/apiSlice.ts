import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../../features/auth/authSlice";

interface IrefreshResult {
  accessToken: string;
  refreshToken: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: "http://213.171.4.235:8080",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    console.log("accessToken из apiSlice", token);
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  console.log(args);
  let result = await baseQuery(args, api, extraOptions);

  console.log(result?.error?.status);
  if (result?.error?.status === 401) {
    console.log("sending refresh token");
    // send refresh token to get new access token
    const refreshResult = await baseQuery("/api/auth/refreshtoken", api, extraOptions);
    console.log(refreshResult);
    if (refreshResult?.data) {
      const accessToken = api.getState().auth.accessToken;
      const refreshToken = api.getState().auth.refreshToken;
      // store the new token
      api.dispatch(setCredentials({ accessToken, refreshToken }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
