import { AlbumCard, ArtistCard, Track } from "@/types";

export interface Artist {
  id: string;
  description: string;
  views: string;
  name: string;
  saved: boolean;
  palette: {
    colors: {
      hex: string;
      red: number;
      green: number;
      blue: number;
      area: number;
      hue: number;
      saturation: number;
      lightness: number;
      intensity: number;
    }[];
    byArea: { hex: string; determinant: number | null }[];
    bySaturation: { hex: string; determinant: number | null }[];
    byLightness: { hex: string; determinant: number | null }[];
    byIntensity: { hex: string; determinant: number | null }[];
  };
  thumbnails: {
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
