import { Thumbnail } from "@/types";

export type AlbumCard = {
  id: string;
  title: string;
  thumbnails: Thumbnail[];
  year?: string;
  type?: "Album" | "Single";
  sub?: string;
  isExplicit?: boolean;
};
