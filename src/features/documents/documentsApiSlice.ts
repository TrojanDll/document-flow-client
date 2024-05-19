import { apiSlice } from "../../app/api/apiSlice";
import { IDocument, IDocumentChangeRequest, IDocumentChangeResponse, IDocumentEdit } from "../../types/Types";

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

export const documentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
        body: <IDocumentEdit>{
          // ...documentData
          id: documentData.id,
          status: documentData.status,
          relatedDocIds: documentData.relatedDocIds,
          parentDocId: documentData.parentDocId,
          relatedUserGroupIds: documentData.relatedUserGroupIds,
          expirationDate: documentData.expirationDate,
          comment: documentData.comment,
        },
      }),
    }),
    uploadDocument: builder.mutation<void, File>({
      query: (file) => {
        return {
          url: "/api/docs/upload",
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: { file },
          formData: true,
        };
      },
    }),
    getDocumentsByMyGroup: builder.query<IDocument[], void>({
      query: () => "/api/docs/by-group",
    }),
    createDocumentChange: builder.mutation<IDocumentChangeResponse, IDocumentChangeRequest>({
      query: (documentData: IDocumentChangeRequest) => ({
        url: "/api/doc-changes/new",
        method: "POST",
        body: <IDocumentChangeRequest>{
          documentId: documentData.documentId,
          header: documentData.header,
          message: documentData.message,
          changedDate: documentData.changedDate,
        },
      }),
    }),
    getDocumentChangesByDocumentID: builder.query<IDocumentChangeResponse[], string>({
      query: (docId: string) => ({
        url: `/api/doc-changes/doc/${docId}`,
        method: "GET",
      }),
    }),
    deleteDocumentChangeByChangeID: builder.mutation<IDocumentChangeResponse[], string>({
      query: (changeId: string) => ({
        url: `/api/doc-changes/${changeId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllDocumentsQuery,
  useDeleteDocumentByIdMutation,
  useUpdateDocumentByIdMutation,
  useUploadDocumentMutation,
  useGetDocumentsByMyGroupQuery,
  useCreateDocumentChangeMutation,
  useGetDocumentChangesByDocumentIDQuery,
  useDeleteDocumentChangeByChangeIDMutation,
} = documentApiSlice;

// query: (credentials: Ilogin) => ({
//   url: "/api/auth/login",
//   method: "POST",
//   body: { email: credentials.email, password: credentials.password },
// }),
