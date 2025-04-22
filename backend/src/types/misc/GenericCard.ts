import { Thumbnail } from "../misc";

export type GenericCard = {
  id: string;
  thumbnails: Thumbnail[];
  type: "playlist" | "artist" | "album" | "track";
  title: string;
  sub: string;
  isExplicit?: boolean;
};
