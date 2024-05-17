import { apiSlice } from "../../app/api/apiSlice";
import { IUser } from "../../types/Types";

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
    getCurrientGroupMembers: builder.query<IUser[], void>({
      query: () => "/api/users/current-group-members",
    }),
  }),
});

export const { useGetUsersMutation, useGetCurrientUserQuery, useGetCurrientGroupMembersQuery } = usersApiSlice;
