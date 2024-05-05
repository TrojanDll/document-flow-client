import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../../features/auth/authSlice";
import axios from "axios";

interface IrefreshResult {
  accessToken: string;
  refreshToken: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: "http://213.171.4.235:8080",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem("accessToken");
    console.log("accessToken из apiSlice", token);
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
      console.log(headers.get("authorization"));
    }
    return headers;
  },
});

const customFetch = async (url: string, options: any) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  console.log(result?.error?.status);
  if (result?.error?.status === 401) {
    console.log("sending refresh token");
    // send refresh token to get new access token
    const refreshToken = localStorage.getItem("refreshToken");

    console.log("ПАРАМЕТРЫ ЗАПРОСА");
    console.log(args);
    console.log(api);
    console.log(refreshToken);
    // const refreshResult = await baseQuery("/api/auth/refreshtoken", api, optionsWithToken);

    // const refreshResult = await axios.post("http://213.171.4.235:8080/api/auth/refreshtoken", {
    //   token: refreshToken,
    // });
    const refreshResult = await axios({
      method: "POST",
      url: "http://213.171.4.235:8080/api/auth/refreshtoken",
      data: { token: `${refreshToken}` },
    });
    // console.log(JSON.stringify({ token: refreshToken }));

    // const refreshResult = await customFetch("http://213.171.4.235:8080/api/auth/refreshtoken", {
    //   method: "POST",
    //   body: JSON.stringify({ token: refreshToken }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    console.log(refreshResult);
    if (refreshResult?.data) {
      // const accessToken = api.getState().auth.accessToken;
      // const refreshToken = api.getState().auth.refreshToken;
      const receivedAccessToken = refreshResult.data.accessToken;
      const receivedRefreshToken = refreshResult.data.refreshToken;
      console.log("Установка новых access и refresh");
      console.log(receivedAccessToken);
      console.log(receivedRefreshToken);
      // store the new token
      api.dispatch(
        setCredentials({
          data: {
            accessToken: receivedAccessToken,
            refreshToken: receivedRefreshToken,
          },
        }),
      );
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
