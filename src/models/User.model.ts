export interface User {
  id: number;
  name: string;
  email: string;
  pictureUrl: string;
  signUpDate: string;
  isCreator: boolean;
  isEmailValidated: boolean;
}

export interface UpdateUser {
  name?: string;
  email?: string;
  pictureUrl?: string;
  isCreator?: boolean;
  isEmailValidated?: boolean;
  password?: string;
}
