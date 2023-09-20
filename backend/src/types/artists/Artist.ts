import { AlbumCard, ArtistCard, Track } from "@/types";

import { Palette } from "../Palette";

export interface Artist {
  id: string;
  description: string;
  views: string;
  name: string;
  saved: boolean;
  palette: Palette;
  thumbnails: {
    profile: {
      small: string;
      large: string;
    };
    banner: {
      mobile: string;
      desktop: string;
    };
  };
  tracks: {
    id: string;
    results: Track[];
  };
  albums: {
    id: string;
    results: AlbumCard[];
  };
  singles: {
    id: string;
    results: AlbumCard[];
  };
  similar: {
    id: null;
    results: ArtistCard[];
  };
}
