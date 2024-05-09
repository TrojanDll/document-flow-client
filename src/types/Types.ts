interface IUser {
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

interface IUserGroup {
  id: number;
  name: string;
  members: IUser[];
}

interface IDocument {
  id: string;
  name?: string;
  url?: string;
  type?: string;
  owner?: string;
  createdDate?: string;
  expirationDate?: string;
  parentDocId?: string;
  status?: string;
  relatedDocs?: string[];
  userGroups?: string[];
  comment?: string;
  size?: number;
}

interface IDocumentEdit {
  id: string;
  expirationDate?: string;
  parentDocId?: string;
  relatedDocs?: string[];
  userGroups?: string[];
  comment?: string;
  relatedUserGroupIds?: string[];
  status?: string;
}
