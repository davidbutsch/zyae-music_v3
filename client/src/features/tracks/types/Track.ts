import { Palette, Thumbnail } from "@/types";

export type Track = {
  id: string;
  title: string;
  thumbnails: Thumbnail[];
  duration?: string;
  artists: {
    name: string;
    id: string | null;
  }[];
  album?: {
    title: string;
    id: string;
  };
  palette?: Palette;
  isAvailable?: boolean;
  isExplicit?: boolean;
};
