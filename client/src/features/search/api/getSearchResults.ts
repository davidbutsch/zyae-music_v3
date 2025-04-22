import { UseQueryResult, useQuery } from "@tanstack/react-query";

import { AlbumCard } from "@/features/albums";
import { ArtistCard } from "@/features/artists";
import { PlaylistCard } from "@/features/playlists";
import { TopResult } from "..";
import { Track } from "@/features/tracks";
import { axios } from "@/libs/";

export const getSearchResults = (query: string, filter: string): Promise<any> =>
  axios
    .get(`/search/${query}/results/${filter}`)
    .then((res) => res.data.data.results);

type getSearchResultsOptions = {
  enabled?: boolean;
};

type ResultType<Filter> = Filter extends "top"
  ? TopResult[]
  : Filter extends "tracks"
  ? Track[]
  : Filter extends "videos"
  ? Track[]
  : Filter extends "artists"
  ? ArtistCard[]
  : Filter extends "albums"
  ? AlbumCard[]
  : Filter extends "playlists"
  ? PlaylistCard[]
  : never;

export const useSearchResults = <
  Filter extends
    | "top"
    | "tracks"
    | "videos"
    | "artists"
    | "albums"
    | "playlists"
>(
  query: string,
  filter: Filter,
  { enabled }: getSearchResultsOptions = {}
): UseQueryResult<ResultType<Filter>> => {
  return useQuery({
    enabled,
    queryKey: ["searchResults", query, filter],
    queryFn: async () => {
      return getSearchResults(query, filter);
    },
  });
};
