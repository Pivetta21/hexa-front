export interface ChannelI {
  id: number;
  user: number;
  name: string;
  description?: string;
  banner_url?: string;
  created_at: string;
}

export interface CreateChannelI {
  user: number;
  name: string;
  description?: string;
  banner_url?: string;
}

export interface UpdateChannelI {
  name?: string;
  description?: string;
  banner_url?: string;
}
