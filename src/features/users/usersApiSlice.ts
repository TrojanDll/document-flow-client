import { apiSlice } from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.mutation({
      query: () => ({
        url: "/api/admin/users",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUsersMutation } = usersApiSlice;
