import { User } from './User.model';
import { VideoI } from './Video.model';

export interface VideoComment {
  id: number;
  video?: VideoI;
  user?: User;
  text: string;
  published_at: string;
}

export interface CreateVideoComment {
  videoId: number;
  userId: number;
  text: string;
}
