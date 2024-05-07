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
