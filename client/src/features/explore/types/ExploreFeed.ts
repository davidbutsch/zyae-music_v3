import { GenreCard } from "@/features/genres";
import { TopArtist } from "./TopArtist";
import { Track } from "@/features/tracks";

export type ExploreFeed = {
  charts: {
    tracks: {
      id: string;
      results: Track[];
    };
    artists: {
      id: null;
      results: TopArtist[];
    };
  };
  genres: GenreCard[];
};
