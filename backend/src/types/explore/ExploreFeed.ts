import { TopArtist } from "./TopArtist";
import { Track } from "../tracks";
import { GenreCard } from "../genres";

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
