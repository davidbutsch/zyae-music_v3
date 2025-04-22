import { Thumbnail } from "../misc";

export type AlbumCard = {
  id: string;
  title: string;
  thumbnails: Thumbnail[];
  sub: string;
  year?: string;
  type?: "Album" | "Single";
  isExplicit?: boolean;
};
