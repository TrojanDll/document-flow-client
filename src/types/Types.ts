import { EDocumentStatus, ETaskStatus } from "./Enums";

export interface IUser {
  id: number;
  active?: boolean;
  firstName?: string;
  lastName?: string;
  patronymic?: string;
  post?: string;
  role?: string;
  email?: string;
  department?: string | undefined;
  userGroup?: number[] | undefined;
  groupResponseDTOs?: IGroupResponseDTOs[];
  groupIds?: number[];
  password?: string;
}

export interface IGroupResponseDTOs {
  id: number;
  name: string;
}

export interface IUserGroup {
  id: number;
  name: string;
  members?: IUser[];
}

export interface IDocument {
  id: string;
  fileName?: string;
  url?: string;
  type?: string;
  owner?: string;
  createdDate?: string;
  expirationDate?: string;
  parentDocId?: string;
  status?: EDocumentStatus;
  relatedDocIds?: string[];
  relatedDocs?: string[];
  userGroups?: string[];
  comment?: string;
  size?: number;
  documentGroup?: IDocumentGroupResponse;
}

export interface IDocumentEdit {
  id: string;
  expirationDate?: string;
  parentDocId?: string;
  relatedDocIds?: string[];
  comment?: string;
  relatedUserGroupIds?: string[];
  status?: EDocumentStatus;
  docGroupId?: number;
}

export interface IEmailBody {
  email: string;
  docIds: string[];
  header: string;
  body: string;
}

export interface ITaskResponse {
  id: number;
  header: string;
  description?: string;
  creator: string;
  status: ETaskStatus;
  creationDate: string;
  deadline?: string;
  doc?: IDocument;
  users?: IUser[];
}

export interface ITaskRequest {
  header: string;
  description?: string;
  status: ETaskStatus;
  creationDate: string;
  deadline?: string;
  docId?: string;
  userEmails: string[];
}

export interface ITaskRequestToEdit extends ITaskRequest {
  id: number;
}

export interface IDocumentChangeRequest {
  documentId: string;
  header: string;
  message: string;
  changedDate: string;
}

export interface IDocumentChangeResponse {
  id: string;
  documentId: string;
  header: string;
  message: string;
  changedDate: string;
  createdBy: string;
}

export interface IDocumentGroupRequest {
  id?: number;
  name: string;
  docIds?: string[];
  userGroupIds: number[];
}

export interface IDocumentGroupResponse {
  id: number;
  name: string;
  docs: IDocument[];
  userGroups: IUserGroup[];
}
