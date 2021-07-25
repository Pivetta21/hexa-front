export interface User {
  id: number;
  name: string;
  email: string;
  pictureUrl: string;
  signUpDate: string;
  isEmailValidated: boolean;
}

export interface UpdateUser {
  name?: string;
  email?: string;
  pictureUrl?: string;
  isEmailValidated?: boolean;
  password?: string;
}
