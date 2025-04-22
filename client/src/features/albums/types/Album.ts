import { Palette, Thumbnail } from "@/types";

import { AlbumCard } from "./AlbumCard";
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
  thumbnails: Thumbnail[];
  tracks: Track[];
  otherVersions: AlbumCard[];
};
