import { AlbumCard } from "./AlbumCard";
import { Track } from "../tracks";

export type Album = {
  id: string;
  playlistId: string;
  description: string;
  title: string;
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
