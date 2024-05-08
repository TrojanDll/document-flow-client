import { apiSlice } from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.mutation({
      query: () => ({
        url: "/api/admin/users",
        method: "GET",
      }),
    }),
    getCurrientUser: builder.query<IUser, void>({
      query: () => "/api/users/current",
    }),
  }),
});

export const { useGetUsersMutation, useGetCurrientUserQuery } = usersApiSlice;
