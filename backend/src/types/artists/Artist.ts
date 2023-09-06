import { Track } from "@/types";

export type Artist = {
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
