import { apiSlice } from "../../app/api/apiSlice";
import { IUser, IUserGroup } from "../../types/Types";

export interface IUpdateUserById {
  userId: number;
  firstName?: string;
  lastName?: string;
  patronymic?: string;
  email?: string;
  post?: string;
  department?: string;
  userGroup?: number;
}

interface IGetUserById {
  id: number;
}

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/api/admin/users",
    }),
    getUserById: builder.mutation({
      query: (data?: IGetUserById) => ({
        url: `/api/users/${data?.id}`,
      }),
    }),
    updateUserById: builder.mutation<IUser, IUser>({
      query: (userData: IUser) => ({
        url: `/api/admin/users/${userData.id}`,
        method: "PUT",
        body: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          patronymic: userData.patronymic,
          email: userData.email,
          post: userData.post,
          department: userData.department,
          groupId: userData.userGroup,
        },
      }),
    }),
    deleteUserById: builder.mutation({
      query: (userId: number) => ({
        url: `/api/admin/users/${userId}`,
        method: "DELETE",
      }),
    }),
    getAllUsersGroups: builder.query<IUserGroup[], void>({
      query: () => "/api/admin/usergroups/all",
    }),
    createUsersGroup: builder.mutation({
      query: (name: string) => ({
        url: `/api/admin/usergroups/new`,
        method: "POST",
        body: {
          name,
          emails: [],
        },
      }),
    }),
    deleteUsersGroupById: builder.mutation({
      query: (userGroupId: number) => ({
        url: `/api/admin/usergroups/${userGroupId}`,
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
  useCreateUsersGroupMutation,
  useGetAllUsersGroupsQuery,
  useDeleteUsersGroupByIdMutation,
} = adminApiSlice;

// query: (credentials: Ilogin) => ({
//   url: "/api/auth/login",
//   method: "POST",
//   body: { email: credentials.email, password: credentials.password },
// }),
