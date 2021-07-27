import { ChannelI } from 'src/models/Channel.model';

export interface Course {
  id: number;
  channel: ChannelI;
  name: string;
  description?: string;
  image_url?: string;
  price: number;
  isPublic: boolean;
  created_at: string;
}

export interface CreateCourse {
  channel: ChannelI;
  name: string;
  description?: string;
  image_url?: string;
  price: number;
  isPublic: boolean;
}

export interface UpdateCourse {}
