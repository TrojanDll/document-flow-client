interface IUser {
  id: number;
  active: boolean;
  firstName: string;
  lastName: string;
  patronymic: string;
  post: string;
  role: string;
  email: string;
  userGroup?: string | null | undefined;
  department?: string | null | undefined;
}
