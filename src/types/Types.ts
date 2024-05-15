import { EDocumentStatus } from "./Enums";

export interface IUser {
  id: number;
  active?: boolean;
  firstName?: string;
  lastName?: string;
  patronymic?: string;
  post?: string;
  role?: string;
  email?: string;
  userGroup?: number | undefined;
  department?: string | undefined;
  groupResponseDTO?: {
    id: number;
    name: string;
  };
}

export interface IUserGroup {
  id: number;
  name: string;
  members: IUser[];
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
}

export interface IDocumentEdit {
  id: string;
  expirationDate?: string;
  parentDocId?: string;
  relatedDocIds?: string[];
  comment?: string;
  relatedUserGroupIds?: string[];
  status?: EDocumentStatus;
}

export interface IEmailBody {
  email: string;
  docId: string;
  header: string;
  body: string;
}

export interface IEmailBody {
  email: string;
  docId: string;
  header: string;
  body: string;
}

