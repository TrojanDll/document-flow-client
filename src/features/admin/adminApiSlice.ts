import { apiSlice } from "../../app/api/apiSlice";

export interface IUpdateUserById {
  userId: number;
  firstName?: string;
  lastName?: string;
  patronymic?: string;
  email?: string;
  post?: string;
  department?: string;
  groupId?: number;
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
    updateUserById: builder.mutation<IUpdateUserById, IUpdateUserById>({
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
    deleteUserById: builder.mutation({
      query: (userId: number) => ({
        url: `/api/admin/users/${userId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateUserByIdMutation,
  useGetUserByIdMutation,
  useDeleteUserByIdMutation,
} = adminApiSlice;

// query: (credentials: Ilogin) => ({
//   url: "/api/auth/login",
//   method: "POST",
//   body: { email: credentials.email, password: credentials.password },
// }),
