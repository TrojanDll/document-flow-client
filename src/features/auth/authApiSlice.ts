import { apiSlice } from "../../app/api/apiSlice";

interface Ilogin {
  email: string;
  password: string;
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/api/auth/login",
        method: "POST",
        body: { email, password },
      }),
    }),
    register: builder.query({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: {
          firstName: "string",
          lastName: "string",
          patronymic: "string",
          department: "string",
          post: "string",
          email: "string",
          password: "string",
        },
      }),
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
