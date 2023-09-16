import { AlbumCard } from "@/features/albums";
import { ArtistCard } from ".";
import { Track } from "@/features/tracks";

export type Artist = {
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
    id: null;
    results: AlbumCard[];
  };
  singles: {
    id: null;
    results: AlbumCard[];
  };
  similar: {
    id: null;
    results: ArtistCard[];
  };
};
