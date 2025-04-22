import { Thumbnail } from "@/types";

export type TopArtist = {
  id: string;
  name: string;
  thumbnails: Thumbnail[];
  rank: number;
  trend: "up" | "down" | "neutral";
};
