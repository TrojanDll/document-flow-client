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
  name?: string;
  url?: string;
  type?: string;
  owner?: string;
  createdDate?: string;
  expirationDate?: string;
  parentDocId?: string;
  status?: EDocumentStatus;
  relatedDocs?: string[];
  userGroups?: string[];
  comment?: string;
  size?: number;
}

export interface IDocumentEdit {
  id: string;
  expirationDate?: string;
  parentDocId?: string;
  relatedDocs?: string[];
  userGroups?: string[];
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

export const enum EDocumentStatus {
  APPROVED = "APPROVED",
  DECLINED = "DECLINED",
  SEEN = "SEEN",
  INPROGRESS = "INPROGRESS",
}

export interface IEmailBody {
  email: string;
  docId: string;
  header: string;
  body: string;
}
