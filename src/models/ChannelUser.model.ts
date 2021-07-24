import { User } from './User.model';
import { ChannelI } from './Channel.model';

export interface ChannelUser {
  id: number;
  followed_at: string;
  channel?: ChannelI;
  user?: User;
}

export type FollowChannelDto = { channelId: number; userId: number };
