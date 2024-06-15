import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../../features/auth/authSlice";
import axios from "axios";

export const BASE_URL = "http://87.249.53.115:8080";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log(args, api);

  if (result?.error?.status === 401 || result?.error?.status === 400) {
    console.log("sending refresh token");
    const refreshToken = localStorage.getItem("refreshToken");

    const refreshResult = await axios({
      method: "POST",
      url: `${BASE_URL}/api/auth/refreshtoken`,
      data: { token: refreshToken },
    });

    if (refreshResult?.data) {
      const receivedAccessToken = refreshResult.data.accessToken;
      // t-roya-nDl-l
      const receivedRefreshToken = refreshResult.data.refreshToken;
      api.dispatch(
        setCredentials({
          data: {
            accessToken: receivedAccessToken,
            refreshToken: receivedRefreshToken,
          },
        })
      );
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  // @ts-ignore
  endpoints: (builder) => ({}),
});
