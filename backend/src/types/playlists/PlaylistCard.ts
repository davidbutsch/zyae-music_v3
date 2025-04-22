import { Thumbnail } from "../misc";

export type PlaylistCard = {
  id: string;
  title: string;
  thumbnails: Thumbnail[];
  author: string;
  sub: string;
};
