import { Thumbnail } from "../misc";

export type TopArtist = {
  id: string;
  name: string;
  thumbnails: Thumbnail[];
  rank: number;
  trend: "up" | "down" | "neutral";
};
