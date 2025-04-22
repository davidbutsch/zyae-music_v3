import { Thumbnail } from "../misc";

export type Video = {
  id: string;
  title: string;
  thumbnails: Thumbnail[];
  duration: string;
  artists: {
    name: string;
    id: string;
  }[];
  saved: boolean;
  isAvailable: boolean;
  isExplicit: boolean;
};
