import { Palette, Thumbnail } from "@/types";

import { AlbumCard } from "@/features/albums";
import { ArtistCard } from ".";
import { Track } from "@/features/tracks";

export type Artist = {
  id: string;
  description: string;
  views: string;
  name: string;
  saved: boolean;
  palette: Palette;
  banners: {
    mobile: string;
    desktop: string;
  };
  thumbnails: Thumbnail[];
  tracks: {
    id: string | null;
    results: Track[];
  };
  albums: {
    id: string | null;
    results: AlbumCard[];
  };
  singles: {
    id: string | null;
    results: AlbumCard[];
  };
  videos: {
    id: string | null;
    results: Track[];
  };
  similar: {
    id: null;
    results: ArtistCard[];
  };
};
