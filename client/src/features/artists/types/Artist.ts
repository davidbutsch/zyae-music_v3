import { Track } from "@/features/tracks";

export type Artist = {
  id: string;
  description: string;
  views: string;
  name: string;
  saved: boolean;
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
