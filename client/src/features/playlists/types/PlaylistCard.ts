import { Thumbnail } from "@/types";

export type PlaylistCard = {
  id: string;
  title: string;
  thumbnails: Thumbnail[];
  author: string;
  sub: string;
};
