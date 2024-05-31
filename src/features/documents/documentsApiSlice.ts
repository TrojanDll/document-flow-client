import { apiSlice } from "../../app/api/apiSlice";
import {
  IAddPrivatedUserRequest,
  IDocument,
  IDocumentChangeRequest,
  IDocumentChangeResponse,
  IDocumentEdit,
  IDocumentGroupRequest,
  IDocumentGroupResponse,
} from "../../types/Types";

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
    getDocumentInfoById: builder.mutation<IDocument, string>({
      query: (docId: string) => ({
        url: `/api/users/document/get-info/${docId}`,
        method: "GET",
      }),
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
          docGroupId: documentData.docGroupId,
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
    getAllDocumentsGroups: builder.query<IDocumentGroupResponse[], void>({
      query: () => ({
        url: "/api/users/document-groups/all",
        method: "GET",
      }),
    }),
    createDocumentGroup: builder.mutation<IDocumentGroupResponse, IDocumentGroupRequest>({
      query: (groupData: IDocumentGroupRequest) => ({
        url: `/api/admin/document-groups/new`,
        method: "POST",
        body: <IDocumentGroupRequest>{
          name: groupData.name,
          docIds: groupData.docIds,
          userGroupIds: groupData.userGroupIds,
        },
      }),
    }),
    updateDocumentGroupById: builder.mutation<IDocumentGroupResponse, IDocumentGroupRequest>({
      query: (groupData: IDocumentGroupRequest) => ({
        url: `/api/admin/document-groups/${groupData.id}`,
        method: "PUT",
        body: <IDocumentGroupRequest>{
          name: groupData.name,
          docIds: groupData.docIds,
          userGroupIds: groupData.userGroupIds,
        },
      }),
    }),
    deleteDocumentGroupById: builder.mutation<void, number>({
      query: (documentGroupId: number) => ({
        url: `/api/admin/document-groups/${documentGroupId}`,
        method: "DELETE",
      }),
    }),
    addPrivatedUserToDocumentUsers: builder.mutation<void, IAddPrivatedUserRequest>({
      query: (dataToAdd: IAddPrivatedUserRequest) => ({
        url: `/api/users/docs/add-user/${dataToAdd.userId}/${dataToAdd.docId}`,
        method: "PUT",
      }),
    }),
    removePrivatedUserToDocumentUsers: builder.mutation<void, IAddPrivatedUserRequest>({
      query: (dataToAdd: IAddPrivatedUserRequest) => ({
        url: `/api/users/docs/remove-user/${dataToAdd.userId}/${dataToAdd.docId}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useGetAllDocumentsQuery,
  useGetDocumentInfoByIdMutation,
  useDeleteDocumentByIdMutation,
  useUpdateDocumentByIdMutation,
  useUploadDocumentMutation,
  useGetDocumentsByMyGroupQuery,
  useCreateDocumentChangeMutation,
  useGetDocumentChangesByDocumentIDQuery,
  useDeleteDocumentChangeByChangeIDMutation,
  useGetAllDocumentsGroupsQuery,
  useCreateDocumentGroupMutation,
  useUpdateDocumentGroupByIdMutation,
  useDeleteDocumentGroupByIdMutation,
  useAddPrivatedUserToDocumentUsersMutation,
  useRemovePrivatedUserToDocumentUsersMutation,
} = documentApiSlice;

// query: (credentials: Ilogin) => ({
//   url: "/api/auth/login",
//   method: "POST",
//   body: { email: credentials.email, password: credentials.password },
// }),
