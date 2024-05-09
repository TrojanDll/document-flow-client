import { apiSlice } from "../../app/api/apiSlice";

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

export const documentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.mutation({
      query: (data?: IGetUserById) => ({
        url: `/api/users/${data?.id}`,
      }),
    }),
    getAllDocuments: builder.query<IDocument[], void>({
      query: () => "/api/admin/docs/all",
    }),
    deleteDocumentById: builder.mutation<void, string>({
      query: (docId: string) => ({
        url: `/api/docs/${docId}`,
        method: "DELETE",
      }),
    }),
    updateDocumentById: builder.mutation<void, IDocumentEdit>({
      query: (documentData: IDocumentEdit) => ({
        url: "/api/docs/set-doc-properties",
        method: "PUT",
        body: {
          id: documentData.id,
          status: "INPROGRESS",
          relatedDocIds: documentData.relatedDocs,
          parentDocId: documentData.parentDocId,
          relatedUserGroupIds: documentData.relatedUserGroupIds,
          expirationDate: documentData.expirationDate,
          comment: documentData.comment,
        },
      }),
    }),
  }),
});

export const { useGetAllDocumentsQuery, useDeleteDocumentByIdMutation, useUpdateDocumentByIdMutation } =
  documentApiSlice;

// query: (credentials: Ilogin) => ({
//   url: "/api/auth/login",
//   method: "POST",
//   body: { email: credentials.email, password: credentials.password },
// }),
