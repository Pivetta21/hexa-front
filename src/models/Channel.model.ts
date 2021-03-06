import { Course } from './Course.model';
import { User } from './User.model';
export interface ChannelI {
  id: number;
  user: User;
  name: string;
  description?: string;
  banner_url?: string;
  created_at: string;
  courses?: Course[];
}

export interface CreateChannelI {
  user: User;
  name: string;
  description?: string;
  banner_url?: string;
}

export interface UpdateChannelI {
  name?: string;
  description?: string;
  banner_url?: string;
}
