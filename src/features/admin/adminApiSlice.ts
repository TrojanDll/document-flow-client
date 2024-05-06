import { apiSlice } from "../../app/api/apiSlice";

interface IUpdateUserById {
  userId: number;
  firstName?: string;
  lastName?: string;
  patronymic?: string;
  email?: string;
  post?: string;
}

interface IGetUserById {
  id: number;
}

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/api/admin/users",
      keepUnusedDataFor: 5,
    }),
    getUserById: builder.mutation({
      query: (data?: IGetUserById) => ({
        url: `/api/users/${data?.id}`,
      }),
    }),
    updateUserById: builder.mutation({
      query: (userData: IUpdateUserById) => ({
        url: `/api/admin/users/${userData.userId}`,
        method: "PUT",
        body: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          patronymic: userData.patronymic,
          email: userData.email,
          post: userData.post,
        },
      }),
    }),
  }),
});

export const { useGetUsersQuery, useUpdateUserByIdMutation, useGetUserByIdMutation } =
  adminApiSlice;

// query: (credentials: Ilogin) => ({
//   url: "/api/auth/login",
//   method: "POST",
//   body: { email: credentials.email, password: credentials.password },
// }),
