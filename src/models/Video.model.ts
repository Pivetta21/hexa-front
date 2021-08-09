import { ModuleI } from './Module.model';

export interface VideoI {
  id: number;
  module: ModuleI;
  name: string;
  description: string;
  video_url: string;
}

export interface CreateVideoI {
  module: ModuleI;
  name: string;
  description: string;
  video_url: string;
}

export interface UpdateVideoI {
  name?: string;
  description?: string;
  video_url?: string;
}
