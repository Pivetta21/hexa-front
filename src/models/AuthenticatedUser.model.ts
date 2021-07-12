import { User } from './User.model';

export interface AuthenticatedUser {
  user: User;
  token?: string;
}
