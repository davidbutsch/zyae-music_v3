import { Track } from "@/features/tracks";

export type Artist = {
  id: string;
  description: string;
  views: string;
  name: string;
  saved: boolean;
  palette: {
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
};
