import { AlbumCard } from "./AlbumCard";
import { Palette } from "@/types";
import { Track } from "@/features/tracks";

export type Album = {
  id: string;
  playlistId: string;
  description: string;
  title: string;
  palette: Palette;
  artists: {
    name: string;
    id: string;
  }[];
  year: string;
  trackCount: number;
  duration: string;
  type: string;
  thumbnails: {
    small: string;
    large: string;
  };
  tracks: Track[];
  otherVersions: AlbumCard[];
};
