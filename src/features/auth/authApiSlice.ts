import { apiSlice } from "../../app/api/apiSlice";

interface Ilogin {
  email: string;
  password: string;
}

interface IRegister {
  firstName: string;
  lastName: string;
  patronymic: string;
  department: string;
  post: string;
  email: string;
  password: string;
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: Ilogin) => ({
        url: "/api/auth/login",
        method: "POST",
        body: { email: credentials.email, password: credentials.password },
      }),
    }),
    register: builder.mutation({
      query: (credentials: IRegister) => ({
        url: "/api/auth/register",
        method: "POST",
        body: {
          firstName: credentials.firstName,
          lastName: credentials.lastName,
          patronymic: credentials.patronymic,
          department: credentials.department,
          post: credentials.post,
          email: credentials.email,
          password: credentials.password,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;
